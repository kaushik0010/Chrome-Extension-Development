document.addEventListener("DOMContentLoaded", () => {
    const tabList = document.getElementById("tab-list");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");
    const bookmarkDropdown = document.getElementById("bookmark-dropdown");

    // Theme Toggle
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "🌙";
    } else {
        themeToggle.textContent = "🌞";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        themeToggle.textContent = isDark ? "🌙" : "🌞";
    });

    // Bookmark utils
    function getBookmarks(callback) {
        chrome.storage.local.get(["bookmarkedTabs"], (result) => {
            callback(result.bookmarkedTabs || []);
        });
    }

    function setBookmarks(bookmarks) {
        chrome.storage.local.set({ bookmarkedTabs: bookmarks });
    }

    function populateBookmarkDropdown() {
        bookmarkDropdown.innerHTML = '<option value="">📚 Bookmarked Tabs</option>';

        getBookmarks((customBookmarks) => {
            customBookmarks.forEach(tab => {
                const option = document.createElement("option");
                option.value = tab.id;
                option.textContent = `[⭐] ${tab.title || tab.url}`;
                bookmarkDropdown.appendChild(option);
            });
        });


        chrome.bookmarks.getTree((nodes) => {
            const allBookmarks = [];

            function extractBookmarks(bookmarkNodes) {
                for (const node of bookmarkNodes) {
                    if (node.url) {
                        allBookmarks.push(node);
                    }
                    if (node.children) {
                        extractBookmarks(node.children);
                    }
                }
            }

            extractBookmarks(nodes);

            allBookmarks.forEach(bookmark => {
                const option = document.createElement("option");
                option.value = bookmark.url;
                option.textContent = `[🔖] ${bookmark.title || bookmark.url}`;
                bookmarkDropdown.appendChild(option);
            });
        });
    }


    bookmarkDropdown.addEventListener("change", () => {
        const value = bookmarkDropdown.value;
        if (!value) return;

        const tabId = parseInt(value);
        if (!isNaN(tabId)) {
            chrome.tabs.update(tabId, { active: true });
        } else {
            chrome.tabs.create({ url: value });
        }
    });

    // Group Tabs by Domain
    function groupTabsByDomain(tabs) {
        const domainMap = {};
        tabs.forEach((tab) => {
            try {
                const url = new URL(tab.url);
                const domain = url.hostname;
                if (!domainMap[domain]) domainMap[domain] = [];
                domainMap[domain].push(tab);
            } catch (e) {
                if (!domainMap["unknown"]) domainMap["unknown"] = [];
                domainMap["unknown"].push(tab);
            }
        });
        return domainMap;
    }

    // Load All Tabs
    function loadTabs(query = "") {
        chrome.tabs.query({}, function (tabs) {
            tabList.innerHTML = "";

            const filteredTabs = tabs.filter(tab => {
                const titleMatch = tab.title?.toLowerCase().includes(query.toLowerCase());
                const urlMatch = tab.url?.toLowerCase().includes(query.toLowerCase());
                return titleMatch || urlMatch;
            });

            const grouped = groupTabsByDomain(filteredTabs);
            Object.keys(grouped).sort().forEach(domain => {
                const domainHeader = document.createElement("h3");
                domainHeader.textContent = domain;
                domainHeader.className = "domain-header";
                tabList.appendChild(domainHeader);

                grouped[domain].forEach(tab => {
                    const li = document.createElement("li");

                    const info = document.createElement("div");
                    info.className = "tab-info";

                    const favicon = document.createElement("img");
                    favicon.src = tab.favIconUrl || "icons/icon128.png";
                    favicon.alt = "";
                    favicon.className = "favicon";

                    const title = document.createElement("span");
                    title.textContent = tab.title || tab.url;

                    info.appendChild(favicon);
                    info.appendChild(title);

                    const actions = document.createElement("div");
                    actions.className = "tab-actions";

                    // Copy Button
                    const copyBtn = document.createElement("button");
                    copyBtn.textContent = "📋";
                    copyBtn.title = "Copy URL";
                    copyBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(tab.url).then(() => {
                            copyBtn.textContent = "✅";
                            setTimeout(() => (copyBtn.textContent = "📋"), 2000);
                        });
                    });

                    // Pin/Unpin
                    const pinBtn = document.createElement("button");
                    pinBtn.textContent = tab.pinned ? "📍" : "📌";
                    pinBtn.title = tab.pinned ? "Unpin Tab" : "Pin Tab";
                    pinBtn.addEventListener("click", e => {
                        e.stopPropagation();
                        chrome.tabs.update(tab.id, { pinned: !tab.pinned });
                        setTimeout(() => loadTabs(searchInput.value), 300);
                    });

                    // Close Button
                    const closeBtn = document.createElement("button");
                    closeBtn.textContent = "❌";
                    closeBtn.title = "Close tab";
                    closeBtn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        chrome.tabs.remove(tab.id, () => loadTabs(searchInput.value));
                    });

                    // Bookmark Button
                    const bookmarkBtn = document.createElement("button");
                    bookmarkBtn.textContent = "⭐";
                    bookmarkBtn.title = "Bookmark Tab";

                    getBookmarks((bookmarks) => {
                        const isBookmarked = bookmarks.some(b => b.id === tab.id);
                        if (isBookmarked) bookmarkBtn.textContent = "🔖";

                        bookmarkBtn.addEventListener("click", (e) => {
                            e.stopPropagation();
                            getBookmarks((bookmarks) => {
                                const index = bookmarks.findIndex(b => b.id === tab.id);
                                if (index === -1) {
                                    bookmarks.push(tab);
                                    bookmarkBtn.textContent = "🔖";
                                } else {
                                    bookmarks.splice(index, 1);
                                    bookmarkBtn.textContent = "⭐";
                                }
                                setBookmarks(bookmarks);
                                populateBookmarkDropdown();
                            });
                        });
                    });

                    actions.appendChild(bookmarkBtn);
                    actions.appendChild(copyBtn);
                    actions.appendChild(pinBtn);
                    actions.appendChild(closeBtn);

                    li.appendChild(info);
                    li.appendChild(actions);

                    li.addEventListener("click", () => {
                        chrome.tabs.update(tab.id, { active: true });
                    });

                    tabList.appendChild(li);
                });
            });

            populateBookmarkDropdown();
        });
    }

    // Debounced Search
    let debounceTimeout;
    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => loadTabs(searchInput.value), 300);
    });

    // Initial Load
    loadTabs();
});

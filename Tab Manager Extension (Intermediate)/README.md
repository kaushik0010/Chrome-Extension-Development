# 🧩 Smart Tab Manager Chrome Extension

A powerful and minimalistic Chrome extension to help you manage your tabs more efficiently. With Smart Tab Manager, you can:

- ✅ Pin/Unpin current tabs with a click  
- 📚 Save pinned tabs as bookmarks  
- 🌐 Group open tabs by domain  
- 🔖 View and restore saved bookmarks  
- ⚡ Simple and clean UI for everyday use  
- 🌗 Persistent Dark/Light mode toggle

---

## 🚀 Features

| Feature                       | Description                                                   |
|------------------------------|---------------------------------------------------------------|
| 🔒 Pin/Unpin Tabs             | One-click to toggle pin status of active tabs.                |
| 🗂️ Group Tabs by Domain       | Automatically organize open tabs by their domain.             |
| 💾 Save as Bookmarks          | Save pinned tabs to bookmarks for future access.              |
| 📂 Load Saved Bookmarks       | Load and open previously saved bookmarks directly.            |
| 🖥️ Clean UI                   | Lightweight, easy-to-use interface via the Chrome popup.       |

---

## 🧑‍💻 How to Use

1. **Install the Extension** (locally).
2. Click the extension icon in the toolbar.
3. Use the buttons to:
   - Pin or unpin active tabs
   - Save all pinned tabs as bookmarks
   - View and reopen saved bookmarks
   - See open tabs grouped by their domain

---

## 🛠️ Installation (Local Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/smart-tab-manager.git

2. Open Chrome and go to:
    chrome://extensions

3. Enable Developer Mode (top right).

4. Click on Load unpacked and select the project folder.

## 📁 Project Structure
    ``` css
    smart-tab-manager/
    ├── background.js
    ├── manifest.json
    ├── popup.html
    ├── popup.js
    ├── style.css
    └── icons/
        └── icon.png

## 📄 Permissions Used
- tabs: To interact with browser tabs.

- bookmarks: To save and load bookmarks.

- activeTab: To manipulate the current active tab.

- storage: For future settings or saved state handling.

## 📷 Screenshots

### 🙌 Contributions
Contributions, suggestions, and pull requests are welcome!
Please open an issue first to discuss what you'd like to change.

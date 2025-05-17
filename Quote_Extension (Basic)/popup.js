const quotes = [
  "The best way to predict the future is to invent it. - Alan Kay",
  "Life is 10% what happens to us and 90% how we react to it.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Act as if what you do makes a difference. It does. - William James",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
];

function getRandomQuuote() {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
}

function showQuote(){
    const quoteElem = document.getElementById("quote");
    quoteElem.textContent = getRandomQuuote();
}

function showMessage(text, duration=2000) {
    const msgElem = document.getElementById("message");
    msgElem.textContent = text;
    msgElem.classList.remove("hidden")

    setTimeout(() => {
        msgElem.classList.add("hidden");
    }, duration);
}

function copyQuote() {
    const quote = document.getElementById("quote").textContent;
    navigator.clipboard.writeText(quote).then(() => {
        showMessage("copied to clipboard!");
    }).catch(err => {
        showMessage("Failed to copy quote.");
    });
}

function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById("toggle-mode");

    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");

    toggleBtn.textContent = isDark ? "Light" : "Dark";

    localStorage.setItem("darkMode", isDark ? "on" : "off");
}

function applySavedTheme() {
    const saved = localStorage.getItem("darkMode");
    if(saved === "on") {
        document.body.classList.add("dark");
        document.getElementById("toggle-mode").textContent("Light");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    applySavedTheme();
    showQuote();

    document.getElementById("new-quote").addEventListener("click", showQuote);
    document.getElementById("copy-quote").addEventListener("click", copyQuote);
    document.getElementById("toggle-mode").addEventListener("click", toggleDarkMode);
});
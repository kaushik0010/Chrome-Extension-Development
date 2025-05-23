# Chrome Extension Development

This repository contains resources, guides, and code examples for building Chrome Extensions. Whether you're just getting started or looking to enhance your Chrome Extension skills, this README will help you navigate through the project and provide essential resources.

## Getting Started

Building a Chrome Extension requires a few basic concepts to get started. Here's a quick guide on how to begin:

1. **Set Up Your Environment:**
   - Make sure you have [Google Chrome](https://www.google.com/chrome/) installed.
   - Familiarize yourself with [Chrome's Extensions API](https://developer.chrome.com/docs/extensions/).
   - You’ll also need a code editor like [VSCode](https://code.visualstudio.com/) or Sublime Text.

2. **Create Your First Extension:**
   - Start by creating a folder for your extension files.
   - Your extension will need at least these two files:
     - `manifest.json` – Defines the metadata of your extension (permissions, scripts, icons, etc.).
     - A background or content script – The JavaScript that runs in your extension.
   - Here’s a basic example of a `manifest.json`:
   ```json
   {
     "manifest_version": 2,
     "name": "My First Chrome Extension",
     "description": "A simple Chrome Extension",
     "version": "1.0",
     "permissions": ["activeTab"],
     "background": {
       "scripts": ["background.js"],
       "persistent": false
     },
     "browser_action": {
       "default_popup": "popup.html",
       "default_icon": {
         "16": "images/icon16.png",
         "48": "images/icon48.png",
         "128": "images/icon128.png"
       }
     },
     "icons": {
       "16": "images/icon16.png",
       "48": "images/icon48.png",
       "128": "images/icon128.png"
     }
   }

# Project: Enhanced Dropdown with Infinite Scrolling

## Overview

This project is a dynamic dropdown system designed to enhance user experience by implementing:

- Infinite scrolling for suggestions.
- Recent item history using session storage.
- Image handling with lazy loading and error fallback.
- A modal to display recent items.
- Item selection with tag-based rendering.
- Smooth image hover effects.

The project is built using **HTML**, **CSS**, **JavaScript**, and **jQuery**.

---

## Features

### 1. Infinite Scrolling

- Dynamically loads more suggestions as the user scrolls through the dropdown.
- Avoids unnecessary data loading to optimize performance.

### 2. Recent Items

- Displays recently selected items, limited to the 5 most recent.
- Uses `sessionStorage` to persist recent items for the duration of the browser session.

### 3. Image Handling

- Implements lazy loading for images to reduce initial load time.
- Provides fallback images for broken URLs using the `onerror` attribute.

### 4. Modal for Recent Items

- Displays all recent items in a modal view.
- Includes an option to close the modal via a button, the `Escape` key, or by clicking outside the modal content.

### 5. Item Selection

- Allows users to select items from suggestions.
- Displays selected items as tags with options to remove individual tags or clear all selections.

### 6. Hover Effects

- Adds a smooth zoom effect on images when hovered over.

---

## File Structure

### `index.html`

- Contains the structure for the dropdown, search input, suggestion list, recent items grid, and modal.

### `styles.css`

- Styles the dropdown, modal, images, and various interactive elements.

### `script.js`

- Implements the functionality described above using jQuery and JavaScript.

### `mock-api.js`

- Simulates a backend API with mock data.
- Provides the `fetchItems` function to filter and paginate items based on user input.

---

## Key Functions

### **1. Infinite Scrolling**

- Function: `fetchAndAppendItems()`
- Triggers additional data fetching when the user scrolls near the bottom of the dropdown menu.

### **2. Suggestions Rendering**

- Functions: `appendSuggestions()`, `renderSuggestions()`
- Dynamically updates the suggestion list based on user input or scroll events.

### **3. Recent Items**

- Functions: `renderRecentItems()`, `updateRecentItems()`, `storeRecentItemsDuringSession()`
- Manages recent item history, ensuring the list is updated and stored in `sessionStorage`.

### **4. Modal Handling**

- Functions: `openRecentModal()`, `closeRecentModal()`
- Opens and closes the modal for viewing recent items.
- Includes additional controls for accessibility, such as closing the modal with the `Escape` key.

### **5. Item Selection**

- Functions: `selectSuggestion()`, `renderSelectedItems()`, `removeSelectedItem()`, `clearAllSelections()`
- Handles user-selected items, rendering them as tags and providing options to remove or clear all selections.

### **6. Image Hover Effects**

- Adds a scaling effect to images on hover using `mouseenter` and `mouseleave` events.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmedsalah117/makeen-poc.git
   ```

2. Navigate to the project directory:

   ```bash
   cd makeen-poc
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Open `index.html` in a browser to view the project.

---

## Usage

1. Start typing in the search input to fetch and display suggestions.
2. Scroll through the dropdown menu to trigger infinite scrolling and load more suggestions.
3. Select items from the suggestions; selected items will appear as tags.
4. Use the "Clear All" button to remove all selected items.
5. Click "See All" to view recent items in a modal.
6. Hover over images to see the zoom effect.

---

## Technologies Used

- **HTML5** for structure.
- **CSS3** for styling.
- **JavaScript** and **jQuery** for interactivity.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

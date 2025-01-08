$(document).ready(function () {
  const pageSize = 20;
  let currentPage = 1;
  let query = "";
  let recentItems = JSON.parse(sessionStorage.getItem("recentItems") || "[]");
  let selectedItems = [];
  let isLoading = false;

  /**
   * Appends fetched suggestions to the suggestion list.
   * @param {Array} items - Array of suggestion items.
   */
  function appendSuggestions(items) {
    const suggestionList = $("#suggestion-list");
    items.forEach((item) => {
      const listItem = $(
        `<li>
          <img class="item-img" loading="lazy" src="${item.image}" alt="${item.name}"  onerror="this.onerror=null;this.src='./no_img.jpg';" width="50" height="50" />
          ${item.name}
        </li>`
      );
      listItem.on("click", () => selectSuggestion(item));
      suggestionList.append(listItem);
    });
  }

  /**
   * Fetches and appends items while handling pagination and loading state.
   */
  function fetchAndAppendItems() {
    if (isLoading) return;
    isLoading = true;

    fetchItems(query, currentPage, pageSize).then((newItems) => {
      if (newItems.length > 0) {
        appendSuggestions(newItems);
        currentPage++;
      }
      isLoading = false;
    });
  }

  /**
   * Handles selecting a recent item and fetching related suggestions.
   * @param {string} item - The name of the recent item.
   */
  function selectRecentItem(item) {
    $("#search-input").val(item);
    fetchItems(item, 1, pageSize).then(renderSuggestions);
  }

  /**
   * Renders the recent items grid with a limit of 5.
   */
  function renderRecentItems() {
    const recentGrid = $("#recent-grid");
    recentGrid.empty();
    recentItems.slice(0, 5).forEach((item) => {
      const gridItem = $(
        `<div class="recent-item">
            <img class="item-img" loading="lazy" src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='./no_img.jpg';" width="50" height="50" />
            <p>${item.name}</p>
          </div>`
      );
      gridItem.on("click", () => selectRecentItem(item.name));
      recentGrid.append(gridItem);
    });
  }

  /**
   * Handles selecting a suggestion and updating recent items.
   * @param {Object} item - The selected suggestion item.
   */
  function selectSuggestion(item) {
    if (!selectedItems.find((selected) => selected.name === item.name)) {
      selectedItems.push(item);
      renderSelectedItems();
      updateRecentItems(item);
    }
  }

  /**
   * Renders suggestions by clearing and appending new items.
   * @param {Array} items - Array of suggestion items.
   */
  function renderSuggestions(items) {
    const suggestionList = $("#suggestion-list");
    suggestionList.empty();
    items.forEach((item) => {
      const listItem = $(
        `<li>
            <img class="item-img" loading="lazy" src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='./no_img.jpg';" width="50" height="50" />
            ${item.name}
          </li>`
      );
      listItem.on("click", () => selectSuggestion(item));
      suggestionList.append(listItem);
    });
  }

  /**
   * Removes a selected item by name and re-renders the list.
   * @param {string} itemName - The name of the item to remove.
   */
  function removeSelectedItem(itemName) {
    selectedItems = selectedItems.filter((item) => item.name !== itemName);
    renderSelectedItems();
  }

  /**
   * Renders the selected items as tags with remove buttons.
   */
  function renderSelectedItems() {
    const selectedContainer = $(".selected-container");
    selectedContainer.empty();
    selectedItems.forEach((item) => {
      const tag = $(
        `<span class="tag">
            ${item.name}
            <button class="remove-tag" data-name="${item.name}">×</button>
          </span>`
      );
      tag.find(".remove-tag").on("click", () => removeSelectedItem(item.name));
      selectedContainer.append(tag);
    });
  }

  /**
   * Clears all selected items.
   */
  function clearAllSelections() {
    selectedItems = [];
    renderSelectedItems();
  }

  /**
   * Stores recent items in sessionStorage for session persistence.
   */
  function storeRecentItemsDuringSession() {
    sessionStorage.setItem("recentItems", JSON.stringify(recentItems));
  }

  /**
   * Updates the recent items list and persists it in sessionStorage.
   * @param {Object} item - The item to add to the recent list.
   */
  function updateRecentItems(item) {
    if (!recentItems.find((recent) => recent.name === item.name)) {
      recentItems.unshift({ name: item.name, icon: item.image });
      storeRecentItemsDuringSession();
      renderRecentItems();
    }
  }

  /**
   * Clears the search input and suggestion list.
   */
  function clearSearchInput() {
    $("#search-input").val("");
    $("#suggestion-list").empty();
  }

  /**
   * Opens the recent items modal with rendered recent items content.
   */
  function openRecentModal() {
    const modalContent = $("#recent-modal-content");
    modalContent.empty();

    recentItems?.forEach((item) => {
      const modalItem = $(
        `<div class="recent-modal-item">
            <img
            class="item-img"
            loading="lazy"
             src="${item.image}"
              alt="${item.name}"
              onerror="this.onerror=null;this.src='./no_img.jpg';"
              width="50"
              height="50"
            />
            <p>${item.name}</p>
          </div>`
      );
      modalItem.on("click", () => selectSuggestion(item));
      modalContent.append(modalItem);
    });

    if (recentItems.length === 0) {
      const emptyMessage = $(
        "<p style='text-align:center; width:100%;'>No recent items found</p>"
      );

      $(modalContent).css("display", "flex");
      modalContent.append(emptyMessage);
    }

    $("#recent-modal").fadeIn();
    $("#recent-modal").css("display", "flex");
  }

  /**
   * Closes the recent items modal.
   */
  function closeRecentModal() {
    $("#recent-modal").fadeOut();
  }

  /**
   * Handles infinite scrolling to fetch more suggestions.
   */
  $("#dropdown-menu").on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const scrollHeight = $(this)[0].scrollHeight;
    const offsetHeight = $(this).outerHeight();
    if (scrollTop + offsetHeight >= scrollHeight - 10) {
      fetchAndAppendItems();
    }
  });

  /**
   * Adds a hover effect on images to expand them.
   */
  $(document).on("mouseenter", "#dropdown-menu img", function () {
    $(this).css({
      transitionDuration: "300ms",
      transform: "scale(1.6)",
      margin: "5px 12px 5px 5px",
    });
  });

  $(document).on("mouseleave", "#dropdown-menu img", function () {
    $(this).css({
      transitionDuration: "300ms",
      transform: "scale(1)",
      margin: "0px",
    });
  });

  /**
   * Handles the Escape key to close the modal.
   */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const isRecentModalOpen = $("#recent-modal").css("display");
      if (isRecentModalOpen === "flex" || isRecentModalOpen === "block") {
        closeRecentModal();
      }
    }
  });

  /**
   * Closes the modal if the user clicks outside of the content.
   */
  window.addEventListener("click", (e) => {
    e.stopPropagation();
    const isClickOutsideContent = $(e.target).attr("id") === "recent-modal";
    if (isClickOutsideContent) {
      closeRecentModal();
    }
  });

  /**
   * Handles search input changes to fetch and display relevant suggestions.
   */
  $("#search-input").on("input", function () {
    query = $(this).val();
    currentPage = 1;
    $("#suggestion-list").empty();
    fetchItems(query, currentPage, pageSize).then((items) => {
      appendSuggestions(items);
      currentPage++;
    });
  });

  /**
   * Binds click events for clearing search input, clearing selections, and opening the recent modal.
   */
  $(".clear-search").on("click", clearSearchInput);
  $(".clear-selections").on("click", clearAllSelections);
  $(".see-all").on("click", openRecentModal);
  $("#close-modal").on("click", closeRecentModal);
  // Initial rendering of recent items.
  renderRecentItems();
});

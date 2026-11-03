import imagesData from '../constants/images.js';
import { createImageElement } from './components/imageElements.js';
import { updateButtons, showPageInfo } from './components/paginationElements.js';
import { handleMagnify } from './components/magnify.js';

export const renderGallery = (() => {
  return () => {

    // Store elements to render the gallery
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterSelect = document.querySelector('.form-control');
    const searchInput = document.querySelector('.search-input');
    const prevButton = document.querySelector('.page-item.disabled');
    const nextButton = document.querySelector('.page-item:not(.disabled)');
    const editPageInfoElement = document.getElementById('editPageInfo');
    const imageLinks = document.querySelectorAll('.img-link');
    const toggleMagnifierBtn = document.querySelector('.toggle-magnifier');
    const toggleMagnifierText = toggleMagnifierBtn.querySelector('.toggle-magnifier-text');
    const magnifierBtnBody = document.getElementById('toggleMagnifier');

    // Combine image categories to main image array
    const images = [
        ...imagesData.bioluminescentGoddessImages,
        ...imagesData.copperGoddessImages,
        ...imagesData.fractalOwlImages,
        ...imagesData.splashSilhouetteImages,
    ];

    // Global variables to change state of application
    let filteredImages = [...images];
    let previousSearchValue = '';
    let itemsPerPage = 6;
    let currentPage = 1;
    let mouseInsideImage = false;
    let magnifierEnabled = false;
    let magnification = 2;

    /**
     * Updates the content of the gallery based on the page number
     * @param {number} currentPage - The number of the current page
     * @param {Array} imagesArray - An array of image data
     * @returns {void}
     */
    const showGallery = (currentPage, imagesArray) => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentImages = imagesArray.slice(startIndex, endIndex);

      galleryGrid.innerHTML = '';
      currentImages.forEach((image) => createImageElement(image, galleryGrid));
      updateButtons(currentPage, itemsPerPage, imagesArray);
      showPageInfo(currentPage, itemsPerPage, imagesArray);
    };

    /**
     * Updates the state of the filtered images based on the selected filter value
     * @returns {void}
     */
    const handleFilterImages = () => {
      let selectedFilter = filterSelect.value;
      filteredImages = [...images];

      if (selectedFilter !== 'All') {
        filteredImages = filteredImages.filter(
          (img) => img.category === selectedFilter
        );
        showPageInfo(currentPage, itemsPerPage, filteredImages);
      }
      currentPage = 1;
      showPageInfo(currentPage, itemsPerPage, filteredImages);
      showGallery(currentPage, filteredImages);

      // Reset the state of search input
      searchInput.value = '';
      handleSearchInput({ target: { value: '' } });
    };

    /**
     * Updates the state of the filtered images based on the search input value
     * @param {Event} event - The event that triggered the function call
     * @returns {void}
     */
    const handleSearchInput = ({ target: { value } }) => {
      const searchValue = value.toLowerCase();

      if (searchValue === '') {
        currentPage = 1;
        previousSearchValue = searchValue;
        showPageInfo(currentPage, itemsPerPage, filteredImages);
        showGallery(currentPage, filteredImages);
      } else if (searchValue !== previousSearchValue) {
        let filteredAndSearchedImages = filteredImages;
        filteredAndSearchedImages = filteredImages.filter((image) => {
          return (
            image.title.toLowerCase().includes(searchValue) ||
            image.category.toLowerCase().includes(searchValue)
          );
        });
        currentPage = 1;
        previousSearchValue = searchValue;
        showPageInfo(currentPage, itemsPerPage, filteredAndSearchedImages);
        showGallery(currentPage, filteredAndSearchedImages);
      }
    };

    /**
     * Handles the pagination for the image gallery
     * @param {string} direction - The direction of pagination: either 'next' or 'prev'
     * @returns {void}
     */
    const handlePagination = (direction) => {
      if (
        direction === 'next' &&
        currentPage * itemsPerPage < filteredImages.length
      ) {
        currentPage++;
      } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
      } else {
        return;
      }
      updateButtons(currentPage, itemsPerPage, filteredImages);
      showPageInfo(currentPage, itemsPerPage, filteredImages);
      showGallery(currentPage, filteredImages);
      scrollToElementWithOffset('gallery', 150);
    };


    // Add event listeners to the filter select and search input elements
    filterSelect.addEventListener('change', handleFilterImages);
    searchInput.addEventListener('input', handleSearchInput);

    // Add event listeners to the next and previous pagination elements
    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      handlePagination('next');
    });
    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      handlePagination('prev');
    });

    // Add event listeners to the next and previous pagination elements
    editPageInfoElement.addEventListener('change', () => {
      const newItemsPerPage = parseInt(editPageInfoElement.value, 10);
      itemsPerPage = newItemsPerPage;
      currentPage = 1;
      updateButtons(currentPage, itemsPerPage, filteredImages);
      showPageInfo(currentPage, itemsPerPage, filteredImages);
      showGallery(currentPage, filteredImages);
      scrollToElementWithOffset('gallery', 150);
    });

    // Add event listener to prevent clicks from redirecting to link if magnifier is enabled
    imageLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        if (magnifierEnabled) {
          e.preventDefault();
        }
      });
    });

    // Add event listener for the mouseover event on images within the .gallery-grid container
    galleryGrid.addEventListener('mouseover', (e) => {
      if (e.target.matches('.gallery-img')) {
        handleMagnify(
          e.target.id,
          magnification,
          magnifierEnabled,
          mouseInsideImage
        );
      }
    });

    // Add event listener to toggle the magnifier functionality and update the UI to reflect the change
    toggleMagnifierBtn.addEventListener('click', (e) => {
      magnifierEnabled = !magnifierEnabled;
      if (magnifierEnabled) {
        toggleMagnifierText.textContent = 'Disable Magnifier';
        e.target.classList.add('active');
        magnifierBtnBody.classList.add('active');
      } else {
        toggleMagnifierText.textContent = 'Enable Magnifier';
        e.target.classList.remove('active');
        magnifierBtnBody.classList.remove('active');
      }
    });

    // Call the main function to render page
    showGallery(currentPage, filteredImages);
  };
})();

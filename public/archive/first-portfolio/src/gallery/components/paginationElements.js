// Store elements to render the gallery
const galleryGrid = document.querySelector('.gallery-grid');
const prevButton = document.querySelector('.page-item.disabled');
const nextButton = document.querySelector('.page-item:not(.disabled)');

/**
 * Shows the current page and total number of pages on the webpage
 * @param {number} currentPage - The number of the current page
 * @param {number} itemsPerPage - The number of items to display per page
 * @param {Array} currentImages - An array of image data
 * @returns {void}
 */
export const showPageInfo = (currentPage, itemsPerPage, currentImages) => {

  const totalPages = Math.ceil(currentImages.length / itemsPerPage);
  const pageInfoElement = document.getElementById('pageNumber');

  let pageInfo = `Page ${currentPage} of ${totalPages}`;

  if (currentImages.length === 0 || itemsPerPage === 0) {
    pageInfo = `Page 0 of 0`;
    pageInfoElement.innerHTML = pageInfo;
  } else {
    pageInfoElement.innerHTML = pageInfo;
  }
};

/**
 * Updates the state of the prev and next buttons based on the current page and number of images
 * @param {number} currentPage - The number of the current page
 * @param {number} itemsPerPage - The number of items to display per page
 * @param {Array} filteredImages - An array of image data
 * @returns {void}
 */
export const updateButtons = (currentPage, itemsPerPage, currentImages) => {

  const nextButtonClass = currentPage * itemsPerPage >= currentImages.length ? 'add' : 'remove';
  nextButton.classList[nextButtonClass]('disabled');

  const prevButtonClass = currentPage === 1 ? 'add' : 'remove';
  prevButton.classList[prevButtonClass]('disabled');

  if (currentImages.length === 0 || itemsPerPage === 0) {
    galleryGrid.innerHTML = '<p class="gallery-msg">No images to display</p>';
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    return;
  } else {
    prevButton.style.display = 'block';
    nextButton.style.display = 'block';
  }
};

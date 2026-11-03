/**
 * Creates an image element to be rendered in the gallery grid
 * @param {Object} image - An object representing an image, with properties href, src, alt, category, title, and desc
 * @param {HTMLElement} galleryGrid - The element that represents the gallery grid
 * @returns {HTMLDivElement} - A div element that represents the wrapped image and its associated elements, such as the link, title, description, and show description button
 */
export const createImageElement = (() => {
  return (image, galleryGrid) => {

    // Create a div to wrap the image
    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap', 'col-sm-6', 'col-md-4', 'col-lg-3');

    // Create a link element
    const link = document.createElement('a');
    link.href = image.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.classList.add('img-link');

    // Create an image element
    const img = document.createElement('img');
    img.src = image.src;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = image.alt;
    img.id = `${image.category}_${image.id}`;
    img.setAttribute('data-category', image.category);
    img.setAttribute('data-title', image.title);
    img.setAttribute('data-desc', image.desc);
    img.classList.add('gallery-img', 'img-fluid');
    img.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    // Create a title element
    const title = document.createElement('h5');
    title.textContent = image.title;
    title.classList.add('image-title', 'text-center');

    // Create a description element
    const category = document.createElement('p');
    category.textContent = `${image.category}`;
    category.classList.add('image-category', 'text-center');

    // Create a description element
    const description = document.createElement('p');
    description.textContent = image.desc;
    description.classList.add('image-desc', 'text-center');

    // Create a button to show the description
    const showDescriptionButton = document.createElement('button');
    showDescriptionButton.textContent = 'Show Description';
    showDescriptionButton.classList.add('btn', 'btn-show-description');
    showDescriptionButton.id = 'showDescriptionBtn';
    showDescriptionButton.addEventListener('click', () => {
      showDescriptionButton.classList.toggle('active');
      description.classList.toggle('active');
      if (showDescriptionButton.classList.contains('active')) {
        showDescriptionButton.textContent = 'Hide Description';
      } else {
        showDescriptionButton.textContent = 'Show Description';
      }
    });

    // Append the elements to the image wrap
    imageWrap.appendChild(title);
    imageWrap.appendChild(category);
    imageWrap.appendChild(link);
    imageWrap.appendChild(showDescriptionButton);
    imageWrap.appendChild(description);

    // Append the image to the link and the image wrap to the gallery grid
    link.appendChild(img);
    galleryGrid.appendChild(imageWrap);
    return imageWrap;
  };
})();

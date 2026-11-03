const header = document.getElementById('header');
const upArrow = document.getElementById('up-arrow');
const sticky = header.offsetTop;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add('sticky');
    upArrow.style.display = 'block';
  } else {
    header.classList.remove('sticky');
    upArrow.style.display = 'none';
  }
}

// Call sticky header on scroll
window.onscroll = () => stickyHeader();

// Define function to add offset to link scrolling
function scrollToElementWithOffset(elementId, offset) {
  let element = document.getElementById(elementId);
  window.scrollTo({
    top: element.offsetTop - offset,
    behavior: 'smooth',
  });
}

// Handle scrolling offset to counter navbar
const scrollLinks = document.querySelectorAll('.scroll-link');
for (let i = 0; i < scrollLinks.length; i++) {
  scrollLinks[i].addEventListener('click', function (event) {
    event.preventDefault();
    let href = this.getAttribute('href');
    let elementId = href.substr(1);
    let offset = 125;
    scrollToElementWithOffset(elementId, offset);
  });
}

import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryName = 'gallery';
const galleryEl = document.querySelector(`.${galleryName}`);

const createGallery = ({ gallery, galleryName }) =>
  (gallery.innerHTML = galleryItems.reduce(
    (arr, { preview, original, description }) =>
      `${arr}\n
        <a class='${galleryName}__item ${galleryName}__link' href='${original}'>
            <img class='${galleryName}__image' src='${preview}' alt='${description}' width='320px'>
        </a>
    `,
    ''
  ));

createGallery({ gallery: galleryEl, galleryName: galleryName });

new SimpleLightbox('.gallery__item', {
  captionDelay: 250,
  captionsData: 'alt',
  fadeSpeed: 250,
  scrollZoom: false,
});

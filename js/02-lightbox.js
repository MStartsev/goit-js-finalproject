import { galleryItems } from './gallery-items.js';
// Change code below this line

const container = 'gallery';
const galleryEl = document.querySelector(`.${container}`);

const createGallery = ({ gallery, container }) =>
  (gallery.innerHTML = galleryItems.reduce(
    (arr, { preview, original, description }) =>
      `${arr}\n
        <a class='${container}__item ${container}__link' href='${original}'>
            <img class='${container}__image' src='${preview}' alt='${description}' width='320px'>
        </a>
    `,
    ''
  ));

createGallery({ gallery: galleryEl, container: container });

new SimpleLightbox('.gallery__item', {
  captionDelay: 250,
  captionsData: 'alt',
  fadeSpeed: 250,
  scrollZoom: false,
});

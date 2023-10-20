import { galleryItems } from "./gallery-items.js";

const galleryName = "gallery";
const galleryContainer = document.querySelector(`.js-${galleryName}`);

const createGallery = ({ container, name }) =>
  (container.innerHTML = galleryItems.reduce(
    (arr, { preview, original, description }) =>
      `${arr}\n
      <li class='${name}__item'>
        <a class='${name}__link' href='${original}'>
            <img class='${name}__image' src='${preview}' alt='${description}' width='320' height='240'>
        </a>
      </li>`,
    ""
  ));

createGallery({ container: galleryContainer, name: galleryName });

new SimpleLightbox(".gallery__link", {
  captionDelay: 250,
  captionsData: "alt",
  fadeSpeed: 250,
  scrollZoom: false,
});

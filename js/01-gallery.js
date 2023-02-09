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

galleryEl.onclick = e => {
  e.preventDefault();
  if (!e.target.classList.contains(`${container}__image`)) return;

  const modal = basicLightbox.create(
    `<img width="1400" height="900" src="${e.target.offsetParent.href}">`,
    {
      onShow: e => {
        window.addEventListener('keydown', closeModal);
      },
      onClose: e => {
        window.removeEventListener('keydown', closeModal);
      },
    }
  );

  modal.show();

  function closeModal(e) {
    if (e.code === 'Escape') {
      modal.close();
    }
  }
};

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

galleryEl.onclick = e => {
  e.preventDefault();
  if (!e.target.classList.contains(`${galleryName}__image`)) return;

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

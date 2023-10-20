import { galleryItems } from "./gallery-items.js";

class BasicLightGallery {
  #container;

  #bodyScroll = {
    scrollBarWidth: window.innerWidth - document.body.clientWidth,

    disable() {
      document.body.style.marginRight = `${this.scrollBarWidth}px`;
      document.body.style.overflowY = "hidden";
    },
    enable() {
      document.body.style.marginRight = null;
      document.body.style.overflowY = null;
    },
  };

  constructor({ galleryName, itemBase }) {
    this.itemBase = itemBase;
    this.galleryName = galleryName;
    this.#container =
      document.querySelector(`.js-${this.galleryName}`) ||
      document.querySelector(`.${this.galleryName}`);

    this.createGallery();
    this.addModal();
  }

  createGallery() {
    this.#container.innerHTML =
      `<ul class='${this.galleryName}'>` +
      this.itemBase
        .map(
          ({ preview, original, description }) =>
            `<li class='${this.galleryName}__item'>
            <a class='${this.galleryName}__link' href='${original}'>

              <img
                class='${this.galleryName}__image' src='${preview}' 
                alt='${description}' 
                width='320' 
                height='240'>

            </a>
          </li>`
        )
        .join("") +
      `</ul>`;
  }

  #handleModal(e) {
    e.preventDefault();
    if (!e.target.classList.contains(`${this.galleryName}__image`)) return;

    try {
      const modal = basicLightbox.create(
        `<img width="1280" height="850" src="${e.target.offsetParent.children[0].href}">`,
        {
          onShow: (e) => {
            window.addEventListener("keydown", closeModal);
            this.#bodyScroll.disable();
          },
          onClose: (e) => {
            window.removeEventListener("keydown", closeModal);
            this.#bodyScroll.enable();
          },
        }
      );

      modal.show(e);
    } catch (error) {
      console.error(
        `%cGallery Modal Window ERROR!\n%cbasicLightbox is not defined!\n%cRead more: https://basiclightbox.electerious.com`,
        "color: red",
        "color: orange",
        "color: #0075ff"
      );
    }

    function closeModal(e) {
      if (e.code === "Escape") {
        modal.close();
      }
    }
  }

  addModal() {
    this.#container.addEventListener("click", (e) => {
      this.#handleModal(e);
    });
  }
}

const gallery = new BasicLightGallery({
  itemBase: galleryItems,
  galleryName: "gallery",
});

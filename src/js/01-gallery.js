// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector('ul.gallery');

const createImg = () => {
  galleryRef.innerHTML = galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
            <a class="gallery__link" href="${original}" onclick="return false";>
            <img 
              class="gallery__image"
              src = "${preview}"
              alt="${description}";>
        </a></li>`
    )
    .join('');
};
createImg();

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

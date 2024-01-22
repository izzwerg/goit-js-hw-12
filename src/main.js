import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', imageSearch);
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '11329962-6436ba51ddb58bb96deed169a';

function imageSearch(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  loader.classList.add('is-visible');

  const form = e.currentTarget;
  const searchTerm = form.elements.searchTerm.value;

  getImages(searchTerm)
    .then(images => {
      if (images.hits == 0) {
        noFoundMessage();
      } else {
        let markup = '';
        for (const image of images.hits) {
          markup += createMarkup(image);
        }
        loader.classList.remove('is-visible');
        gallery.innerHTML = markup;
        const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();
      }
    })
    .catch(error => console.log(error))
    .finally(() => form.reset());
}

function getImages(searchTerm) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 9,
  });

  return fetch(`${BASE_URL}/?${urlParams}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="gallery-details">
            <div class="detail"><img class="gallery-logo" src="like.png" /> <p class="gallery-text">${likes}</p></div>
            <div class="detail"><img class="gallery-logo" src="viev.png" /> <p class="gallery-text">${views}</p></div>
            <div class="detail"><img class="gallery-logo" src="comment.png" /> <p class="gallery-text">${comments}</p></div>
            <div class="detail"><img class="gallery-logo" src="download.png" /> <p class="gallery-text">${downloads}</p></div>
        </div>
    </li>`;
}

function noFoundMessage() {
  iziToast.show({
    position: 'topRight',
    messageColor: 'white',
    iconUrl: 'error.svg',
    iconColor: 'white',
    color: '#EF4040',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
  loader.classList.remove('is-visible');
}

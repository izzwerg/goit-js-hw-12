import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.form');
form.addEventListener('submit', imageSearch);
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const moreButton = document.querySelector('.is-hidden');
const API_KEY = '11329962-6436ba51ddb58bb96deed169a';
let pageNumber;
let searchTerm;

axios.defaults.baseURL = 'https://pixabay.com/api';

async function imageSearch(e) {
  pageNumber = 1;
  e.preventDefault();
  gallery.innerHTML = '';
  loader.classList.add('is-visible');

  const form = e.currentTarget;
  searchTerm = form.elements.searchTerm.value;

  try {
    let images = await getImages(searchTerm);

    if (images.total === 0) {
      noFoundMessage();
    } else {
      addMarkup(images);
    }
  } catch (error) {
    errorMessage(error.message);
  } finally {
    form.reset();
  }
}

async function addMoreImages() {
  loader.classList.add('is-visible');
  try {
    let images = await getImages(searchTerm);
    addMarkup(images);
    let elem = gallery.querySelector('li');
    let rect = elem.getBoundingClientRect();
    scrollBy({
      top: rect.height * 2 + 48,
      behavior: 'smooth',
    });
  } catch (error) {
    errorMessage(error.message);
  }
}

function addMarkup(images) {
  moreButton.classList.remove('is-visible');
  let markup = '';
  for (const image of images.hits) {
    markup += createMarkup(image);
  }
  loader.classList.remove('is-visible');
  gallery.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
  checkMore(images.totalHits);
}

function checkMore(maxImages) {
  if (gallery.querySelectorAll('li').length < maxImages) {
    moreButton.addEventListener('click', addMoreImages);
    moreButton.classList.add('is-visible');
  } else {
    noMoreMessage();
  }
}

async function getImages(searchTerm) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
    page: pageNumber,
  });

  const response = await axios.get(`/?${urlParams}`);
  pageNumber++;
  return response.data;
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

function errorMessage(msg) {
  iziToast.show({
    position: 'topRight',
    messageColor: 'white',
    iconUrl: 'attention.png',
    iconColor: 'white',
    color: '#EF4040',
    message: msg,
  });
  loader.classList.remove('is-visible');
}

function noMoreMessage() {
  iziToast.show({
    position: 'topRight',
    messageColor: 'white',
    iconUrl: 'fin.png',
    iconColor: 'white',
    color: '#4E75FF',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

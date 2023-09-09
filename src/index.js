// import 'simplelightbox/dist/simple-lightbox.min.css';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
// import { fetchImages } from './api.js';
// import { initializeGallery, refreshGallery, createPhotoCard } from './gallery.js';

// const form = document.getElementById('search-form');
// const gallery = document.querySelector('.gallery');
// const loadMoreButton = document.querySelector('.load-more');
// let page = 1;
// const perPage = 40;
// let totalHits = 0;
// let lastCard = null;
// let isFirstSearch = true;
// let lightbox = null;

// function handleScroll() {
//     const windowHeight = window.innerHeight;
//     const scrollY = window.scrollY;
//     const lastCardRect = lastCard.getBoundingClientRect();

//     if (lastCardRect.bottom <= windowHeight + scrollY) {
//         loadNextPage();
//     }
// }

// async function loadNextPage() {
//     if (page * perPage < totalHits) {
//         page++;
//         await searchImages();
//         lastCard = document.querySelector('.gallery .photo-card:last-child');
//     }
// }

// async function searchImages() {
//     const searchQuery = document.querySelector('input[name="searchQuery"]').value;

//     if (!searchQuery) {
//         Notiflix.Notify.failure('Please enter a search query.');
//         return;
//     }

//     try {
//         const response = await fetchImages(searchQuery, page, perPage);

//         if (response.hits.length === 0) {
//             Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
//             return;
//         }

//         const images = response.hits;
//         images.forEach((image) => {
//             const photoCard = createPhotoCard(image);
//             gallery.appendChild(photoCard);
//         });

//         totalHits = response.totalHits;

//         if (isFirstSearch) {
//             Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//             isFirstSearch = false;
//             lightbox = initializeGallery();
//             refreshGallery(lightbox);
//         }

//         if (page * perPage < totalHits) {
//             loadMoreButton.style.display = 'block';
//         } else {
//             loadMoreButton.style.display = 'none';
//         }

//         lastCard = document.querySelector('.gallery .photo-card:last-child');
//     } catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//         Notiflix.Notify.failure('An error occurred while fetching the data. Please try again later.');
//     }
// }

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     gallery.innerHTML = '';
//     page = 1;
//     searchImages();
// });

// loadMoreButton.addEventListener('click', loadNextPage);

// window.addEventListener('scroll', debounce(handleScroll, 300));

// loadNextPage();





// 2 VARIANT



// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
// import { fetchImages } from './api.js';
// import { createPhotoCard } from './gallery.js';


// const form = document.getElementById('search-form');
// const gallery = document.querySelector('.gallery');
// const loadMoreButton = document.querySelector('.load-more');

// let page = 1;
// const perPage = 40;
// let totalHits = 0;
// let lastCard = null;
// let isFirstSearch = true;
// let lightbox = null;
// function handleScroll() {
//     const windowHeight = window.innerHeight;
//     const scrollY = window.scrollY;
//     const lastCardRect = lastCard.getBoundingClientRect();
//     if (lastCardRect.bottom <= windowHeight + scrollY) {
//         loadNextPage();
//     }
// }
// async function loadNextPage() {
//     if (page * perPage < totalHits) {
//         page++;
//         await searchImages();
//         lastCard = document.querySelector('.gallery .photo-card:last-child');
//         // Виклик refresh після завантаження нових фотографій
//         lightbox.refresh();
//     }
// }
// async function searchImages() {
//     const searchQuery = document.querySelector('input[name="searchQuery"]').value;
//     if (!searchQuery) {
//         Notiflix.Notify.failure('Please enter a search query.');
//         return;
//     }
//     try {
//         const response = await fetchImages(searchQuery, page, perPage);
//         if (response.hits.length === 0) {
//             Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
//             return;
//         }
//         const images = response.hits;
//         images.forEach((image) => {
//             const photoCard = createPhotoCard(image);
//             gallery.appendChild(photoCard);
//         });
//         totalHits = response.totalHits;
//         if (isFirstSearch) {
//             Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//             isFirstSearch = false;
//             lightbox = new SimpleLightbox('.gallery a', {
//                 captionsData: 'alt',
//                 captionDelay: 250,
//             });
//         }
//         if (page * perPage < totalHits) {
//             loadMoreButton.style.display = 'block';
//         } else {
//             loadMoreButton.style.display = 'none';
//         }
//         lastCard = document.querySelector('.gallery .photo-card:last-child');
//     } catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//         Notiflix.Notify.failure('An error occurred while fetching the data. Please try again later.');
//     }
// }
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     gallery.innerHTML = '';
//     page = 1;
//     searchImages();
//     // Виклик refresh після очищення та перевідкриття галереї
//     lightbox.refresh();
// });
// loadMoreButton.addEventListener('click', loadNextPage);
// window.addEventListener('scroll', debounce(handleScroll, 300));
// loadNextPage();


// 3 VARIANT

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchImages } from './api.js';
import { createPhotoCard } from './gallery.js';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let page = 1;
const perPage = 40;
let totalHits = 0;
let lastCard = null;
let isFirstSearch = true;
let lightbox = null;

function handleScroll() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const lastCardRect = lastCard.getBoundingClientRect();
    if (lastCardRect.bottom <= windowHeight + scrollY) {
        loadNextPage();
    }
}

async function loadNextPage() {
    if (page * perPage < totalHits) {
        page++;
        await searchImages();
        lastCard = document.querySelector('.gallery .photo-card:last-child');
        // Виклик refresh після завантаження нових фотографій
        lightbox.refresh();
    }
}

async function searchImages() {
    const searchQuery = document.querySelector('input[name="searchQuery"]').value;
    if (!searchQuery) {
        Notiflix.Notify.failure('Please enter a search query.');
        return;
    }
    try {
        const response = await fetchImages(searchQuery, page, perPage);
        if (response.hits.length === 0) {
            Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        const images = response.hits;
        images.forEach((image) => {
            const photoCard = createPhotoCard(image);
            gallery.appendChild(photoCard);
        });
        totalHits = response.totalHits;
        if (isFirstSearch) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            isFirstSearch = false;
            lightbox = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250,
            });
        }
        if (page * perPage < totalHits) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }
        lastCard = document.querySelector('.gallery .photo-card:last-child');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        Notiflix.Notify.failure('An error occurred while fetching the data. Please try again later.');
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    searchImages();
    // Видаліть наступний рядок з позначкою 'Виклик refresh після очищення та перевідкриття галереї'
    // lightbox.refresh();
});

loadMoreButton.addEventListener('click', loadNextPage);
window.addEventListener('scroll', debounce(handleScroll, 300));
loadNextPage();

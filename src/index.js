import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';
import axios from 'axios';
import Notiflix from 'notiflix';

// Константи та змінні
const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let page = 1;
const perPage = 40;
let totalHits = 0;
let lastCard = null;

// Функція для створення картки зображення
function createPhotoCard(image) {
    const photoCard = document.createElement('a');
    photoCard.classList.add('photo-card');
    photoCard.href = image.largeImageURL;

    const img = document.createElement('img');
    img.src = image.largeImageURL;
    img.alt = image.tags;
    img.loading = 'lazy';

    const info = document.createElement('div');
    info.classList.add('info');

    const likes = document.createElement('p');
    likes.classList.add('info-item');
    likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

    const views = document.createElement('p');
    views.classList.add('info-item');
    views.innerHTML = `<b>Views:</b> ${image.views}`;

    const comments = document.createElement('p');
    comments.classList.add('info-item');
    comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

    const downloads = document.createElement('p');
    downloads.classList.add('info-item');
    downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

    info.appendChild(likes);
    info.appendChild(views);
    info.appendChild(comments);
    info.appendChild(downloads);

    photoCard.appendChild(img);
    photoCard.appendChild(info);

    return photoCard;
}


// Функція для виконання пошуку зображень
async function searchImages() {
    const searchQuery = document.querySelector('input[name="searchQuery"]').value;

    if (!searchQuery) {
        Notiflix.Notify.failure('Please enter a search query.');
        return;
    }

    const apiKey = '39305743-6b78f5777c3200efc39eb3696';
    const baseUrl = 'https://pixabay.com/api/';
    const params = {
        key: apiKey,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
    };

    try {
        const response = await axios.get(baseUrl, { params });

        if (response.data.hits.length === 0) {
            Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
            return;
        }

        const images = response.data.hits;
        images.forEach((image) => {
            const photoCard = createPhotoCard(image);
            gallery.appendChild(photoCard);
        });

        totalHits = response.data.totalHits;
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

        if (page * perPage < totalHits) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }

        const lightbox = new SimpleLightbox('.gallery a', {});
        lightbox.refresh();

        lastCard = document.querySelector('.gallery .photo-card:last-child');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        Notiflix.Notify.failure('An error occurred while fetching the data. Please try again later.');
    }
}

async function loadNextPage() {
    if (page * perPage < totalHits) {
        page++;
        await searchImages();
        lastCard = document.querySelector('.gallery .photo-card:last-child');
    }
}

function handleScroll() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const lastCardRect = lastCard.getBoundingClientRect();

    if (lastCardRect.bottom <= windowHeight + scrollY) {
        loadNextPage();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    searchImages();
});

loadMoreButton.addEventListener('click', loadNextPage);

window.addEventListener('scroll', debounce(handleScroll, 300));

loadNextPage();

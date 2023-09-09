import SimpleLightbox from 'simplelightbox';

export function initializeGallery() {
    return new SimpleLightbox('.gallery a', {});
}

export function refreshGallery(lightbox) {
    lightbox.refresh();
}

export function createPhotoCard(image) {
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



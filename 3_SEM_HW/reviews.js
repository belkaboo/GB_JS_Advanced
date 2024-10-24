import { saveReviewsToLocalStorage, getReviewsFromLocalStorage } from './storage.js';

const reviewsContainer = document.querySelector('.reviews_container');


function loadReviews(option) {
    const reviews = getReviewsFromLocalStorage();
    reviewsContainer.innerHTML = '';

    Object.keys(reviews).forEach(productName => { //переписать на insertAdjacentHTML

        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productTitle = document.createElement('h3');
        productTitle.textContent = productName;

        productDiv.appendChild(productTitle);

        reviews[productName].forEach((review, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review', option); // костыль для корректной перерисовки
            reviewDiv.textContent = review;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить отзыв';
            deleteButton.classList.add('delete-btn');

            deleteButton.addEventListener('click', () => {
                deleteReview(productName, index);
            });

            reviewDiv.appendChild(deleteButton);
            productDiv.appendChild(reviewDiv);
        });

        reviewsContainer.appendChild(productDiv);
    });

    document.querySelectorAll('h3').forEach(currentItem => {
        currentItem.addEventListener('click', (e) => {
            const childes = e.target.parentNode.childNodes
            for (let i = 1; i < childes.length; i++) {
                if (childes[i].classList.contains('hide')) childes[i].classList.remove('hide')
                else childes[i].classList.add('hide')
            }
        });
    });
}

function deleteReview(productName, reviewIndex) {
    const reviews = getReviewsFromLocalStorage();
    reviews[productName].splice(reviewIndex, 1);

    if (reviews[productName].length === 0) {
        delete reviews[productName];
    }

    saveReviewsToLocalStorage(reviews);
    loadReviews();
}



loadReviews('hide');

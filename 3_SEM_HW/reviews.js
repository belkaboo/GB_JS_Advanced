import { saveReviewsToLocalStorage, getReviewsFromLocalStorage } from './storage.js';
const reviewsContainer = document.querySelector('.reviews_container');

function deleteReview(productName, reviewIndex) {
    const reviews = getReviewsFromLocalStorage();
    reviews[productName].splice(reviewIndex, 1);

    if (reviews[productName].length === 0) {
        delete reviews[productName];
    }

    saveReviewsToLocalStorage(reviews);
    loadReviews();
}

function loadReviews() {
    const reviews = getReviewsFromLocalStorage();
    reviewsContainer.innerHTML = '';

    Object.keys(reviews).forEach(productName => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productTitle = document.createElement('h3');
        productTitle.textContent = productName;

        productDiv.appendChild(productTitle);

        reviews[productName].forEach((review, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review', 'hide');
            reviewDiv.textContent = review;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.classList.add('delete-btn');

            deleteButton.addEventListener('click', () => {
                deleteReview(productName, index);
            });

            reviewDiv.appendChild(deleteButton);
            productDiv.appendChild(reviewDiv);
        });

        reviewsContainer.appendChild(productDiv);
    });


    document.querySelectorAll('.product').forEach(currentItem => {
        currentItem.addEventListener('click', (e) => {
            if (e.target.nextSibling.classList.contains('hide')) {
                e.target.nextSibling.classList.remove('hide')
            }
            else e.target.nextSibling.classList.add('hide')
        });
    });
}

loadReviews();





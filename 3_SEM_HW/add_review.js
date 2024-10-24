import { saveReviewsToLocalStorage, getReviewsFromLocalStorage } from './storage.js';

const inputProduct = document.querySelector('.input_product');
const inputReview = document.querySelector('.input_review');
const submitReviewButton = document.querySelector('.submit_review');

function addReview() {
    const productName = inputProduct.value.trim();
    const reviewText = inputReview.value.trim();
    const errorContainer = document.querySelector('.error_container');

    errorContainer.innerHTML = '';

    if (!productName || !reviewText) {
        errorContainer.insertAdjacentHTML('beforeend', `
            <p class="error">Необходимо заполнить оба поля.</p>
        `);
        return;
    }

    const reviews = getReviewsFromLocalStorage();

    if (!reviews[productName]) {
        reviews[productName] = [];
    }

    reviews[productName].push(reviewText);
    saveReviewsToLocalStorage(reviews);

    inputProduct.value = '';
    inputReview.value = '';
}

submitReviewButton.addEventListener('click', addReview);
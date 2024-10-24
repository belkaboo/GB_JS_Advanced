export const STORAGE_KEY = 'productReviews';

export function saveReviewsToLocalStorage(reviews) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function getReviewsFromLocalStorage() {
    const reviews = localStorage.getItem(STORAGE_KEY);
    return reviews ? JSON.parse(reviews) : {};
}

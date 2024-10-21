// Задание 1

class Library {

    #books = [];

    constructor(books) {
        try {
            if (books.length === new Set(books).size) this.#books = books;
            else throw new Error('Duplicates in initial books');

        } catch (error) {
            console.log(error);
        }
    }


    get allBooks() {
        return this.#books;
    }

    addBook(tittle) {
        try {
            this.#books.forEach(book => {
                if (book === tittle) {
                    throw new Error('the book already exists');
                }

            });
            this.#books.push(tittle);

        } catch (error) {
            console.log(error);
        }

    }

    removeBook(tittle) {
        try {
            if (this.#books.includes(tittle)) {
                this.#books.splice(this.#books.indexOf(tittle), 1);
            }
            else {
                throw new Error('Book not found');

            }

        } catch (error) {
            console.log(error);
        }

    }

    hasBook(tittle) {
        console.log(this.#books.includes(tittle) ? 'Book found in library' : 'Book not found in library');
    }

}

// проверка

const books = [
    'Джордж Оруэлл - 1984',
    'Фёдор Достоевский - Преступление и наказание',
    'Дж. Р. Р. Толкин - Властелин колец',
    'Пелевин - Чапаев и пустота'
];

const booksForExeption = [
    'Джордж Оруэлл - 1984',
    'Джордж Оруэлл - 1984', // дубликат
    'Фёдор Достоевский - Преступление и наказание',
    'Дж. Р. Р. Толкин - Властелин колец',
    'Пелевин - Чапаев и пустота'
]

const lib = new Library(books);
lib.addBook('Джордж Мартин - Песнь льда и пламени');
lib.removeBook('Джордж Оруэлл - 1984');
lib.hasBook('Пелевин - Чапаев и пустота');

console.log(lib.allBooks);

// const lib1 = new Library(booksForExeption); // для вызова ошибки дубликата




//Задание 2


const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            { id: "1", text: "Отличный телефон! Батарея держится долго." },
            { id: "2", text: "Камера супер, фото выглядят просто потрясающе." }
        ]
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            { id: "3", text: "Интересный дизайн, но дорогой." }
        ]
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            { id: "4", text: "Люблю играть на PS5, графика на высоте." }
        ]
    }
];

// ДОбавить отзыв
function addReview(product, reviewText) {

    if (reviewText.length < 50 || reviewText.length > 500) {
        throw new Error('Длина отзыва должна быть от 50 до 500 символов.');
    }

    const reviewContainer = document.querySelector('.reviews');

    let productElement = Array.from(reviewContainer.children).find(
        element => element.querySelector('h3') && element.querySelector('h3').textContent === product
    );

    if (!productElement) {
        reviewContainer.insertAdjacentHTML('beforeend', `
        <div class="product">
          <h3>${product}</h3>
          <div class="review">${reviewText}</div>
        </div>`);
    } else {
        productElement.insertAdjacentHTML('beforeend', `
            <div class="review">${reviewText}</div>`);
    }
}


//кнопка и ошбка
document.querySelector('.submit_review').addEventListener('click', () => {
    const productInput = document.querySelector('.input_product');
    const reviewInput = document.querySelector('.input_review');
    const errorMessage = document.querySelector('.error');

    try {
        errorMessage.textContent = '';
        addReview(productInput.value, reviewInput.value);
        productInput.value = '';
        reviewInput.value = '';
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});




function loadInitialData(initial) {
    if (initial != null) {
        const reviewContainer = document.querySelector('.reviews');
        initial.forEach(product => {
            let productHTML = `
        <div class="product">
          <h3>${product.product}</h3>`;

            product.reviews.forEach(review => {
                productHTML += `<div class="review">${review.text}</div>`;
            });

            productHTML += `</div>`;
            reviewContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    }
}

//loadInitialData(initialData); // с использованием initialData
loadInitialData(); // пусто



/*
Создать механизм для безопасного добавления метаданных к
объектам книг с использованием Symbol.
1. Создать уникальные символы для метаданных: отзывы,
рейтинг, теги.
2. Реализовать функции addMetadata (добавление метаданных)
и getMetadata (получение метаданных).
3. Создать объект книги, добавить метаданные и вывести их на
консоль.
*/

function addMetadata(book, metaDataType, data) {
    if (book[metaDataType]) {
        book[metaDataType].push(data);
    }
    else {
        book[metaDataType] = [data];
    }
}

function getMetadata(book, metaDataType) {
    return book[metaDataType]
}

const book = {
    title: "1984",
    author: "George Orwell"
};

const reviewSymbol = Symbol('review');
const ratingSymbol = Symbol('rating');
const tagsSymbol = Symbol('tags');

addMetadata(book, reviewSymbol, 'Отличная книга');
addMetadata(book, ratingSymbol, 5);
addMetadata(book, tagsSymbol, 'утопия');

console.log(getMetadata(book, reviewSymbol));
console.log(getMetadata(book, ratingSymbol));
console.log(getMetadata(book, tagsSymbol));

/*
Используя Symbol.iterator, создайте объект "Библиотека", который можно
итерировать. Каждая итерация должна возвращать следующую книгу из библиотеки.
1. Создайте объект library, который содержит массив книг и имеет свойствосимвол Symbol.iterator.
2. Реализуйте кастомный итератор для объекта library. Итератор должен
перебирать книги по порядку.
3. Используйте цикл for...of для перебора книг в библиотеке и вывода их на
консоль.
*/

const books = [
    { title: "1984", author: "George Orwell" },
    { title: "Brave New World", author: "Aldous Huxley" },
    { title: "Fahrenheit 451", author: "Ray Bradbury" },

    book[Symbol.iterator] = function () {
        current: 0;
        to: this.length;
        next();
        if (this.current < this.to) {
            done: false;
            value: books[this.current++];
        }
        else {
            done: true;
        }
    }
];


for (const book of books) {
    console.log(`title: ${book.title} author: ${book.author}`);
}


let obj = {
    from: 1,
    to: 10,
    [Symbol.iterator]: function () {
        let current = this.from;
        let last = this.to;
        return {
            next() {
                return current < last ? { done: false, value: current++, } : { done: true }
            }
        }
    }
};

for (let num of obj) {
    console.log(num);
};


/*
Часто при работе с DOM мы сталкиваемся с коллекциями элементов, которые не являются стандартными
массивами, но похожи на них. Однако у таких коллекций нет методов массива, и здесь на помощь приходит
Array.from. В этом задании вы научитесь конвертировать коллекции DOM-элементов в массивы и работать
с ними.
Дан код html:
<div>Element 1</div>
<div data-active="true">Element 2</div>
<div>Element 3</div>
<div data-active="true">Element 4</div>
Напишите функцию, которая собирает все элементы <div> на странице, преобразует их в массив и
фильтрует только те из них, у которых есть атрибут data-active.
Выведите результат на консоль.
*/

const elems = document.querySelectorAll('div');
const elemArr = Array.from(elems).filter(elem => elem.dataset.active);
//const elemArr = Array.from(elems).filter(elem => elem.hasAttribute('data-active'));

elemArr.forEach(currentItem => {
    console.log(currentItem.textContent);
});


/*
Представьте себе ситуацию: у нас есть группа студентов, и мы хотим отследить,
кто из них посетил какие уроки и кто из преподавателей вёл данные уроки.
1. Map будет использоваться для хранения соответствия между уроком и
преподавателем.
2. Set будет использоваться для хранения уникальных уроков, которые
посетил каждый студент.
*/
const lessons = new Map();

lessons.set('Math', 'Smirnov')
    .set('Hystory', 'Ivanova');

const ivan = new Set();

ivan.add('Math')
    .add('Hystory');


const students = new Map();

students.set('Ivan', ivan);


console.log(`Math teacher: ${lessons.get('Math')}`);
console.log(`Ivan's lessons: ${[...students.get('Ivan')]}`);


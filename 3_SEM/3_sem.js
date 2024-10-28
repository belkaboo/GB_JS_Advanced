/*
Вы разрабатываете прототип веб-приложения для чтения новостей. Статьи "хранятся" во внутреннем массиве
(имитируя базу данных). Когда пользователь нажимает на кнопку "Загрузить новости", ваш код должен
имитировать задержку, словно происходит реальная загрузка данных из внешнего источника, а после этой
задержки — отображать новости на странице.
1. Создайте базовую HTML-структуру с кнопкой для загрузки новостей и контейнером для их отображения.
2. Реализуйте функцию fetchNews(), возвращающую промис. Эта функция должна имитировать
задержку в 2 секунды перед успешным возвращением данных из "виртуальной" базы данных. Для
добавления интереса: с вероятностью 10% она должна возвращать ошибку вместо данных.
3. При нажатии на кнопку "Загрузить новости" вызывайте функцию fetchNews(), обрабатывая успешное
выполнение и ошибки с использованием then() и catch().
4. При успешной загрузке отобразите статьи на странице. При ошибке покажите сообщение об ошибке.
5. Добавьте функционал, который отключает кнопку загрузки на время "загрузки" новостей и активирует
её снова после завершения операции (будь то успешная загрузка или ошибка).
*/

const btn = document.querySelector('.load');
const news = document.querySelector('.news');

const dataBase = [
    {
        tittle: 'Название статьи 1',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
        tittle: 'Название статьи 2',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto.'
    },
    {
        tittle: 'Название статьи 3',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, eos.'
    },
]


function fetchNews(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve(data);
            }
            else {
                reject('Ошибка загрузки')
            }
        }, 3000);
    });
};


btn.addEventListener('click', () => {

    news.innerHTML = ''
    btn.disabled = true;

    fetchNews(dataBase)
        .then(data => {
            data.forEach((elem) => {
                const tittle = document.createElement('h3');
                const content = document.createElement('p');
                tittle.textContent = elem.tittle;
                content.textContent = elem.content;
                news.appendChild(tittle);
                news.appendChild(content);

            });
        }).catch((err) => {
            const error = document.createElement('p');
            error.textContent = err;
            news.appendChild(error);
        }).finally(() => {
            btn.disabled = false;
        });
});



/*
Создать интерактивную веб-страницу, где пользователи могут вводить текст, сохранять его в localStorage,
а затем загружать или удалять сохраненные данные.
Разработка Интерфейса:
Создать HTML-страницу с:
● Одним текстовым полем для ввода данных пользователем.
● Тремя кнопками: "Сохранить", "Загрузить" и "Очистить".
● Местом для отображения сохраненного текста.
Программирование Логики на JavaScript:
1. При нажатии на "Сохранить", введенный текст должен сохраняться в localStorage.
2. При нажатии на "Загрузить", текст из localStorage должен отображаться на странице.
3. При нажатии на "Очистить", сохраненный текст должен быть удален из localStorage, и соответствующее
сообщение отображается на странице.
*/

const textArea = document.querySelector('.text-input');
const btnSave = document.querySelector('.btn-save');
const btnLoad = document.querySelector('.btn-load');
const btnClear = document.querySelector('.btn-clear');
const notesDiv = document.querySelector('.notes-items');

btnSave.addEventListener('click', () => {
    notesDiv.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    try {
        if (textArea.value !== '') {
            const text = textArea.value.trim();
            notes.push(text);
            localStorage.setItem('notes', JSON.stringify(notes));
            textArea.value = '';
        }
        else {
            throw new Error("Пусто");

        }
    } catch (error) {
        notesDiv.textContent = error;
        setTimeout(() => {
            notesDiv.textContent = '';
        }, 2000);

    }
});


btnLoad.addEventListener('click', () => {
    notesDiv.innerHTML = '';
    if (localStorage.getItem('notes')) {
        const notes = JSON.parse(localStorage.getItem('notes'));
        for (const element of notes) {
            const newNote = document.createElement('p');
            newNote.textContent = element;
            notesDiv.appendChild(newNote)
        }
    }
    else {
        notesDiv.textContent = 'Empty'
    }
});



btnClear.addEventListener('click', function (e) {
    notesDiv.innerHTML = '';
    localStorage.removeItem('notes')
});



/*
Создать интерактивную веб-страницу, где пользователи могут выбирать различные элементы мебели
(например, столы, стулья, диваны) и их параметры (материал, цвет, стиль). Выбранные параметры должны
быть сохранены так, чтобы при повторном посещении сайта пользователь мог видеть свой ранее собранный
комплект мебели.
1. Пользователи могут выбирать из различных типов мебели (например, столы, стулья, диваны).
2. Для каждого типа мебели доступен выбор параметров (цвет, материал, стиль).
3. Предусмотреть кнопку "Сохранить комплект", при нажатии на которую текущий выбор пользователя
сохраняется в localStorage.
4. При повторном посещении сайта автоматически загружать сохраненные параметры из localStorage и
отображать ранее созданный комплект.
5. Предусмотреть возможность для пользователя очистить сохраненные настройки через специальную
кнопку.
6. После нажатия на кнопку "Сохранить" на странице должен отображаться выбранный комплект.
7. При нажатии на кнопку "Очистить" должно появляться сообщение о том, что выбор не сделан и
предыдущие настройки удалены.
*/
// localStorage.removeItem('furnitureSet');


const selectTable = document.getElementById('table');
const selectChair = document.getElementById('chair');
const selectSofa = document.getElementById('sofa');
const resultDiv = document.getElementById('result');

const btnSaveResult = document.getElementById('save');
const btnClearResult = document.getElementById('clear');

const LOC_STOR_KEY = 'furnitureSet';


function DisplayResults() {
    resultDiv.innerHTML = '';
    if (localStorage.getItem(LOC_STOR_KEY)) {

        let furnitureSet = JSON.parse(localStorage.getItem(LOC_STOR_KEY));

        resultDiv.insertAdjacentHTML('beforeend', ` 
        <h3>Вы выбрали</h3>
        <p>Стол, материал - ${furnitureSet[0]}</p>
        <p>Стул, материал - ${furnitureSet[1]}</p>
        <p>Диван, в стиле - ${furnitureSet[2]}</p>`) // костыль, не масштабируется.
    }
    else {
        resultDiv.insertAdjacentHTML('beforeend', `<p>Комплект не выбран</p>`)
    }

}


btnSaveResult.addEventListener('click', () => {
    resultDiv.innerHTML = '';
    let furnitureSet = [];
    try {
        furnitureSet.push(selectTable.value, selectChair.value, selectSofa.value);
        localStorage.setItem(LOC_STOR_KEY, JSON.stringify(furnitureSet));
        DisplayResults();

    } catch (error) {
        console.log(error);
    }
});

btnClearResult.addEventListener('click', () => {
    localStorage.removeItem(LOC_STOR_KEY);
    DisplayResults();

});



window.addEventListener('load', () => {
    DisplayResults();

});



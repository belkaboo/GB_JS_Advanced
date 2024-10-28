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


/*
Давайте создадим класс для управления банковским счетом. В этом классе будет приватное
свойство для хранения текущего баланса, а также методы для внесения и снятия денег со счета.
1. Класс должен содержать приватное свойство #balance, которое инициализируется
значением 0 и представляет собой текущий баланс счета.
2. Реализуйте геттер balance, который позволит получить информацию о текущем балансе.
3. Реализуйте метод deposit(amount), который позволит вносить средства на счет.
Убедитесь, что сумма внесения не отрицательная; в противном случае выбрасывайте
ошибку.
4. Реализуйте метод withdraw(amount), который позволит снимать средства со счета.
Убедитесь, что сумма для снятия неотрицательная и что на счете достаточно средств; в
противном случае выбрасывайте ошибку.
5. Реализуйте конструктор, который принимает начальный баланс в качестве аргумента.
Убедитесь, что начальный баланс не отрицательный; в противном случае выбрасывайте
ошибку.
*/

class BankAccount {

    #balance;

    get balance() {
        return this.#balance
    }

    deposit(amount) {
        if (amount < 0) {
            throw new Error('negative amount');

        }
        return this.#balance += amount;
    }

    withdraw(amount) {
        if (amount > this.balance || amount < 0) {
            throw new Error('Incorrect')
        }
        else {
            return this.#balance -= amount;
        }

    }

    constructor(amount = 0) {
        if (amount < 0) {
            throw new Error('negative balance value');
        }
        return this.#balance = amount;
    }

}


let account = new BankAccount(500);
console.log(account.balance);

account.deposit(200);
console.log(account.balance);

account.withdraw(100);
console.log(account.balance);


/*
У вас есть базовый список пользователей. Некоторые из них имеют информацию о своем премиум-аккаунте, а
некоторые – нет.
Ваша задача – создать структуру классов для этих пользователей и функцию для получения информации о
наличии премиум-аккаунта, используя Опциональную цепочку вызовов методов, оператор нулевого слияния
и instanceof.
1. Создайте базовый класс User с базовой информацией (например, имя и фамилия).
2. Создайте классы PremiumUser и RegularUser, которые наследуются от User. Класс
PremiumUser должен иметь свойство premiumAccount (допустим, дата истечения срока
действия), а у RegularUser такого свойства нет.
3. Создайте функцию getAccountInfo(user), которая принимает объект класса User и
возвращает информацию о наличии и сроке действия премиум-аккаунта, используя
Опциональную цепочку вызовов методов и оператор нулевого слияния.
4. В функции getAccountInfo используйте instanceof для проверки типа переданного
пользователя и дайте соответствующий ответ.
*/


class User {
    firstName;
    lastName;
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}


class PremiumUser extends User {
    premiumAccount;

    SetPremiumAccount(years) {
        this.premiumAccount = new Date().setFullYear(new Date().getFullYear() + years);

    }
}

class RegularUser extends User {

}

function getAccountInfo(user) {
    console.log(user instanceof PremiumUser ? `${user.firstName + ' ' + user.lastName} - Premium user`
        : `${user.firstName + ' ' + user.lastName} - Regular user`);

    const exDate = new Date(user?.premiumAccount).getFullYear() ?? 'prem not found';

    console.log(!isNaN(exDate) ? `Expired - ${exDate}` : 'premium not found');
}


const regUser = new RegularUser('Ivan', 'Ivanov');
const premUser = new PremiumUser('Ivan', 'Super');
premUser.SetPremiumAccount(1);


getAccountInfo(regUser);
getAccountInfo(premUser);


/*
Вы создаете интерфейс, где пользователь вводит число.
Ваша задача — проверить, является ли введенное значение числом или нет, и дать
соответствующий ответ.
1. Создайте HTML-структуру: текстовое поле для ввода числа и кнопку
"Проверить".
2. Добавьте место (например, div) для вывода сообщения пользователю.
3. Напишите функцию, которая будет вызвана при нажатии на кнопку. Эта функция
должна использовать try и catch для проверки вводимого значения
*/


//мой вариант 
const btnEL = document.querySelector('.btn');
const checkedEl = document.querySelector('.checked');
const inputEl = document.querySelector('.check');


function checkNumber(string) {
    try {
        if (Number(string) && string !== '') {
            checkedEl.insertAdjacentHTML('beforeend', `<p> Это число</p>`)
        }
        else if (string === '') throw new Error("Пусто")
        else throw new Error("Не число")

    } catch (error) {
        checkedEl.insertAdjacentHTML('beforeend', `<p class="error"> ${error}</p>`);
    }

    //чтоб не копилось
    setTimeout(() => {
        checkedEl.removeChild(checkedEl.children[0]);
    }, 3000);

}

document.querySelector('.btn').addEventListener('click', () => {
    checkNumber(inputEl.value)
});


/*
Пользователи вашего сайта могут добавлять элементы в список. Но есть условие:
введенное значение должно содержать от 3 до 10 символов.
1. Создайте HTML-структуру с текстовым полем, кнопкой и списком.
2. Напишите функцию, которая будет добавлять элементы в список или
генерировать исключение, если длина введенного значения не соответствует
требованиям.
*/

const textArea = document.querySelector('.input');
const sendButton = document.querySelector('.send__comment');
const ulEls = document.querySelector('.list');


function addToList(text) {

    try {
        if (text.length < 3 || text.length > 10) {
            throw new Error('Текст должен содержать от 3 до 10 символов');
        }
        else {
            ulEls.insertAdjacentHTML('beforeend', `<li> ${text}</li>`)
        }

    } catch (error) {
        if (!ulEls.querySelector('.error')) {
            ulEls.insertAdjacentHTML('afterbegin', `<p class='error'> ${error.message}</p>`)
            setTimeout(() => {
                ulEls.removeChild(ulEls.children[0]);
            }, 2000);
        }
    }
}

sendButton.addEventListener('click', () => {
    addToList(textArea.value);
});










/*
Задание 1
• Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.
• Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:
{
title: "Название альбома",
artist: "Исполнитель",
year: "Год выпуска"
}
• Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
• Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)
*/

const musicCollection = {
    albums: [
        {
            title: "Название альбома 1",
            artist: "Исполнитель 1",
            year: 2001
        },
        {
            title: "Название альбома 2",
            artist: "Исполнитель 2",
            year: 2002
        },
        {
            title: "Название альбома 3",
            artist: "Исполнитель 3",
            year: 2003
        },
        {
            title: "Название альбома 4",
            artist: "Исполнитель 4",
            year: 2003
        },
    ],

    [Symbol.iterator]: function () {
        let current = 0;
        const albums = this.albums
        return {
            next() {
                if (current < albums.length) {
                    return { done: false, value: albums[current++] }
                }
                else {
                    return { done: true }
                }
            }

        };
    }
};


for (let element of musicCollection) {
    console.log(`${element.title} - ${element.artist} (${element.year})`);
}



/*
Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. 
Клиенты приходят и делают заказы на разные блюда.

Необходимо создать систему управления этими заказами, которая позволит:
• Отслеживать, какой повар готовит какое блюдо.
• Записывать, какие блюда заказал каждый клиент.

Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. 
В качестве ключей для клиентов используйте объекты.
Повара и их специализации:

Виктор - специализация: Пицца.
Ольга - специализация: Суши.
Дмитрий - специализация: Десерты.

Блюда и их повара:

Пицца "Маргарита" - повар: Виктор.
Пицца "Пепперони" - повар: Виктор.
Суши "Филадельфия" - повар: Ольга.
Суши "Калифорния" - повар: Ольга.
Тирамису - повар: Дмитрий.
Чизкейк - повар: Дмитрий.

Заказы:

Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
Клиент Ирина заказала: Чизкейк.
*/

const chiefs = new Map();

chiefs.set('Виктор', 'специализация: Пицца')
    .set('Ольга', 'специализация: Суши')
    .set('Дмитрий', 'специализация: Десерты');

const dishes = new Map();

dishes.set('Пицца "Маргарита"', 'Виктор')
    .set('Пицца "Пепперони"', 'Виктор')
    .set('Суши "Филадельфия"', 'Ольга')
    .set('Суши "Калифорния"', 'Ольга')
    .set('Тирамису', 'Дмитрий')
    .set('Чизкейк', 'Дмитрий');



const clientsOrders = [];


function addClientsOrders(clientName, ...dishes) {
    const client = clientsOrders.find(client => client.name === clientName);
    if (client) {
        client.orders.push([...dishes]);
    }
    else {
        clientsOrders.push({ name: clientName, orders: [...dishes] });
    }
}


function displayClients(orderQueue) {
    console.log(`Всего клиентов: ${orderQueue.length}`);
    for (let index = 0; index < orderQueue.length; index++) {
        console.log(`Клиент ${index + 1} - ${orderQueue[index].name}`);
    }

}


function displayOrders(orderQueue) {
    orderQueue.forEach(client => {
        console.log(`Клиент ${client.name} заказал: `);

        client.orders.forEach(dish => {
            console.log(`${dish} (Готовит: ${dishes.get(dish)})`);
        });

        console.log('---------');
    });
}


addClientsOrders('Алексей', 'Пицца "Пепперони"', 'Тирамису');
addClientsOrders('Мария', 'Суши "Калифорния"', 'Пицца "Маргарита"');
addClientsOrders('Ирина', 'Чизкейк');


displayClients(clientsOrders); // вывод клиентов

displayOrders(clientsOrders); // вывод клиентских заказов с поворами



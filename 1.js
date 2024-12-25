const data = [
    {id: 0},
    {id: 1},
    {id: 2}
]

const addElement = (id) => {
    const find = data.findIndex(item => item.id === id);
    console.log(find);
    /** `Копия добавляемого элемента` */
    const newElement = JSON.parse(JSON.stringify(data[find]));
    /** `Массив всех id` */
    const arrId = data.map(item => Number(item.id));
    /** `Максимальный id` */
    const maxId = Math.max(...arrId);
    // Установка id добавляемого элемента
    newElement.id = String(maxId + 1);
    // Добавляем новый элемент в конец списка.
    const newData = [...data.slice(0, find + 1), newElement, ...data.slice(find + 1)];

    console.log(newData);
}

addElement(2)
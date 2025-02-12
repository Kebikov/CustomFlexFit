const ifValueArray = <T>(item: T, value: ['id', ...(keyof T)[]]) => {
    const newObj: Partial<T> = {};
    for(const key of value) {
        newObj[key] = item[key];
    }
    return newObj;
}

const ifValueString = <T>(item: T, value: keyof T) => {
    const newObj: Partial<T> = {};
    newObj[value] = item[value];
    return newObj;
}

const sortArray = <T>(item: T[], value: keyof T | (keyof T)[]) => {
    return item.map(obj => {
        if(Array.isArray(value)) {
            return ifValueArray(obj, value);
        } else {
            return ifValueString(obj, value);
        }
    });
}

const sortObject = <T>(item: T, value: keyof T | (keyof T)[]) => {
    if(Array.isArray(value)) {
        return ifValueArray(item, value); 
    } else {
        return ifValueString(item, value);
    }
}


 /** `Выбор свойств из обьекта или массива обьектов.` */
export const pickObject = <T extends {id: number}>(item: T | T[], value: ['id', ...(keyof T)[]] ) => {

    if(Array.isArray(item)) {
        //* Если передан массив для сортировки.
        return sortArray(item, value);
    } else {
        //* Если передан обьект для сортировки.
        return sortObject(item, value);
    }

}


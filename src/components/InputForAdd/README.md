# InputForAdd

>Inpit универсальный.

## Props

`setState` set useState для установки состояния.

`title` заголовок для Input.

`placeholder` for input

`maxLength` Максимальная длинна вводимого текста.

`value` Значение поля ввода.

>optional

`keyboardType` ? Тип используемой клавиатуры для ввода. default: 'default'

`keyForState` ? Ключ значение которого меняем в обьекте.

`marginTop` ? Отступ с верху.

`isNullValue` ? Значение которое примет поле, если значение не передано и равно пустой строке.

`onEnterOk` ? Функция обработки нажатия на клавиатуре OK.


```typescript
export interface INameAndNote {
    name: string;
    note: string;
}

const [nameAndNote, setNameAndNote] = useState<INameAndNote>({
    name: '',
    note: ''
});

<InputForAdd<INameAndNote>
    keyForState='name'
    title={'тут заголовок'}
    placeholder={'введите данные'}
    maxLength={27}
    value={nameAndNote.name}
    setState={setNameAndNote}
    isNullValue={'нет данных'}
/>
```
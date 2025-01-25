[Пример для листа без Scroll](#пример-для-листа-без-scroll)

[Пример листа со Scroll](#пример-листа-со-scroll)

---

### Пример для листа без Scroll

```typescript
import DragFlatList from '@/components/DragFlatList/DragFlatList';
import HelpText from '@/components/HelpText/HelpText';

const [data, setData] = useState();

const render = (item) => {
    return()
};

 /** `Высота одного элемента в DragFlatList.` */
const elementHeight = 69;

<DragFlatList
    style={{padding: 0, marginTop: 20, flex: 1}}
    styleFlatList={{marginBottom: 40}}
    scrollEnabled={false}
    bottomComponentFlatList={<HelpText text={'Текст с описанием.'}/>}
    heightElement={69}
    data={data}
    setData={setData}
    renderItem={render}
/>
```

### Пример листа со Scroll

```typescript

import DragFlatList from '@/components/DragFlatList/DragFlatList';
import HelpText from '@/components/HelpText/HelpText';

const [data, setData] = useState();

const render = (item) => {
    return()
};

 /** `Высота одного элемента в DragFlatList.` */
const elementHeight = 69;

<DragFlatList
    style={{padding: 0, marginTop: 20, flex: 1}}
    styleFlatList={{flex: 1, overflow: 'hidden'}}
    contentContainerStyle={{height: data.length * 69}}

    bottomComponentFlatList={<HelpText text={'Текст с описанием.'} />}

    heightElement={69}
    data={data}
    setData={setData}

    renderItem={render}
/>
```
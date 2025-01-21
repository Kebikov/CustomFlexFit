```typescript
import DragFlatList from '@/components/DragFlatList/DragFlatList';
import HelpText from '@/components/HelpText/HelpText';

const render = (item) => {
    return()
};

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
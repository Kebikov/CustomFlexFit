[Добавить поратал](#добавить-поратал) 

[Использование компонента Clock](#использование-компонента-clock) 

## Добавить поратал

`Добавить портал в корневой элемент приложения.`

```typescript
// _layout.tsx
import { PortalProvider, PortalHost } from '@gorhom/portal';

interface IMainLayout {
    children?: JSX.Element | JSX.Element[] | undefined;
}

export const MainLayout: FC<IMainLayout> = ({children}) => {

	return (
        <GestureHandlerRootView style={{flex: 1}} >
            <PortalProvider>
                <Provider store={store} >
                    <PortalHost name='clock' />
                    <Spinner/>
                    <>
                        {children}
                    </>
                </Provider>
            </PortalProvider>
        </GestureHandlerRootView>
	);
}
```

## Использование компонента Clock

```typescript
import {Clock, TStateDataClock } from '@/components/Clock';

/** @param idShowClock Уникальный id для элемента на странице, устанавливаем нужный id элемента для отображения компонента часов. */
const [idShowClock, setIdShowClock] = useState<string>('');

/** @param electedTime Выбранное время */
const [selectedData, setSelectedData] = useState<TStateDataClock>({
    'id_1': {
        'one': 12,
        'two': 23
    },
    'id_2': {
        'one': 12,
        'two': 23
    }
});

<Clock
    id={'id_1'}
    idShowClock={idShowClock}
    setIdShowClock={setIdShowClock}
    
    selectedData={selectedData}
    setSelectedData={setSelectedData}
    // Установка для массива чисел, установка максимального отображаемого числа и шага.
    typeClock={{one: {total: 20, step: 2}, two: {total: 30, step: 2}}}
/>

<Clock
    id={'id_2'}
    idShowClock={idShowClock}
    setIdShowClock={setIdShowClock}
    
    selectedData={selectedData}
    setSelectedData={setSelectedData}
    // Установка для массива чисел, установка максимального отображаемого числа и шага.
    typeClock={{one: {total: 20, step: 2}, two: {total: 30, step: 2}}}
/>
```
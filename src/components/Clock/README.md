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

```typescript Принимаемый type
// ===Принимаемый type===

export interface IClock {
    //* State для контроля открытия закрытия модального окна.
    /** `Уникальный id для элемента на странице.` */
    id: string;
    /** `State > id Clock который надо показать.` */
    idShowClock: string;
    /** `SetStateAction > id Clock который надо показать.` */
    setIdShowClock: React.Dispatch<React.SetStateAction>;

    //* State для установки выбранного значения.
    /** `State > Обьект с выбранным временем.` */
    selectedData:  TStateDataClock;
    /** `SetStateAction > Установка выбранного времени.` */
    setSelectedData: React.Dispatch<React.SetStateAction< TStateDataClock >>;

    //* Настройка для отображения данных.
    /** `? Предустановки для отображения чисел [default: 'hours/minutes']` */
    typeClock?: TTypeClock | IArraysForClock;

    //* Style 
    /** `? Цвет фона часов. [default: COLOR_ROOT.BACKGROUND]` */
    colorBody?: string;
    /** `? Цвет фона нажней кнопки. [default: COLOR_ROOT.BACKGROUND]` */
    colorButton?:string;
    /** `? Цвет текста. [default: 'white']` */
    colorText?: string;
    /** `? Цвет линии между часами и кнопкой. [default: 'rgba(255, 255, 255, 0.3)']` */
    colorLine?: string;
    /** `? Использовать ли портал, полезно для работы в модальных окнах. [default: true]` */
    isUsePortal?: boolean;
    /** `? Тип отображения, как часы(2 цыфры) или одна цыфра.` */
    typeOfDisplay?: 'one number' | 'clock';
}
```
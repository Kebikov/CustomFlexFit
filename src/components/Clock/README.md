### 1-Добавить поратал

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

### 2-Использование компонента Clock

```typescript
import Clock, { ITimeClock, IClockRef } from '@/components/Clock/Clock';

export interface ITimeClock {
    hour: string;
    minute: string;
}

/**
 * @param electedTime Выбранное время.
 */
const [selectedTime, setSelectedTime] = useState<ITimeClock>({one: 14, two: 15});

const refClock = useRef<IClockRef>(null);

const press = () => {
    refClock.current?.openClock();
}

<Clock 
    setSelectedTime={setSelectedTime} 
    selectedTime={selectedTime} 
    ref={refClock} 
/>
```
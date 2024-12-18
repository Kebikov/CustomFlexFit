Нет, значение currentPositionsDv не будет автоматически обновляться при изменении data в вашем примере, 
поскольку useDerivedValue из библиотеки react-native-reanimated не отслеживает состояния из React (useState), такие как data.

Причина

useDerivedValue работает в контексте react-native-reanimated и обновляется только при изменении реактивных значений (SharedValue) 
или любых других объектов, управляемых анимационной библиотекой. Поскольку data — это состояние из React (useState), изменения в нем не вызовут перерасчет внутри useDerivedValue.

Как это исправить?

Если вы хотите, чтобы currentPositionsDv обновлялся при изменении data, необходимо передать изменяемую длину data 
(или другие свойства) в SharedValue и использовать её внутри useDerivedValue. Например:

const dataLength = useSharedValue(data.length);

useEffect(() => {
    dataLength.value = data.length; // Обновляем shared value при изменении data
}, [data]);

const currentPositionsDv = useDerivedValue(() => {
    return getInitialPositions(dataLength.value, heightElement); // Используем dataLength.value
});

Альтернатива: использовать useEffect

Если анимационные зависимости вам не нужны, проще использовать useEffect:

const [currentPositions, setCurrentPositions] = useState(
    getInitialPositions(data.length, heightElement)
);

useEffect(() => {
    setCurrentPositions(getInitialPositions(data.length, heightElement));
}, [data, heightElement]); // Обновляем при изменении data или heightElement

Итог
 • useDerivedValue нужен для работы с SharedValue и реактивной логикой.
 • Для простых зависимостей между состояниями React лучше использовать useEffect.


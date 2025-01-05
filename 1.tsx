import Clock, {TStateDataClock} from '../../components/Clock';


const Example: FC = () => {

     /** @param idShowClock Уникальный id для элемента на странице */
    const [idShowClock, setIdShowClock] = useState<string>('');

     /** @param electedTime Выбранное время */
    const [selectedData, setSelectedData] = useState<TStateDataClock>({
        // Начальные установки для часов с уникальным id часав.
        'id_1': {
            'one': 12,
            'two': 20
        }
    });


    return (
        <Clock
            id={'id_1'}
            idShowClock={idShowClock}
            setIdShowClock={setIdShowClock}
            
            selectedData={selectedData}
            setSelectedData={setSelectedData}

            typeClock={{one: {total: 20, step: 2}, two: {total: 30, step: 2}}}
        />
    );
};


export default Example;










--------------------------------------------------------------


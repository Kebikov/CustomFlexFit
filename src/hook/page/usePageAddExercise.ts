import { IExerciseState } from '@/redux/slice/sets.slice';
import { useAppSelector } from '@/redux/store/hooks';
import { useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';


const usePageAddExercise = () => {
    const exerciseStateArray: IExerciseState[] = useAppSelector(state => state.setsSlice.exercise_state);

    const [data, setData] = useState<IExerciseState[]>(exerciseStateArray);

    const activeButtonIdSv = useSharedValue<number | undefined>(undefined);

    const background = useAppSelector(state => state.setupSlice.background);
    
    useEffect(() => {
        setData(exerciseStateArray);
    }, [exerciseStateArray]);
    
    
    return {
        /** `[State] Данные для FlatList.` */
        data,
        /** `[SetStateAction] Данные для FlatList.` */
        setData,
         /** `[SharedValue] Id который активен в данный момент, остальные закрываются.` */
        activeButtonIdSv, 
         /** `[Redux State] Выбранный фон для упражнения.` */
        background
    }
}


export default usePageAddExercise;
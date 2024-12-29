import { IExerciseState } from '@/redux/slice/sets.slice';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import React, { FC, useEffect, useState, useMemo } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';


const usePageAddExercise = () => {
    const exerciseStateArray: IExerciseState[] = useAppSelector(state => state.setsSlice.exerciseStateArray);

    /** Данные для FlatList. */
    const [data, setData] = useState<IExerciseState[]>(exerciseStateArray);

    /** Id который активен в данный момент, остальные закрываются. */
    const activeButtonIdSv = useSharedValue<string>('');

    const selectedBackground = useAppSelector(state => state.setupSlice.selectedBackground);
    
    useEffect(() => {
        setData(exerciseStateArray);
    }, [exerciseStateArray]);
    
    
    return {
        data,
        setData,
        activeButtonIdSv, 
        selectedBackground
    }
}


export default usePageAddExercise;
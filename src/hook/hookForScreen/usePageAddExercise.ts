import { IExerciseState } from '@/redux/slice/sets.slice';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import React, { FC, useEffect, useState, useMemo } from 'react';


const usePageAddExercise = () => {
    const exerciseStateArray: IExerciseState[] = useAppSelector(state => state.setsSlice.exerciseStateArray);

    /** Данные для FlatList. */
    const [data, setData] = useState<IExerciseState[]>([]);

    /** Id который активен в данный момент, остальные закрываются. */
    const [activeButtonId, setActiveButtonId] = useState<string>('');

    const selectedBackground = useAppSelector(state => state.setupSlice.selectedBackground);
    
    useEffect(() => {
        setData(exerciseStateArray);
        return () => {
        }
    }, [exerciseStateArray]);
    
    
    return {
        data,
        setData,
        activeButtonId, 
        setActiveButtonId,
        selectedBackground
    }
}


export default usePageAddExercise;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DayDTO } from '@/SQLite/Day/DTO/DayDTO';
import { RootState } from '../store/store';
import type { ExerciseDTO } from '@/SQLite/Exercise/DTO/ExerciseDTO';
import type { ITimeClock } from '@/components/Clock/Clock';
import i18next from 'i18next';


/**
 * @param id ID упражнения.
 * @param name Название упражнения. 
 * @param note Заметка для упражнения.
 * @param reps Количество повторений в упражнении.
 * @param runtime Длительность выполнения упражнения, минут и секунд.
 * @param restAfter Время отдыха после упражнения, минут и секунд.
 */
export interface IExerciseState {
    id: string;
    name: string;
    note: string;
    reps: ITimeClock;
    runtime: ITimeClock;
    restAfter: ITimeClock;
}


/**
 * @param exerciseState Сотсояние упражнения.
 */
interface IInitialStateSets {
    exerciseStateArray: IExerciseState[];
}


/**
 * `Начальное состояние упражнения при добавлении нового.`
 */
const exerciseStateInitial = (): IExerciseState[] => [{
    id: 'startId',
    name: i18next.t('[exercise]:addExercise.title'),
    note: i18next.t('[exercise]:addExercise.description'),
    reps: {one: 10, two: 0},
    runtime: {one: 0, two: 0},
    restAfter: {one: 2, two: 30}
}];


//* initialState 
const initialStateSets: IInitialStateSets = {
    exerciseStateArray: exerciseStateInitial()
}


//* setsSlice 
const setsSlice = createSlice({
    name: 'sets',
    initialState: initialStateSets,
    reducers: {
        /**
         * `//--Установка состояния при создании нового упражнения.`
         */
        SET_EXERCISE_STATE: (state, action: PayloadAction<IExerciseState[] | IExerciseState | 'RESET'>) => {
            console.info('work > SET_EXERCISE_STATE');
            if(action.payload === 'RESET') {
                // Сброс состояния в ночальное, используется при изминении языка.
                state.exerciseStateArray = exerciseStateInitial();
            } else if(Array.isArray(action.payload)){
                // Полная замена всего состояния, если передан массив.
                state.exerciseStateArray = action.payload;
            } else {
                // Изминение состояния отдельного обьекта, передаем обьект который надо поменять.
                console.log('action.payload. >>> ', JSON.stringify(action.payload, null, 2));
                const id = action.payload.id;
                let findIndex = state.exerciseStateArray.findIndex(item => item.id === id);
                state.exerciseStateArray[findIndex] = action.payload;
            }
        },
    }
});


export default setsSlice.reducer;


export const {
    SET_EXERCISE_STATE
} = setsSlice.actions;

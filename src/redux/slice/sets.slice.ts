import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DayDTO } from '@/SQL/Day/DTO/DayDTO';
import type { ExerciseDTO } from '@/SQL/Exercise/DTO/ExerciseDTO';
import type { TStateDataClock } from '@/components/Clock';
import i18next from 'i18next';



export interface IExerciseState {
     /** `ID упражнения.` */
    id: number;
    order: number;
     /** `Название упражнения.` */
    title: string;
     /** `Заметка для упражнения.` */
    description: string;
     /** `Количество повторений в упражнении.` */
    reps: TStateDataClock[keyof TStateDataClock];
     /** `Длительность выполнения упражнения, минут и секунд.` */
    runtime: TStateDataClock[keyof TStateDataClock];
     /** `Время отдыха после упражнения, минут и секунд.` */
    restAfter: TStateDataClock[keyof TStateDataClock];
}


interface IInitialStateSets {
     /** `Состояние упражнения.` */
    exercise_state: IExerciseState[];
}


/**
 * `Начальное состояние упражнения при добавлении нового.`
 */
const exerciseStateInitial = (): IExerciseState[] => [
    {
        id: 1,
        order: 1,
        title: i18next.t('[exercise]:addExercise.title'),
        description: i18next.t('[exercise]:addExercise.description'),
        reps: {one: 10, two: 0},
        runtime: {one: 0, two: 0},
        restAfter: {one: 2, two: 30}
    }
];


// const exerciseStateInitial = (): IExerciseState[] => Array.from({length: 7}, (_,index) => (
//     {
//         id: index,
//         name: i18next.t('[exercise]:addExercise.title'),
//         description: i18next.t('[exercise]:addExercise.description'),
//         reps: {one: 10, two: 0},
//         runtime: {one: 0, two: 0},
//         restAfter: {one: 2, two: 30}
//     }
// ));



//* initialState 
const initialStateSets: IInitialStateSets = {
    exercise_state: exerciseStateInitial()
}


//* setsSlice 
const setsSlice = createSlice({
    name: 'sets',
    initialState: initialStateSets,
    reducers: {
         /** `//= [Redux Action] Установка состояния при создании нового упражнения.` */
        SET_EXERCISE_STATE: (state, action: PayloadAction<IExerciseState[] | IExerciseState | 'RESET'>) => {

            if(action.payload === 'RESET') {
                // Сброс состояния в ночальное, используется при изминении языка.
                state.exercise_state = exerciseStateInitial();
            } else if(Array.isArray(action.payload)){
                // Полная замена всего состояния, если передан массив.
                state.exercise_state = action.payload;
            } else {
                // Изминение состояния отдельного обьекта, передаем обьект который надо поменять.
                const id = action.payload.id;
                let findIndex = state.exercise_state.findIndex(item => item.id === id);
                state.exercise_state[findIndex] = action.payload;
            }
        },
    }
});


export default setsSlice.reducer;


export const {
     /** `[Redux Action] Установка состояния при создании нового упражнения.` */
    SET_EXERCISE_STATE
} = setsSlice.actions;

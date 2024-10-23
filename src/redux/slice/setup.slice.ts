import { createSlice } from '@reduxjs/toolkit'


interface IinitialDay {
    selectedBackgroundDay: number | undefined;
    selectedBackgroundExercise: number | undefined;
}

/**
 * @param selectedBackgroundDay Выбраное изображение для фона дня.
 */
//* initialState 
const initialState: IinitialDay = {
    selectedBackgroundDay: undefined,
    selectedBackgroundExercise: undefined
}


//* setsSlice 
const setupSlice = createSlice({
    name: 'SETUP',
    initialState,
    reducers: {

        SET_BACKGROUND_FOR_DAY: (state, action) => {
            state.selectedBackgroundDay = action.payload;
        },
        SET_BACKGROUND_FOR_EXERCISE: (state, action) => {
            state.selectedBackgroundExercise = action.payload;
        }

    }
});


export default setupSlice.reducer;

export const {
    SET_BACKGROUND_FOR_DAY,
    SET_BACKGROUND_FOR_EXERCISE
} = setupSlice.actions;

import { createSlice } from '@reduxjs/toolkit'


interface IinitialDay {
    selectedBackground: number | undefined;
}

/**
 * @param selectedBackground Выбраное изображение для фона дня.
 */
//* initialState 
const initialState: IinitialDay = {
    selectedBackground: undefined
}


//* setsSlice 
const setupSlice = createSlice({
    name: 'SETUP',
    initialState,
    reducers: {

        SET_BACKGROUND_FOR_DAY: (state, action) => {
            state.selectedBackground = action.payload;
        }

    }
});


export default setupSlice.reducer;

export const {
    SET_BACKGROUND_FOR_DAY
} = setupSlice.actions;

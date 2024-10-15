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
    name: 'setup',
    initialState,
    reducers: {

        setSelectedBackground: (state, action) => {
            state.selectedBackground = action.payload;
        }

    }
});


export default setupSlice.reducer;

export const {
    setSelectedBackground
} = setupSlice.actions;

import { createSlice } from '@reduxjs/toolkit'


interface IinitialDay {
    selectedBackgroundDay?: string;
    selectedBackgroundExercise?: number | string;
    selectedImgForEquipment?: number | string;
}

/**
 * @param selectedBackgroundDay Выбраное изображение для фона дня.
 */
//* initialState 
const initialState: IinitialDay = {
    selectedBackgroundDay: undefined,
    selectedBackgroundExercise: undefined,
    selectedImgForEquipment: undefined
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
        },
        SET_IMG_FOR_EQUIPMENT: (state, action) => {
            state.selectedImgForEquipment = action.payload;
        }

    }
});


export default setupSlice.reducer;

export const {
    SET_BACKGROUND_FOR_DAY,
    SET_BACKGROUND_FOR_EXERCISE,
    SET_IMG_FOR_EQUIPMENT
} = setupSlice.actions;

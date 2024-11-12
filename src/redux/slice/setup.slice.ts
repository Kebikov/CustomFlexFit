import { createSlice, PayloadAction } from '@reduxjs/toolkit'


/**
 * @param path Путь к изображению.
 * @param type Тип изображения ".jpg | .png"
 */
export interface IImageObj {
    path?: string;
    extension?: string;
}

interface IinitialDay {
    selectedBackground?: IImageObj;
    selectedBackgroundExercise?: number | string;
    selectedImgForEquipment?: number | string;
}

/**
 * @param selectedBackgroundDay Выбраное изображение для фона дня.
 */
//* initialState 
const initialState: IinitialDay = {
    selectedBackground: undefined,
    selectedBackgroundExercise: undefined,
    selectedImgForEquipment: undefined
}


//* setsSlice 
const setupSlice = createSlice({
    name: 'SETUP',
    initialState,
    reducers: {

        SET_BACKGROUND: (state, action: PayloadAction<IImageObj | undefined>) => {
            state.selectedBackground = action.payload;
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
    SET_BACKGROUND,
    SET_BACKGROUND_FOR_EXERCISE,
    SET_IMG_FOR_EQUIPMENT
} = setupSlice.actions;

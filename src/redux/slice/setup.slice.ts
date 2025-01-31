import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IinitialDay {
     /** `Путь к папке с изображениями в памяти телефона.` */
    pathToImageFolder?: string;
     /** `Выбранное изображение для дальнейшего использования.` */
    background?: string | number;
}


//= initialState 
const initialState: IinitialDay = {
    background: undefined,
    pathToImageFolder: undefined
}


//= setsSlice 
const setupSlice = createSlice({
    name: 'SETUP',
    initialState,
    reducers: {
        SET_PATH_TO_IMAGE_FOLDER: (state, action: PayloadAction<string>) => {
            state.pathToImageFolder = action.payload;
        }, 
        SET_BACKGROUND: (state, action: PayloadAction<number | string | undefined>) => {
            state.background = action.payload;
        }
    }
});


export default setupSlice.reducer;


export const {
    SET_BACKGROUND,
    SET_PATH_TO_IMAGE_FOLDER
} = setupSlice.actions;

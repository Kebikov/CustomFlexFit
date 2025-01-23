import { createSlice, PayloadAction } from '@reduxjs/toolkit';


/**
 * @param path Путь к изображению.
 * @param type Тип изображения ".jpg | .png"
 */
export interface IImageObj {
    path?: string;
    extension?: string;
}

/**
 * @param pathToImageFolder Путь к папке с изображениями в памяти телефона.
 * @param selectedBackground Выбранное изображение для дальнейшего использования.
 */
interface IinitialDay {
    pathToImageFolder?: string;
    selectedBackground?: IImageObj;
    selectedBackgroundExercise?: number | string;
    selectedImgForEquipment?: number | string;
}


//= initialState 
const initialState: IinitialDay = {
    selectedBackground: undefined,
    selectedBackgroundExercise: undefined,
    selectedImgForEquipment: undefined
}


//= setsSlice 
const setupSlice = createSlice({
    name: 'SETUP',
    initialState,
    reducers: {
        SET_PATH_TO_IMAGE_FOLDER: (state, action: PayloadAction<string>) => {
            state.pathToImageFolder = action.payload;
        }, 
        SET_BACKGROUND: (state, action: PayloadAction<IImageObj | undefined>) => {
            state.selectedBackground = action.payload;
            //logApp.info(`PATH_TO_IMAGE_FOLDER: ${action.payload?.path}`, 'REDUX');
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
     /** `setupSlice.selectedImgForEquipment` */
    SET_IMG_FOR_EQUIPMENT,
    SET_PATH_TO_IMAGE_FOLDER
} = setupSlice.actions;

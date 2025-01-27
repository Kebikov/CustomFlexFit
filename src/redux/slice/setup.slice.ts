import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 /** `[Type Guards] for IImageObj` */
function isIImageObj(data: unknown): data is IImageObj {
    if(data && typeof data === 'object' && 'path' in data && data.path) {
        return true;
    } else {
        return false;
    }
}

/**
 * @param path Путь к изображению.
 * @param type Тип изображения ".jpg | .png"
 */
export interface IImageObj {
    path?: string;
    extension?: string;
}

type TSomeBackground = IImageObj | number | string | undefined;

/**
 * @param pathToImageFolder Путь к папке с изображениями в памяти телефона.
 * @param selectedBackground Выбранное изображение для дальнейшего использования.
 */
interface IinitialDay {
    pathToImageFolder?: string;
    background?: string | number;
    selectedBackgroundExercise?: number | string;
    img_for_equipment?: number | string;
}


//= initialState 
const initialState: IinitialDay = {
    background: undefined,
    selectedBackgroundExercise: undefined,
    img_for_equipment: undefined
}


//= setsSlice 
const setupSlice = createSlice({
    name: 'SETUP',
    initialState,
    reducers: {
        SET_PATH_TO_IMAGE_FOLDER: (state, action: PayloadAction<string>) => {
            state.pathToImageFolder = action.payload;
        }, 
        SET_BACKGROUND: (state, action: PayloadAction<TSomeBackground>) => {

            // is "type IImageObj"
            if(isIImageObj(action.payload)) {
                if(action.payload.path) state.background = action.payload.path;
                return;
            }  
            
            state.background = action.payload;
        },
        SET_BACKGROUND_FOR_EXERCISE: (state, action) => {
            console.log(action.payload);
            state.selectedBackgroundExercise = action.payload;
        },
        SET_IMG_FOR_EQUIPMENT: (state, action) => {
            state.img_for_equipment = action.payload;
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

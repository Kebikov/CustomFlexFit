import { StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { useAppDispatch } from '@/redux/store/hooks';
import { Shadow } from 'react-native-shadow-2';
import type { IExportImage } from '@/source/img/day';
import { SET_BACKGROUND } from '@/redux/slice/setup.slice';
import ImageService from '@/SQL/Database/service/ImageService';
import useHookImageCheck from '@/hook/useHookImageCheck';


export interface IItemForChoiceBackground {
     /** `Изображение фона` */
    img: string;
     /** `[SetStateAction] > для установки выбранного изображения.` */
    setSelectImg: React.Dispatch<React.SetStateAction<string | undefined>>;
     /** `Изображение фона которое было выбрано.` */
    selectImg: string | undefined;
     /** `Высота изображения в списке.` */
    height: number;
}


/** @components `//= Изображение для фона.` */
const ItemForChoiceBackground: FC<IItemForChoiceBackground> = ({
    img,
    setSelectImg,
    selectImg,
    height
}) => {

    const DISPATCH = useAppDispatch();
    const {imgCheck} = useHookImageCheck();

    const stylesSelect = {borderWidth: 2, borderColor: COLOR_ROOT.LIME_70};


    return(
        <Shadow style={[styles.shadowContainer, {height}]} distance={7} startColor='rgba(255, 255, 255, .2)' >
            <Pressable 
                style={[styles.img_boxImgBackground, selectImg && selectImg === img ? stylesSelect : null]} 
                onPress={async () => {
                    try {
                        setSelectImg(img);
                        DISPATCH(SET_BACKGROUND(img));
                    } catch (error) { console.error(error) }
                }}
            >
                <Image source={imgCheck(img)} style={styles.img_ImgBackground} />
            </Pressable>
        </Shadow>
    )
}


const styles = StyleSheet.create({
    shadowContainer: {
        width: '100%'
    },
    img_boxImgBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOR_ROOT.BACKGROUND,
    },
    img_ImgBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});


export default ItemForChoiceBackground;
import { StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { useAppDispatch } from '@/redux/store/hooks';
import { Shadow } from 'react-native-shadow-2';
import { ActionCreatorWithPayload as ACP}  from '@reduxjs/toolkit';


interface IItemForChoiceBackground {
    img: number;
    setSelectImg: React.Dispatch<React.SetStateAction<number | undefined>>;
    selectImg: number | undefined;
    height: number;
    SET_ACTIONS: ACP<any, "SETUP/SET_BACKGROUND_FOR_DAY"> | ACP<any, "SETUP/SET_BACKGROUND_FOR_EXERCISE">;
}


/**
 * @components `Изображение для фона.`
 * @param img Изображение фона.
 * @param selectImg Изображение фона которое было выбрано.
 * @param setSelectImg SetStateAction для установки выбранного изображения.
 * @param height Высота изображения в списке.
 * @param SET_ACTIONS Action Redux для установки состояния.
 */
const ItemForChoiceBackground: FC<IItemForChoiceBackground> = ({
    img,
    setSelectImg,
    selectImg,
    height,
    SET_ACTIONS
}) => {

    const dispatch = useAppDispatch();
    const stylesSelect = {borderWidth: 2, borderColor: COLOR_ROOT.LIME_70};


    return(
        <Shadow style={[styles.shadowContainer, {height}]} distance={7} startColor='rgba(255, 255, 255, .2)' >
            <Pressable 
                style={[styles.img_boxImgBackground, selectImg === img ? stylesSelect : null]} 
                onPress={() => {
                    setSelectImg(img);
                    dispatch(SET_ACTIONS(img));
                }}
            >
                <Image source={img} style={styles.img_ImgBackground} />
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
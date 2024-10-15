import { StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { useAppDispatch } from '@/redux/store/hooks';
import { setSelectedBackground } from '@/redux/slice/setup.slice';
import { Shadow } from 'react-native-shadow-2';


interface IItemForChoiceBackgroundDay {
    img: number;
    setSelectImg: React.Dispatch<React.SetStateAction<number | undefined>>;
    selectImg: number | undefined;
}


/**
 * @components `Изображение для фона.`
 * @param selectImg Выбранное изображение из списка.
 * @param setSelectImg SetStateAction для установки выбранного изображения.
 */
const ItemForChoiceBackgroundDay: FC<IItemForChoiceBackgroundDay> = ({
    img,
    setSelectImg,
    selectImg
}) => {

    const dispatch = useAppDispatch();
    const stylesSelect = {borderWidth: 2, borderColor: COLOR_ROOT.LIME_70};

    return(
        <Shadow style={styles.shadowContainer} distance={7} startColor='rgba(255, 255, 255, .2)' >
            <Pressable 
                style={[styles.img_boxImgBackground, selectImg === img ? stylesSelect : null]} 
                onPress={() => {
                    setSelectImg(img);
                    dispatch(setSelectedBackground(img));
                }}
            >
                <Image source={img} style={styles.img_ImgBackground} />
            </Pressable>
        </Shadow>
    )
}


const styles = StyleSheet.create({
    shadowContainer: {
        width: '100%',
        height: 132
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


export default ItemForChoiceBackgroundDay;
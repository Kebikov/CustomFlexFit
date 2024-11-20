import { StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { useAppDispatch } from '@/redux/store/hooks';
import { Shadow } from 'react-native-shadow-2';
import type { IExportImage } from '@/source/img/day';
import { SET_BACKGROUND } from '@/redux/slice/setup.slice';
import ImageService from '@/SQL/Database/service/ImageService';


export interface IItemForChoiceBackground {
    imgObj: IExportImage;
    setSelectImg: React.Dispatch<React.SetStateAction<string | number | undefined>>;
    selectImg: string | number | undefined;
    height: number;
}


/**
 * @components `Изображение для фона.`
 * @param imgObj  Обьект изображение фона.
 * @param selectImg Изображение фона которое было выбрано.
 * @param setSelectImg SetStateAction для установки выбранного изображения.
 * @param height Высота изображения в списке.
 */
const ItemForChoiceBackground: FC<IItemForChoiceBackground> = ({
    imgObj,
    setSelectImg,
    selectImg,
    height
}) => {

    const dispatch = useAppDispatch();

    const stylesSelect = {borderWidth: 2, borderColor: COLOR_ROOT.LIME_70};


    return(
        <Shadow style={[styles.shadowContainer, {height}]} distance={7} startColor='rgba(255, 255, 255, .2)' >
            <Pressable 
                style={[styles.img_boxImgBackground, selectImg && selectImg === imgObj.source ? stylesSelect : null]} 
                onPress={async () => {
                    try {
                        console.log('PRESS !');
                        const fullNameImage = imgObj.source + '.' + imgObj.extension;
                        const path = await ImageService.getPathToImage(fullNameImage); 
                        setSelectImg(imgObj.source);
                        dispatch(SET_BACKGROUND({path: path, extension: imgObj.extension}));
                        console.log('END !');
                    } catch (error) { console.error(error) }
                }}
            >
                <Image source={imgObj.source} style={styles.img_ImgBackground} />
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
import { View, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { FlatList } from 'react-native-gesture-handler';
import { imgEquipment } from '@/source/img/weight';
import WrapperImageBackground from '@/components/WrapperImageBackground/WrapperImageBackground';
import HeaderGoBack from '@/components/HeaderGoBack/HeaderGoBack';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { useAppDispatch } from '@/redux/store/hooks';
import { SET_IMG_FOR_EQUIPMENT } from '@/redux/slice/setup.slice';
import { useHookRouter } from '@/router/useHookRouter';
import showMessage from '@/helpers/showMessage';
import useAppTranslation from '@/localization/helpers/useAppTranslation';


/** `//= Выбор изображения из готовых изображений для инвентаря.` */
const SelectImgEquipment: FC = () => {

    const DISPATCH = useAppDispatch();
    const {router} = useHookRouter();
    const {t} = useAppTranslation(['alert_and_toast']);

    const [selectedImg, setSelectedImg] = useState<number | undefined>();

    const gapFlatList = 14;

    const ImageEquipment = (item: number) => (
        <Pressable 
            style={[styles.box_img, {flex: 1, aspectRatio: 1, borderColor: COLOR_ROOT.YELLOW, borderWidth: selectedImg && selectedImg === item ? 4 : 0}]} 
            onPress={() => setSelectedImg(item)}
        >
            <Image source={item} style={[styles.img]}/>
        </Pressable>
    );

    return (
        <WrapperImageBackground
            linearGradient={{colors: [COLOR_ROOT.LIME_DARK, COLOR_ROOT.BACKGROUND, COLOR_ROOT.BACKGROUND], start: {x: .5, y: .1}}}
            isScrollEnabled={false}
        >
            <HeaderGoBack/>
            <View style={styles.container} >
                <View style={styles.contaiber_body} >
                    <Title text='Выберите изображение инвентаря' marginTop={20} />
                    <FlatList
                        contentContainerStyle={{gap: gapFlatList, flexGrow: 1, justifyContent: 'center', padding: 10}}
                        columnWrapperStyle={{gap: gapFlatList}}
                        data={imgEquipment}
                        renderItem={({item}) => ImageEquipment(item)}
                        extraData={selectedImg}

                        numColumns={2}
                    />
                    <ButtonGreen 
                        text='выбрать'
                        handlePess={() => {
                            if(!selectedImg) return showMessage(t('alert_and_toast:imgNotSelect'))
                            DISPATCH(SET_IMG_FOR_EQUIPMENT(selectedImg));
                            router.back();
                        }}
                        fontSize={16}
                    />
                </View>
            </View>
        </WrapperImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    contaiber_body: {
        flex: 1
    },
    box_img: {
        backgroundColor: 'white',
        borderRadius: 14,
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: 14
    },
    shadow_style: {

    }
});


export default SelectImgEquipment;

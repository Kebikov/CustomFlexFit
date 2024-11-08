import { View, Text, StyleSheet, Image, LayoutChangeEvent, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { FlatList } from 'react-native-gesture-handler';
import { imgEquipment } from '@/source/img/weight';


interface ImodalChoiceImgForEquipment {
}


/**
 * @modal `Модальное окно для выбора изображения из готовых изображений.`
 */
const ModalChoiceImgForEquipment: FC = () => {

    const [currentWidthBox, setCurrentWidthBox] = useState<number>(0);
    const [selectedImg, setSelectedImg] = useState<number | undefined>();


    const gapFlatList = 10;

    const onLayoutContainer = (e: LayoutChangeEvent) => {
        const widthFlatList = e.nativeEvent.layout.width;
        const widthBox = (widthFlatList  - gapFlatList) / 2;
        setCurrentWidthBox(widthBox);
    }

    const ImageEquipment = (item: number) => (
        <Pressable 
            style={[styles.box_img, {width: currentWidthBox, height: currentWidthBox, transform: [{scale: selectedImg && selectedImg === item ? 1 : .85}]}]} 
            onPress={() => setSelectedImg(item)}
        >
            <Image source={item} style={styles.img}/>
        </Pressable>
    );

    return (
        <View style={styles.container} >
            <View style={styles.contaiber_body} >
                <FlatList
                    onLayout={onLayoutContainer}
                    contentContainerStyle={{gap: gapFlatList, flexGrow: 1, justifyContent: 'center'}}
                    columnWrapperStyle={{gap: gapFlatList}}
                    data={imgEquipment}
                    renderItem={({item}) => ImageEquipment(item)}
                    extraData={selectedImg}
                    horizontal={false}
                    numColumns={2}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_ROOT.BACKGROUND,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    contaiber_body: {
        flex: 1
    },
    box_img: {
        
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: 14
    }
});


export default ModalChoiceImgForEquipment;

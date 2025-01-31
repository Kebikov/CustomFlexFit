import { View, Text, StyleSheet, Image, Platform, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import type { TKeyItem } from '../itemsForAddSet/Weight/Weight';


interface IItemAddWeight {
    keyItem: TKeyItem;
    value: number;
    icon: number;
    text: string;
    buttonActiveWeight: TKeyItem;
    setButtonActiveWeight: React.Dispatch<React.SetStateAction<TKeyItem>>;

    padding?: number;
    setIsShowInputOver?: React.Dispatch<React.SetStateAction<boolean>>;
}


/**
 * @component `Элемент меню для добавления веса.`
 * @param value Установленое значение веса.
 * @param icon Иконка для элемента.
 * @param keyItem Ключ для блока.
 * @param text Текст для элемента.
 * @param setButtonActiveWeight set useState => установка активного блока.
 * @optional
 * @param padding ? Отступ для регулировки размера иконок.
 * @param setIsShowInputOver set useState => установки видимости окна для ввода веса.
 */
const ItemAddWeight: FC<IItemAddWeight> = ({
    keyItem,
    icon,
    padding,
    text,
    buttonActiveWeight,
    setButtonActiveWeight,
    value,
    setIsShowInputOver
}) => {

    return (
        <Pressable
            onPress={() => {
                setButtonActiveWeight(keyItem);
                if(setIsShowInputOver) setIsShowInputOver(true);
            }} 
            style={[
                styles.container, 
                {
                    opacity: buttonActiveWeight === 'active both' ?
                    1
                    :
                    buttonActiveWeight === keyItem ?
                    1
                    : 
                    0.5
                }
            ]} 
        >
            <View style={[styles.img_box, {padding}]}>
                <Image source={icon} style={styles.img} />
            </View>
            <Text style={styles.title}>{text}</Text>
            <Text style={styles.text_weight}>{`${value} kg.`}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '48%',
        height: '100%',
        backgroundColor: COLOR_ROOT.GREY_CUSTOM(.25),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    img_box: {
        width: 40,
        height: 40
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        tintColor: COLOR_ROOT.LIME_70
    },
    title: {
        marginTop: 5,
        color: COLOR_ROOT.WHITE_CUSTOM(.7),
        textTransform: 'uppercase',
        fontSize: Platform.OS === 'ios' ? 12 : 10,
        fontWeight: '700',
        textAlign: 'center'
    },
    text_weight: {
        marginTop: 5,
        color: COLOR_ROOT.LIME_CUSTOM(.5),
        textTransform: 'uppercase',
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        fontWeight: '700',
        textAlign: 'center'
    }

});

export default ItemAddWeight;
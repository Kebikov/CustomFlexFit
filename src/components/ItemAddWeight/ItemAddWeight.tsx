import { View, Text, StyleSheet, Image, Platform, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';


interface IItemAddWeight {
    isLeftRight: 'left' | 'right';
    icon: number;
    text: string;
    setButtonActiveWeight: React.Dispatch<React.SetStateAction<"left" | "right" | undefined>>;
    padding?: number;
    opacity?: number;
}

const weight = 48;


/**
 * @component `Элемент меню для добавления веса.`
 * @param icon Иконка для элемента.
 * @param isLeftRight Левый или правыый это блок.
 * @param text Текст для элемента.
 * @param setButtonActiveWeight Установка активного блока.
 * @optional
 * @param padding ? Отступ для регулировки размера иконок.
 * @param opacity ? Прозрачность элемента, у активного равна 1 у не активного меньше.
 */
const ItemAddWeight: FC<IItemAddWeight> = ({
    isLeftRight,
    icon,
    padding,
    text,
    opacity,
    setButtonActiveWeight
}) => {

    return (
        <Pressable
            onPress={() => setButtonActiveWeight(isLeftRight)} 
            style={[
                styles.container, 
                {
                    marginLeft: isLeftRight === 'right' ? `${(50 - weight) / 2}%` : undefined,
                    marginRight: isLeftRight === 'left' ? `${(50 - weight) / 2}%` : undefined,
                    opacity
                }
            ]} 
        >
            <View style={[styles.img_box, {padding}]}>
                <Image source={icon} style={styles.img} />
            </View>
            <Text style={styles.title}>{text}</Text>
            <Text style={styles.text_weight}>45 kg.</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: `${weight}%`,
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
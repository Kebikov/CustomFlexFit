import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import ICON from '@/source/icon';
import HelpText from '@/components/HelpText/HelpText';


interface IItemRepsRest {
    icon: number;
    name: string;
    values: string;
    helpText: string;
    marginTop?: number;
    handlePress: () => void;
}


/**
 * @component `Пункт для установки: повторов / времени отдыха / времени выполнения упражнения.`
 * @param icon Иконка для пункта меню.
 * @param name Имя пункта меню.
 * @param values Установленое значение.
 * @param helpText Текст пояснения устанавлеваемых значений.
 * @param handlePress Функция сработающяя при нажатии на иконку плюса.
 * @optional
 * @param marginTop ? Отступ с верху.
 */
const ItemRepsRest: FC<IItemRepsRest> = ({
    icon,
    name,
    values,
    helpText,
    marginTop,
    handlePress
}) => {

    return (
        <>
            <View style={[styles.item, {marginTop}]} >
                <View style={styles.body_item} >
                    <View style={styles.body_img} >
                        <View style={styles.box_img} >
                            <Image source={icon} style={styles.img} />
                        </View>
                    </View>
                    <View style={styles.box_text} >
                        <Text style={styles.text} >{name}</Text>
                    </View>
                    <View style={styles.box_values} >
                        <Text style={styles.values_text} >{values}</Text>
                    </View>
                    <Pressable 
                        style={styles.body_button} 
                        onPress={() => handlePress()}
                    >   
                        <View style={styles.box_button} >
                            <Image source={ICON.PLUS} style={styles.button_img} />
                        </View>
                    </Pressable>
                </View>
            </View>
            <HelpText text={helpText} marginTop={5} />
        </>
    );
};


const heightItem = 50;


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        width: '100%',
        height: heightItem
    },
    body_item: {
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    body_img: {
        width: heightItem,
        height: heightItem,
        padding: 2
    },
    box_img: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOR_ROOT.LIME_CUSTOM(.35),
        padding: 8,
        borderRadius: 14
    },
    box_text: {
        flex: 1,
        height: '100%',
        //backgroundColor: 'blue',
        justifyContent: 'center',
        paddingLeft: 15
    },
    box_values: {
        width: 80,
        height: '100%',
        //backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center'
    },
    body_button: {
        width: heightItem,
        height: heightItem,
        padding: 7
    },
    box_button: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOR_ROOT.GREY_CUSTOM(.5),
        borderRadius: 10,
        padding: 7
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        tintColor: COLOR_ROOT.LIME
    },
    text: {
        color: 'white',
        fontWeight: '500'
    },
    values_text: {
        color: COLOR_ROOT.WHITE_CUSTOM(.6),
        fontSize: 13
    },
    button_img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    }
});


export default ItemRepsRest;
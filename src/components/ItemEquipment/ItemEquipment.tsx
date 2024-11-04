import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC, useState } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import Switcher from '../Switcher/Switcher';
import { interpolate, Extrapolation } from 'react-native-reanimated';


interface IItemEquipment {
    onPressing: (id: number) => void;
    isActive:  (id: number) => boolean;
    img: number;
    title: string;
    weight: number;

    marginTop?: number;
}


/**
 * @component `Элемент со снарядом.`
 */
const ItemEquipment: FC<IItemEquipment> = ({
    img,
    weight,
    title,
    onPressing,
    isActive,
    marginTop = 10
}) => {

    return (
        <View style={[styles.container, {marginTop}]} >
            <View style={styles.contaiber_body} >
                <View 
                    style={[styles.box_img, 
                        {
                            padding: title.split(' ')[0].toLocaleLowerCase() === 'диск' ? 
                            interpolate(weight, [1, 5, 10, 20], [16, 8, 3, 0], Extrapolation.CLAMP)
                            : 
                            0
                        }
                    ]} >
                    <Image style={styles.img} source={img} />
                </View>
                <View style={styles.box_text} >
                    <Text style={styles.title} >{title}</Text>
                    <Text style={styles.text_weight} >{`Вес: ${weight} кг.`}</Text>
                </View>
                <View style={styles.box_switcher}>
                    <Switcher
                        id={1}
                        onPressing={onPressing}
                        isEnabled={isActive(1)}
                    />
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 8,
        backgroundColor: COLOR_ROOT.FON_GREY,
        borderRadius: 18
    },
    contaiber_body: {
        width: '100%',
        flexDirection: 'row'
    },
    box_img: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        borderRadius: 12
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 12
    },
    box_text: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        textTransform: 'uppercase',
        color: COLOR_ROOT.LIME_70,
        fontSize: 13,
        fontWeight: '500'
    },
    text_weight: {
        color: 'white',
        fontSize: 13
    },
    box_switcher: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default ItemEquipment;
import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC, useState } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import Switcher from '../Switcher/Switcher';
import { interpolate, Extrapolation } from 'react-native-reanimated';
import imgCheck from '@/helpers/imgCheck';
import { EquipmentDTO } from '@/SQLite/Equipment/DTO/EquipmentDTO';
import useAppTranslation from '@/localization/helpers/useAppTranslation';
import ButtonSwipeable from '../ButtonSwipeable/ButtonSwipeable';
import ICON from '@/source/icon';


interface IItemEquipment {
    item: EquipmentDTO;
    onPressing?: (id: number) => void;
    isActive?:  (id: number) => boolean;
    marginTop?: number;
}


/**
 * @component `Элемент со снарядом.`
 * @optional
 * @param item Object EquipmentDTO
 * @param onPressing ? Функция обработки нажатия на блок.
 * @param isActive ? Активный ли переключатель
 * @param marginTop ? Отступ с верху.
 */
const ItemEquipment: FC<IItemEquipment> = ({
    item,
    onPressing,
    isActive,
    marginTop = 10
}) => {

    const {t, t$} = useAppTranslation(['[exercise]']);

    return (
        <View style={[styles.buttonSwipeable, {marginTop}]}>
            <ButtonSwipeable
                totalButton={2}
                onPressButton1={() => {}}
                onPressButton2={() => {}}
                iconForButton2={ICON.DEL_BTN}
                colorButton2={COLOR_ROOT.BUTTON_COLOR_RED}
                borderRadiusButton={12}
                paddingInsideButton={21}
                paddingOutsideButtonHorizontal={4}
                paddingOutsideButtonVertical={8}
            >
                <View style={[styles.container]} >
                    <View style={styles.contaiber_body} >
                        <View 
                            style={[styles.box_img, 
                                {
                                    padding: item.type === 'plate' && item.weight !== 0 ? 
                                    interpolate(item.weight, [1, 5, 10, 20], [16, 8, 3, 0], Extrapolation.CLAMP)
                                    : 
                                    0
                                }
                            ]} >
                            <Image style={styles.img} source={imgCheck(item.img)} />
                        </View>
                        <View style={styles.box_text} >
                            <Text style={styles.title} >
                                {
                                    item.type === 'plate' ?
                                    `${t$(item.title)} ${item.weight}`
                                    :
                                    t$(item.title) === '' ?
                                    'Имя инвенаря'
                                    :
                                    t$(item.title)
                                }
                            </Text>
                            <Text style={styles.text_weight} >
                                {
                                    `Вес: ${String(item.weight) === '' ? 0 : item.weight} ${t('[exercise]:equipment.kilograms')}`
                                }
                            </Text>
                        </View>
                        <View style={styles.box_switcher}>
                            {
                                isActive === undefined ||  onPressing === undefined ?
                                null
                                :
                                <Switcher
                                    id={item.id}
                                    onPressing={onPressing}
                                    isEnabled={isActive(item.id)}
                                />
                            }
                        </View>
                    </View>
                </View>
            </ButtonSwipeable>
        </View>
    );
};


const styles = StyleSheet.create({
    buttonSwipeable: {

    },
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
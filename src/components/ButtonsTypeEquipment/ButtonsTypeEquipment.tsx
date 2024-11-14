import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import ICON from '@/source/icon';
import { COLOR_ROOT } from '@/constants/colors';
import { EquipmentDTO } from '@/SQL/Equipment/DTO/EquipmentDTO';


interface IButtonsTypeEquipment {
    setState: React.Dispatch<React.SetStateAction<EquipmentDTO>>;
}


/**
 * @component `Группа кнопок для выбора типа инвентаря.`
 */
const ButtonsTypeEquipment: FC<IButtonsTypeEquipment> = ({
    setState
}) => {

    const [activeBox, setActiveBox] = useState<'plate' | 'barbell' | undefined>();


    const plate = (
        <Pressable
            onPress={() => {
                setActiveBox('plate');
                setState(state => ({...state, type: 'plate'}));
            }}
            style={[
                styles.equipment, 
                {
                    backgroundColor: 
                        !activeBox ? 
                        COLOR_ROOT.LIME_DARK
                        :
                        activeBox === 'plate' ?
                        COLOR_ROOT.LIME_CUSTOM(.7)
                        :
                        COLOR_ROOT.LIME_DARK
                }
            ]} 
        >
            <View style={styles.box_img} >
                <Image source={ICON.WEIGHT} style={styles.img} />
            </View>
            <Text style={styles.text} >plate</Text>
        </Pressable>
    );

    const barbell = (
        <Pressable 
            onPress={() => {
                setActiveBox('barbell');
                setState(state => ({...state, type: 'barbell'}));
            }}
            style={[
                styles.equipment, 
                {
                    backgroundColor: 
                        !activeBox ?
                        COLOR_ROOT.LIME_DARK
                        :
                        activeBox === 'barbell' ?
                        COLOR_ROOT.LIME_CUSTOM(.7)
                        :
                        COLOR_ROOT.LIME_DARK
                }
            ]} 
        >
            <View style={styles.box_img} >
                <Image source={ICON.PLATE_2} style={styles.img} />
            </View>
            <Text style={styles.text} >barbell</Text>
        </Pressable>
    );

    return (
        <View style={styles.container} >
            <View style={styles.contaiber_body} >
                {plate}
                {barbell}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        marginTop: 20
    },
    contaiber_body: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    equipment: {
        width: '48.5%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 14,

    },
    box_img: {
        width: 30,
        height: 30
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        tintColor: 'white'
    },
    text: {
        fontFamily: 'Sport500',
        fontSize: 13,
        letterSpacing: .7,
        color: 'white',
        marginLeft: 10,
        textTransform: 'uppercase',
    }
});


export default ButtonsTypeEquipment;
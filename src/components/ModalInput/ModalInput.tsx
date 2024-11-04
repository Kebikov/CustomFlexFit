import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { FC } from 'react';
import { BlurView } from 'expo-blur';
import { COLOR_ROOT } from '@/constants/colors';
import InputForAdd from '../InputForAdd/InputForAdd';
import type { IWeightState } from '@/app/exercise/modalAddRepsRest';


interface IModalInput {
    setState: React.Dispatch<React.SetStateAction<number>>;
}


/**
 * @component ``
 */
const ModalInput: FC<IModalInput> = ({
    setState
}) => {

    return (
        <BlurView 
            intensity={18}
            tint='light'
            style={styles.container} 
        >
            <View style={styles.contaiber_body} >
                <InputForAdd<number>
                    setState={setState}
                    title='вес'
                    placeholder='ваш вес'
                    maxLength={5}
                    keyboardType='numeric'
                />
                <Text style={styles.text} >ModalInput</Text>
            </View>
        </BlurView>
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 3,
        width: '100%',
        height: '100%',
        backgroundColor: Platform.OS === 'ios' ? COLOR_ROOT.BACKGROUND_CUSTOM(.3) : COLOR_ROOT.BACKGROUND_CUSTOM(.9)
    },
    contaiber_body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'red'
    }
});


export default ModalInput;
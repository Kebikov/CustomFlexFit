import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import HeaderGoBack from '@/components/HeaderGoBack/HeaderGoBack';
import { COLOR_ROOT } from '@/constants/colors';


interface ImodalAddEquipment {
}


/**
 * @component ``
 */
const ModalAddEquipment: FC = () => {

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <HeaderGoBack/>
            <View style={styles.container} >
                <View style={styles.contaiber_body} >
                    <Text style={{color: '#fff'}}>modalAddEquipment</Text>
                </View>
            </View>
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contaiber_body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default ModalAddEquipment;
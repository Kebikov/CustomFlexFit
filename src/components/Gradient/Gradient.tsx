import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR_ROOT } from '@/constants/colors';


interface IGradient {
    /**
     * Отображаемый текст.
     */
    text: string;
    /**
     * Размер отоброжаемого текста.
     */
    size: number;
}
/**
 * @component
 * Оболочка для создания текста с гредиентом.
 * @returns 
 */
const Gradient: FC<IGradient>= ({text, size}) => {
	return (
        <MaskedView
            style={{ width: '100%', flexDirection: 'row' }}
            maskElement={
                <View style={{ alignItems: 'center' }} >
                    <Text style={{ fontSize: size, fontFamily: 'Sport' }} >{text}</Text>
                </View>
            }
        >
            <LinearGradient
                colors={['cadetblue', COLOR_ROOT.LIME]}
                style={{ width: '100%', height: size }}
            />
        </MaskedView>
	);
};

export default Gradient;

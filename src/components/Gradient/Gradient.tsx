import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import React, { FC } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '../Title/Title';


interface IGradient {
    text: string;
    size: number;
    color?: string;
}


/**
 * @wrapper Оболочка для создания текста с гредиентом.
 * @param size Размер отоброжаемого текста.
 * @param text Отображаемый текст. 
 * @param color ? Цвет текста на Android. `default = "white"`
 */
const Gradient: FC<IGradient> = ({
    text, 
    size,
    color = 'white'
}) => {
	return (
        <>
            {
                Platform.OS === 'ios' ?
                    <MaskedView
                        style={{width: '100%', flexDirection: 'row' }}
                        maskElement={
                            <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: size, fontFamily: 'Sport', backgroundColor: 'transparent' }} >{text}</Text>
                            </View>
                        }
                    >
                        <LinearGradient
                            colors={['cadetblue', COLOR_ROOT.LIME]}
                            style={{ width: '100%', height: size }}
                        />
                    </MaskedView>
                    :
                    <Title text={text} fontSize={size - 13} color={color} />
            }
        </>
	);
};

export default Gradient;



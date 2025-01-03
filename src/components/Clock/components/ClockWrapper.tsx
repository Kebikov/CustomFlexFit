import { View, StyleSheet, Platform } from 'react-native';
import React, { FC } from 'react';
import { type ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';

interface IClockWrapper extends ViewProps {
}


/**
 * @wrapper `Оболочка для компанента часов.`
 */
const ClockWrapper: FC<IClockWrapper>= ({...otherProps}) => {

    return (
        <View style={positionStyle.main_absolute} >
            <BlurView
                style={positionStyle.container_relative} 
                intensity={30}
                tint='dark'
                {...otherProps}
            />
        </View>
    );
};


const positionStyle = StyleSheet.create({
    main_absolute: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%'
    },
    container_relative: {
        position: 'relative',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, .2)' : 'rgba(255, 255, 255, .5)'
    },
});


export default ClockWrapper;
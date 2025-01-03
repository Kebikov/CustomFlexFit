import { View, Text, StyleSheet, ViewProps } from 'react-native';
import React, { FC } from 'react';


interface IBodyClockWrapper extends ViewProps {
    colorBody: string;
    height: number;
}


/**
 * @wrapper `Оболочка тела для часов.`
 */
const BodyClockWrapper: FC<IBodyClockWrapper> = ({
    colorBody,
    height,
    ...otherProps
}) => {

    return (
        <View style={[styles.body, {backgroundColor: colorBody, height}]} >
            <View style={[styles.time]} {...otherProps} />
        </View>
    );
};


const radiusClock = 14;


const styles = StyleSheet.create({
    body: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: radiusClock,
        borderTopRightRadius: radiusClock
    },
    time: {
        position: 'relative',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        overflow: 'hidden'
    }
});


export default BodyClockWrapper;
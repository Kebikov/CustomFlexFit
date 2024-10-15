import { View, Text, StyleSheet, StatusBarStyle, StatusBar, Platform } from 'react-native';
import React, { FC } from 'react';

interface IStatus {
    backgroundColor?: string;
    barStyle?: StatusBarStyle;
}

/**
 * @component `StatusBar`
 */
const AppStatusBar: FC<IStatus> = ({
    backgroundColor = 'transparent',
    barStyle = 'light-content'
}) => {

    return (
        <View style={{backgroundColor, height: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight}} >
            <StatusBar animated={true} barStyle={barStyle} backgroundColor={backgroundColor} />
        </View>
    );
};

const styles = StyleSheet.create({
});

export default AppStatusBar;
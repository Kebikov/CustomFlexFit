import { StatusBar, View, Platform, StatusBarStyle } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/constants/colors';
import { ScrollView } from 'react-native-gesture-handler';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
    isScrollEnabled?: boolean;
    barStyle?: StatusBarStyle;
    backgroundColor?: string;
}


/**
 * @wrapper `Обертка для страниц с :` 
 * - SafeAreaView 
 * - StatusBar
 * - ScrollView 
 * @param scrollEnabled ? Если не нужен ScrollView, передаем false.
 * @param barStyle ? Стиль StatusBar.
 * @param backgroundColor ? Цвет фона StatusBar.
 * @example 
 * <WrapperScroll page={#}>
        {JSX.Element}
    </WrapperScroll>
 */
const WrapperScroll: FC<IWrapper> = ({
    children, 
    isScrollEnabled = true,
    barStyle = 'light-content',
    backgroundColor = COLOR_ROOT.BACKGROUND,
}) => {

    return (
        <>
            <View style={{backgroundColor, height: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight}} >
                <StatusBar animated={true} barStyle={barStyle} backgroundColor={backgroundColor} />
            </View>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor }}>
                    {
                        isScrollEnabled
                        ?
                        <ScrollView 
                            contentContainerStyle={{flexGrow: 1}} 
                            keyboardShouldPersistTaps={'handled'} 
                            showsVerticalScrollIndicator={false}
                        >
                            {children}
                        </ScrollView>
                        :
                        <>
                            {children}
                        </>
                    }
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};


export default WrapperScroll;



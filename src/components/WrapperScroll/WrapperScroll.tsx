import { StatusBar, View, Platform, StatusBarStyle, KeyboardAvoidingView } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COLOR_ROOT } from '@/constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderGoBack from '../HeaderGoBack/HeaderGoBack';


interface IWrapper {
    children: JSX.Element | JSX.Element[];
    isScrollEnabled?: boolean;
    barStyle?: StatusBarStyle;
    backgroundColor?: string;
    isShowGoBack?: {
        isShow: boolean;
        paddingLeft?: number;
    };
}


/**
 * @wrapper `Обертка для страниц.` 
 * @optional 
 * @param scrollEnabled ? Если не нужен ScrollView, передаем false. `default = true`
 * @param barStyle ? Стиль StatusBar. `default = 'light-content'`
 * @param backgroundColor ? Цвет фона StatusBar. `default = 'transparent'`
 * @param isShowGoBack ? Показывать ли header для возврата назад. `default = {isShow: false, paddingLeft: 0}`
 */
const WrapperScroll: FC<IWrapper> = ({
    children, 
    isScrollEnabled = true,
    barStyle = 'light-content',
    backgroundColor = 'transparent',
    isShowGoBack = {isShow: false, paddingLeft: 0}
}) => {

    return (
        <>
            <View style={{backgroundColor, height: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight}} >
                <StatusBar animated={true} barStyle={barStyle} backgroundColor={backgroundColor} />
            </View>
            <SafeAreaProvider>
                {
                    isShowGoBack.isShow ?
                    <HeaderGoBack paddingLeft={isShowGoBack.paddingLeft}/>
                    :
                    null
                }
                
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={
                        Platform.OS === 'ios' ? 47 
                        : 
                        StatusBar.currentHeight !== undefined ? StatusBar.currentHeight 
                        : 
                        undefined
                    }
                >
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
                </KeyboardAvoidingView>
            </SafeAreaProvider>
        </>
    );
};


export default WrapperScroll;



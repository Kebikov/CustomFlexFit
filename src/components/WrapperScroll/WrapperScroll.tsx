import { StatusBar, View, Platform, StatusBarStyle, KeyboardAvoidingView } from 'react-native';
import React, { FC } from 'react';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
    ListHeaderComponent?: JSX.Element | JSX.Element[];
}


/**
 * @wrapper `Обертка для страниц.` 
 * @optional 
 * @param isScrollEnabled ? Если не нужен ScrollView, передаем false. `default = true`
 * @param barStyle ? Стиль StatusBar. `default = 'light-content'`
 * @param backgroundColor ? Цвет фона StatusBar. `default = 'transparent'`
 * @param isShowGoBack ? Показывать ли header для возврата назад. `default = {isShow: false, paddingLeft: 0}`
 * @param ListHeaderComponent ? Элементы для передачи в header, которые будут находится все ScrollView
 */
const WrapperScroll: FC<IWrapper> = ({
    children, 
    isScrollEnabled = true,
    barStyle = 'light-content',
    backgroundColor = 'transparent',
    isShowGoBack = {isShow: false, paddingLeft: 0},
    ListHeaderComponent
}) => {

    const insets = useSafeAreaInsets();

    const headerGoBack = (
        <>
            {
                isShowGoBack.isShow ?
                <HeaderGoBack paddingLeft={isShowGoBack.paddingLeft}/>
                :
                null
            }
        </>
    );

    const listHeaderComponent = (
        <>
            {ListHeaderComponent}
        </>
    );

    return (
        <>
            <View style={{backgroundColor, height: insets.top}} >
                <StatusBar animated={true} barStyle={barStyle} backgroundColor={backgroundColor} />
            </View>
            <SafeAreaProvider>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={
                        insets.top
                    }
                >
                    <SafeAreaView style={{ flex: 1, backgroundColor }}>
                        {headerGoBack}
                        {listHeaderComponent}
                        {/* {
                            isScrollEnabled
                            ? */}
                            <ScrollView 
                                scrollEnabled={isScrollEnabled} // добавил место
                                contentContainerStyle={{flexGrow: 1}} 
                                keyboardShouldPersistTaps={'handled'} 
                                showsVerticalScrollIndicator={false}
                            >
                                {children}
                            </ScrollView>
                            {/* :
                            <>
                                {children}
                            </>
                        } */}
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </SafeAreaProvider>
        </>
    );
};


export default WrapperScroll;



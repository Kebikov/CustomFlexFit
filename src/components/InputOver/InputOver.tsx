import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import React, { FC } from 'react';
import { BlurView } from 'expo-blur';
import { COLOR_ROOT } from '@/constants/colors';
import InputForAdd from '../InputForAdd/InputForAdd';
import { Portal } from '@gorhom/portal';
import { useTranslation } from 'react-i18next';


interface IInputOver<I extends object | number> {
    setState: React.Dispatch<React.SetStateAction<I>>;
    isShowInputOver: boolean; 
    setIsShowInputOver: React.Dispatch<React.SetStateAction<boolean>>;
}


/**
 * @component `Окно установки веса для упражнения.`
 * @param setState set useState Установки веса.
 * @param isShowInputOver Состояние показать/скрыть окно.
 * @param setIsShowInputOver set useState установки видимости окна.
 */
const InputOver = <I extends object | number>({
    setState,
    isShowInputOver,
    setIsShowInputOver
}: IInputOver<I>) => {

    const {t} = useTranslation(['[exercise]']);

    const closeInput = () => {
        setIsShowInputOver(false);
    }

    return (
        <>
            {
                isShowInputOver ?
                <Portal name='InputOver' >
                    <BlurView 
                        intensity={18}
                        tint='light'
                        style={styles.container} 
                    >
                        <View style={styles.contaiber_body} >

                            <View style={styles.input_container} >
                                <InputForAdd<I>
                                    setState={setState}
                                    title={t('[exercise]:addRepsRest.titleWeight')}
                                    placeholder={t('[exercise]:addRepsRest.weightPlaseholder')}
                                    maxLength={5}
                                    keyboardType='numeric'
                                    onEnterOk={closeInput}
                                />
                            </View>

                            <View style={styles.line} />

                            <View style={styles.buttons_container}>
                                <Pressable
                                    onPress={() => {
                                        closeInput();
                                    }}
                                    style={styles.button_set}
                                >
                                    <Text style={styles.text_set} >{t('[exercise]:addRepsRest.set')}</Text>
                                </Pressable>
                            </View>

                        </View>
                    </BlurView>
                </Portal>
                :
                null
            }
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 3,
        width: '100%',
        height: '100%',
        backgroundColor: Platform.OS === 'ios' ? COLOR_ROOT.BACKGROUND_CUSTOM(.3) : COLOR_ROOT.BACKGROUND_CUSTOM(.9),
        justifyContent: 'center',
        alignItems: 'center'
    },
    contaiber_body: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
        overflow: 'hidden',
        backgroundColor: COLOR_ROOT.BACKGROUND_CUSTOM(.8),
        paddingTop: 20,
        borderRadius: 20
    },
    input_container: {
        width: '100%',
        paddingHorizontal: 24,
        paddingBottom: 24
    },
    line: {
        width: '100%',
        height: 2,
        backgroundColor: 'white'
    },
    buttons_container: {
        width: '100%',
        height: 40,
    },
    button_set: {
        flex: 1,
        backgroundColor: COLOR_ROOT.LIME_70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_set: {
        color: 'black',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase'
    }
});


export default InputOver;
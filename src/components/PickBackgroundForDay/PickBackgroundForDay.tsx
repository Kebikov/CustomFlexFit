import { View, Text, StyleSheet, Platform, Pressable, Image, Alert, ToastAndroid } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import useConvertFont from '@/hook/useConvertFont';
import { useTranslation } from 'react-i18next';
import { useHookRouter } from '@/router/useHookRouter';
import ButtonGreen from '../ButtonGreen/ButtonGreen';
import * as ImagePicker from 'expo-image-picker';
import { IdayState } from '@/app/day/addDay';
import { useAppDispatch } from '@/redux/store/hooks';
import { SET_BACKGROUND_FOR_DAY } from '@/redux/slice/setup.slice';
import * as MediaLibrary from 'expo-media-library';


interface IPickBackgroundForDay {
    setDayState: React.Dispatch<React.SetStateAction<IdayState>>
}


/**
 * @component `Выбор изображения для дня тренировок.`
 * @param setDayState SetStateAction для установки выбора изображения.
 */
const PickBackgroundForDay: FC<IPickBackgroundForDay> = ({
    setDayState
}) => {

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const {t} = useTranslation();
    const {appRouter} = useHookRouter();
    const {convertFont} = useConvertFont();
    const dispatch = useAppDispatch();



    const pickImageAsync = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            aspect: [28, 10]
        });
    
        if (!result.canceled)  {
            //@ts-ignore
            setDayState(state => ({...state, img: result.assets[0].uri}));
            //@ts-ignore
            dispatch(SET_BACKGROUND_FOR_DAY(result.assets[0].uri));
        } else {
            Platform.OS === 'ios' 
            ?
            Alert.alert(t('alert_and_toast.imgNotSelect')) 
            : 
            ToastAndroid.show(t('alert_and_toast.imgNotSelect'), ToastAndroid.SHORT);
        }
    };

    return (
        <>
            <View style={styles.addExistingnBackground} >
                <View style={styles.boxText} >
                    <Text style={[styles.text, {fontSize: convertFont(Platform.OS === 'ios' ? 16 : 16)}]} >
                        {t('folder.day.addDay.addExistingnBackground')}
                    </Text>
                </View>
                <Pressable 
                    style={styles.boxPlus} 
                    onPress={() => appRouter.push('/day/modalAddDay')}
                >
                    <Image source={require('@/source/img/icon/plus.png')} style={styles.plusImg} />
                </Pressable>
            </View>

            <ButtonGreen
                marginTop={20}
                text={t('folder.day.addDay.buttonChoiceBackground')}
                handlePess={() => pickImageAsync()}
                fontSize={15}
                backgroundColor={COLOR_ROOT.LIME_70}
            />
        </>

    );
};


const styles = StyleSheet.create({
    addExistingnBackground: {
        marginTop: 20,
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //backgroundColor: 'red'
    },
        boxText: {
            alignItems: 'center',
            flex: 1
        },
            text: {
                color: 'white',
                fontFamily: 'Sport400',
                paddingBottom: 5
            },
        boxPlus: {
                width: 45,
                height: 45,
                backgroundColor: COLOR_ROOT.LIME_70,
                padding: 5,
                borderRadius: 150
        },
            plusImg: {
                tintColor: 'white',
                width: '100%',
                height: '100%'
            }
});


export default PickBackgroundForDay;
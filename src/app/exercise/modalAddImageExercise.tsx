import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC, useState } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { exerciseImage } from '@/source/img/exercise';
import { FlatList } from 'react-native-gesture-handler';
import Description from '@/components/Description/Description';
import { useTranslation } from 'react-i18next';
import ItemForChoiceBackground from '@/components/ItemForChoiceBackground/ItemForChoiceBackground';
import { SET_BACKGROUND_FOR_EXERCISE } from '@/redux/slice/setup.slice';



/**
 * @modal `Модальное окно для выбора фона для занятий.`
 */
const ModalAddImageExercise: FC = () => {
    
    const {t} = useTranslation();
    const [selectImg, setSelectImg] = useState<number | undefined>(undefined);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeAreaView}>
                <Pressable 
                    style={styles.header}
                    onPress={() => router.back()}
                >
                    <View style={styles.imgBox} >
                        <Image source={require('@/source/icon/files/arrow_back.png')} style={styles.img} />
                    </View>
                    <Text style={styles.textHeader} >GO BACK</Text>
                </Pressable>
                
                <View style={{alignItems: 'flex-start', width: '100%', marginTop: 10, paddingHorizontal: 20}} >
                    <Description text={t('folder.day.modalAddDay.description')} />
                </View>
                

                <View style={styles.container} >

                    <FlatList
                        style={{width: '100%', marginTop: 10}}
                        contentContainerStyle={{gap: 10, paddingBottom: 20, paddingHorizontal: 20}}

                        data={exerciseImage}
                        renderItem={({item}) => <ItemForChoiceBackground img={item} selectImg={selectImg} setSelectImg={setSelectImg} height={200} SET_ACTIONS={SET_BACKGROUND_FOR_EXERCISE} />}
                        keyExtractor={item => String(item)}

                        ListEmptyComponent={<View><Text style={{color: 'white'}}>Нет элементов.</Text></View>}
                    />

                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_ROOT.BACKGROUND
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 30,
        marginTop: 10
    },
    imgBox: {
        width: 24,
        height: 24,
        marginLeft: 10
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    textHeader: {
        color: 'white',
        fontFamily: 'Sport',
        fontSize: 20,
        marginLeft: 10
    }
});

export default ModalAddImageExercise;
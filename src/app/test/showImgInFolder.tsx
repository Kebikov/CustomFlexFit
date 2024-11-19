import { View, Text, StyleSheet, Button, Image } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import DatabaseService from '@/SQL/Database/service/DatabaseService';
import DayService from '@/SQL/Day/service/DayService';
import ImageService from '@/SQL/Database/service/ImageService';
import { FlatList } from 'react-native-gesture-handler';
import { DayDTO } from '@/SQL/Day/DTO/DayDTO';
import { useSQLiteContext } from 'expo-sqlite';
import useHookImageCheck from '@/hook/useHookImageCheck';


interface IshowImgInFolder {
}


/**
 * @test `Экран для отображения добавленых изображений в папку приложения.`
 */
const ShowImgInFolder: FC = () => {

    const db = useSQLiteContext();
    const {imgCheck} = useHookImageCheck();

    const [data, setData] = useState<DayDTO[]>([]);

    useEffect(() => {
        (async () => {
            const data = await DayService.find(db);
            setData(data);
        })();
    }, []);


    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
            isShowGoBack={{isShow: true, paddingLeft: 20}}
            isScrollEnabled={false}
        >
            <View style={styles.container} >
                <View style={styles.contaiber_body} >
                    <FlatList
                    contentContainerStyle={{gap: 10}}
                        data={data}
                        renderItem={({item}) => (
                            <View style={styles.box_img} >
                                <Image source={imgCheck(item.img)} style={styles.img} />
                            </View>
                        )}
                        keyExtractor={(_, i) => String(i)}
                    />
                </View>
            </View>
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        paddingHorizontal: 20,
        backgroundColor: COLOR_ROOT.BACKGROUND,
        flex: 1
    },
    contaiber_body: {
        flex: 1,
        justifyContent: 'center'
    },
    box_img: {
        width: '100%',
        height: 160,
        borderWidth: 1,
        borderColor: COLOR_ROOT.LIME_70,
        borderRadius: 10,
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
});


export default ShowImgInFolder;
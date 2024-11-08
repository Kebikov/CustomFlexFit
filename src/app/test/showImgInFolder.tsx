import { View, Text, StyleSheet, Button, Image } from 'react-native';
import React, { FC, useState } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import DatabaseService from '@/SQLite/Database/service/DatabaseService';
import ImageService from '@/SQLite/Database/service/ImageService';
import imgCheck from '@/helpers/imgCheck';
import { FlatList } from 'react-native-gesture-handler';


interface IshowImgInFolder {
}


/**
 * @test `Экран для отображения добавленых изображений в папку приложения.`
 */
const ShowImgInFolder: FC = () => {

    const [data, setData] = useState<string[]>([]);

    const go = async () => {
        const files = await ImageService.find();
        console.log(files);

        if(!files) return;
        setData(files);
    }

    const FileImage = (item: string) => (
        <View style={styles.box_img} >
            <Image source={imgCheck(item)} style={styles.img} />
        </View>
    );

    return (
        <WrapperScroll
            isShowGoBack={{isShow: true, paddingLeft: 20}}
            isScrollEnabled={false}
        >
            <View style={styles.container} >
                <View style={styles.contaiber_body} >
                    <FlatList
                        data={data}
                        renderItem={({item}) => FileImage(item)}
                        keyExtractor={(_, i) => String(i)}
                    />
                    {/* {
                        data.map((item, i) => (
                            <View style={styles.box_img} key={i} >
                                <Image source={imgCheck(item)} style={styles.img} />
                            </View>
                        ))
                    } */}
                </View>
                <View style={{width: '100%', marginBottom: 20}} >
                    <Button title='GO' onPress={() => go()} />
                </View>
            </View>
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_ROOT.BACKGROUND,
        flex: 1
    },
    contaiber_body: {
        flex: 1,
        justifyContent: 'center'
    },
    box_img: {
        width: '100%',
        height: 200,
        borderWidth: 3,
        borderColor: '#fff'
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    }
});


export default ShowImgInFolder;
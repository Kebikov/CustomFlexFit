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
import logApp from '@/helpers/log';
import DragFlatList from '@/components/DragFlatList/DragFlatList';


interface IData {
    id: number | string;
    name: number | string;
}

const DATA = [
    {id: 'id_1', name: 1},
    {id: 'id_2', name: 2},
    {id: 'id_3', name: 3}
];

const Item = ({name} : {name: number | string}) => {
    return(
        <View style={styles.box}>
            <Text style={styles.text} >{name}</Text>
        </View>
    )
}


const ShowImgInFolder: FC = () => {

    const [data, setData] = useState<IData[]>(DATA);
    console.log('DATA = ', data);

    const render = (item: IData) => {
        console.log('render = ', item.id);
        return <Item name={item.name} />
    }
    

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
            //isShowGoBack={{isShow: true, paddingLeft: 20}}
            isScrollEnabled={false}
        >
            <DragFlatList
                style={{background: COLOR_ROOT.ARCTIC}}
                heightElement={54}
                data={data}
                setData={setData}
                renderItem={render}
            />
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 50,
        backgroundColor: 'green',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center'
    }
});


export default ShowImgInFolder;
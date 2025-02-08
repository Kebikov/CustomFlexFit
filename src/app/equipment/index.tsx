import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState, useEffect, useCallback } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import ItemEquipment from '@/components/ItemEquipment/ItemEquipment';
import { EquipmentDTO } from '@/SQL/Equipment/DTO/EquipmentDTO';
import useAppTranslation from '@/localization/helpers/useAppTranslation';
import EquipmentService from '@/SQL/Equipment/service/EquipmentService';
import { useSQLiteContext } from 'expo-sqlite';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { useHookRouter } from '@/router/useHookRouter';
import { useSharedValue } from 'react-native-reanimated';
import {logApp} from '@/helpers/log';
import DragFlatList from '@/components/DragFlatList/DragFlatList';
import { sortByOrder } from '@/helpers/sortByOrder';
import { useFocusEffect } from 'expo-router';

interface IselectEquipment {
}


/** @page `//: Страница выбора оборудования для занятий.` */
const Equipments: FC = () => { logApp.page('Equipments');

    const {t} = useAppTranslation(['[exercise]', '[equipment]']);
    const db = useSQLiteContext();
    const {appRouter} = useHookRouter();

     /** `Id активной кнопки в данный момент.` */
    const activeButtonIdSv = useSharedValue<string>('');

    /** @param dataEquipment `Массив с инвентарем.` */
    const [dataEquipment, setDataEquipment] = useState<EquipmentDTO[]>([]);

    const render = (item: EquipmentDTO) => {
        return(
            <ItemEquipment 
                item={item} 
                activeButtonIdSv={activeButtonIdSv} 
                setDataEquipment={setDataEquipment} 
                marginTop={5}
            />
        )
    };

     /** `Получение данных с BD` */
    const getDataAsync = async () => {
        const result = await EquipmentService.find(db);
        setDataEquipment(sortByOrder(result));
    }

     // Обновление данных при фокусе страницы.
    useFocusEffect(
        useCallback(() => { 
            getDataAsync();
        }, [])
    );

     // Обновление очередности при покидании страницы.
    useEffect(() => {
        return () => {
            if(dataEquipment.length === 0) return;
            (async () => {
                //await EquipmentService.findByIdAndUpdateOrder(db, dataEquipment);
                await EquipmentService.findByIdAndUpdate(db, {id: 1, name: 'sdf'});
            })();
        }
    },[dataEquipment]);

    //* render 
    const Header = () => (
        <>
            <Title text={t('[exercise]:equipment.yourEquipment')} />
            <Text style={styles.text}>{t('[exercise]:equipment.yourEquipmentInfo')}</Text>
        </>
    );

    const Footer = () => (
        <ButtonGreen 
            text={t('[equipment]:common.add')}
            handlePess={() => appRouter.navigate('/equipment/addEquipment')}
            widthFlex={.8}
            fontSize={15}
            backgroundColor={COLOR_ROOT.LIME_70}
            marginTop={20}
            marginBottom={20}
        />
    );

     /** `Высота одного элемента в DragFlatList.` */
    const elementHeight = 82;

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
            isScrollEnabled={false}
        >
            <View style={styles.container} >
                <Header/>
                <DragFlatList
                    style={{padding: 0, marginTop: 20, flex: 1}}
                    styleFlatList={{flex: 1, overflow: 'hidden'}}
                    contentContainerStyle={{height: dataEquipment.length * elementHeight}}
                    scrollEnabled
                    heightElement={elementHeight}
                    data={dataEquipment}
                    setData={setDataEquipment}
                    renderItem={render}
                />
                <Footer/>
            </View>
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        //backgroundColor: 'red'
    },
    contaiber_body: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: 'green'
    },
    text: {
        marginTop: 20,
        color: 'white',
        fontSize: 13
    }
});


export default Equipments;


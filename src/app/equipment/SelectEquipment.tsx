import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
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
import { FlatList } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';


interface IselectEquipment {
}


/** @page `//= Страница выбора оборудования для занятий.` */
const SelectEquipment: FC = () => {

    const {t} = useAppTranslation(['[exercise]', '[equipment]']);
    const db = useSQLiteContext();
    const {appRouter, router} = useHookRouter();

     /** `Id активной кнопки в данный момент.` */
    const activeButtonIdSv = useSharedValue<string>('');

    /** @param dataEquipment `Массив с инвентарем.` */
    const [dataEquipment, setDataEquipment] = useState<EquipmentDTO[]>([]);

    useEffect(() => {
        (async () => {
            const result = await EquipmentService.find(db);
            console.log('res >>> ', result);
            setDataEquipment(result);
        })(); 
    }, []);

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
            isScrollEnabled={false}
        >
            <View style={styles.container} >
                <Title text={t('[exercise]:equipment.yourEquipment')} />
                <Text style={styles.text}>{t('[exercise]:equipment.yourEquipmentInfo')}</Text>
                <View style={styles.contaiber_body} >
                    <FlatList
                        data={dataEquipment}
                        renderItem={({item}) => (
                            <ItemEquipment 
                                item={item} 
                                activeButtonIdSv={activeButtonIdSv} 
                                setDataEquipment={setDataEquipment} 
                                marginTop={5}
                            />
                        )}
                        keyExtractor={item => String(item.id)}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <ButtonGreen 
                    text={t('[equipment]:common.add')}
                    handlePess={() => appRouter.navigate({pathname: '/equipment/addEquipment/[equipment]', params: {id: ''}})}
                    widthFlex={.8}
                    fontSize={15}
                    backgroundColor={COLOR_ROOT.LIME_70}
                    marginTop={20}
                />
            </View>
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    contaiber_body: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        marginTop: 20,
        color: 'white',
        fontSize: 13
    }
});


export default SelectEquipment;
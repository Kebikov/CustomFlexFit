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
import {logPage} from '@/helpers/log/log';


interface IselectEquipment {
}


/**
 * @page `Страница выбора оборудования для занятий.`
 */
const SelectEquipment: FC = () => {
    logPage.page('SelectEquipment');

    const {t, t$} = useAppTranslation(['[exercise]']);
    const db = useSQLiteContext();
    const {appRouter} = useHookRouter();

    /**
     * `Массив с инвентарем.`
     */
    const [dataEquipment, setDataEquipment] = useState<EquipmentDTO[]>([]);
    /**
     * @param activeEquipment Массив id которые выбраны.
     */
    const [activeEquipment, setActiveEquipment] = useState<number[]>([]);
    /**
     * `Обработка нажатия на переключатель элемента.`
     * @param id Id выбранного элемента.
     */
    const onPressing = (id: number) => {
        if(activeEquipment.indexOf(id) === -1) {
            setActiveEquipment(state => ([...state, id]));
        } else {
            const filter = activeEquipment.filter(item => item !== id);
            setActiveEquipment(filter);
        }
    }
    /**
     * `Определение, активный ли элемент.`
     * @param id Id элемента.
     */
    const isActive = (id: number) => activeEquipment.indexOf(id) === -1 ? false : true;

    useEffect(() => {
        (async () => {
            const result = await EquipmentService.find(db);
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
                        renderItem={({item}) => <ItemEquipment item={item} onPressing={onPressing} isActive={isActive} />}
                        keyExtractor={item => String(item.id)}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <ButtonGreen 
                    text='добавить инвентарь'
                    handlePess={() => appRouter.navigate('/exercise/modalAddEquipment')}
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
        fontSize: 14
    }
});


export default SelectEquipment;
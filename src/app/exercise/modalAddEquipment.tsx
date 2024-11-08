import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import HeaderGoBack from '@/components/HeaderGoBack/HeaderGoBack';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import InputForAdd from '@/components/InputForAdd/InputForAdd';
import { EquipmentDTO } from '@/SQLite/Equipment/DTO/EquipmentDTO';
import PickImage from '@/components/PickImage/PickImage';
import { SET_IMG_FOR_EQUIPMENT } from '@/redux/slice/setup.slice';
import ItemEquipment from '@/components/ItemEquipment/ItemEquipment';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import ButtonsTypeEquipment from '@/components/ButtonsTypeEquipment/ButtonsTypeEquipment';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import HelpText from '@/components/HelpText/HelpText';
import useAppTranslation from '@/localization/helpers/useAppTranslation';
import WrapperImageBackground from '@/components/WrapperImageBackground/WrapperImageBackground';
import {logModal, logInfo} from '@/helpers/log/log';


interface ImodalAddEquipment {
}


/**
 * @modal `Модальное окно добавления инвентаря.`
 */
const ModalAddEquipment: FC = () => {
    logModal.page('ModalAddEquipment');

    const DISPATCH = useAppDispatch();
    const {t} = useAppTranslation(['[exercise]']);

    const selectedImgForEquipment = useAppSelector(state => state.setupSlice.selectedImgForEquipment);
    const [equipment, setEquipment] = useState<EquipmentDTO>({
        id: 1,
        title: '',
        img: require('@/source/img/imgForScreen/zeroFon.jpg'),
        type: 'barbell',
        weight: 0
    });

    logInfo.info('equipment', equipment);

    useEffect(() => {
        if(selectedImgForEquipment) setEquipment(state => ({...state, img: String(selectedImgForEquipment)}))
    }, [selectedImgForEquipment]);

    return (
        <WrapperImageBackground
            linearGradient={{colors: [COLOR_ROOT.LIME_DARK, COLOR_ROOT.BACKGROUND, COLOR_ROOT.BACKGROUND], start: {x: .5, y: .1}}}
        >
            <HeaderGoBack/>
            <View style={styles.container} >
                <Title text='Введите данные вашего инвентаря' />
                <View style={styles.contaiber_body} >
                    <ItemEquipment item={equipment} />

                    <InputForAdd<EquipmentDTO>
                        keyForState={'title'}
                        title={'название инвентаря'}
                        placeholder={'введите название инвентаря'}
                        maxLength={25}
                        value={equipment.title}
                        setState={setEquipment}
                        marginTop={20}
                    />
                    <HelpText text='введите название вашего инвентаря' />

                    <InputForAdd<EquipmentDTO>
                        keyForState={'weight'}
                        title={'вес инвентаря'}
                        placeholder={'введите название инвентаря'}
                        maxLength={25}
                        value={String(equipment.weight)}
                        setState={setEquipment}
                        keyboardType='numeric'
                        marginTop={10}
                    />
                    <HelpText text='введите вес инвентаря' />

                    <ButtonsTypeEquipment setState={setEquipment} />
                    <HelpText text='выберите тип инвентаря, это гриф или диск' />

                    <PickImage
                        SET_ACTIONS={SET_IMG_FOR_EQUIPMENT}
                        aspect={[1,1]}
                        modalPath={'/exercise/modalChoiceImgForEquipment'}
                        marginTop={20}
                    />
                    <HelpText text={t('[exercise]:addExercise.infoAddImage')} />

                    <ButtonGreen
                        text='создать'
                        handlePess={() => {}}
                        marginTop={20}
                        fontSize={17}
                    />
                </View>
            </View>
        </WrapperImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        paddingHorizontal: 20
    },
    contaiber_body: {
        flex: 1,
        justifyContent: 'center'
    }
});


export default ModalAddEquipment;
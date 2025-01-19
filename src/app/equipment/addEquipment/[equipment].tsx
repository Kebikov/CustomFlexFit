import { View, StyleSheet, Platform } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import HeaderGoBack from '@/components/HeaderGoBack/HeaderGoBack';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import InputForAdd from '@/components/InputForAdd/InputForAdd';
import { EquipmentDTO } from '@/SQL/Equipment/DTO/EquipmentDTO';
import PickImage from '@/components/PickImage/PickImage';
import ItemEquipment from '@/components/ItemEquipment/ItemEquipment';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import ButtonsTypeEquipment from '@/components/ButtonsTypeEquipment/ButtonsTypeEquipment';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import HelpText from '@/components/HelpText/HelpText';
import useAppTranslation from '@/localization/helpers/useAppTranslation';
import WrapperImageBackground from '@/components/WrapperImageBackground/WrapperImageBackground';
import { useLocalSearchParams } from 'expo-router';


/** `//= Окно добавления инвентаря.` */
const AddEquipment: FC = () => {

    const {id} = useLocalSearchParams<{id: string}>();
    console.log("ID = ", id);

    const DISPATCH = useAppDispatch();
    const {t} = useAppTranslation(['[exercise]', '[equipment]']);

    const selectedImgForEquipment = useAppSelector(state => state.setupSlice.selectedImgForEquipment);
    const [equipment, setEquipment] = useState<EquipmentDTO>({
        id: 1,
        title: '',
        img: require('@/source/img/imgForScreen/zeroFon.jpg'),
        type: 'barbell',
        weight: 0
    });


    useEffect(() => {
        if(selectedImgForEquipment) setEquipment(state => ({...state, img: String(selectedImgForEquipment)}))
    }, [selectedImgForEquipment]);

    return (
        <WrapperImageBackground
            linearGradient={{colors: [COLOR_ROOT.LIME_DARK, COLOR_ROOT.BACKGROUND, COLOR_ROOT.BACKGROUND], start: {x: .5, y: .1}}}
        >
            <HeaderGoBack/>
            <View style={styles.container} >
                <Title text={t('[equipment]:AddEquipment.title')} fontSize={Platform.OS === 'ios' ? 25 : 24} />
                <View style={styles.contaiber_body} >
                    <ItemEquipment item={equipment} />

                    <InputForAdd<EquipmentDTO>
                        keyForState={'title'}
                        title={t('[equipment]:common.name')}
                        placeholder={t('[equipment]:AddEquipment.enterEquipmentName')}
                        maxLength={25}
                        value={equipment.title}
                        setState={setEquipment}
                        marginTop={20}
                    />
                    <HelpText text={t('[equipment]:AddEquipment.helpEnterEquipmentName')} />

                    <InputForAdd<EquipmentDTO>
                        keyForState={'weight'}
                        title={t('[equipment]:AddEquipment.weightEquipment')}
                        placeholder={t('[equipment]:AddEquipment.enterEquipmentWeight')}
                        maxLength={25}
                        value={String(equipment.weight)}
                        setState={setEquipment}
                        keyboardType='numeric'
                        marginTop={10}
                    />
                    <HelpText text={t('[equipment]:AddEquipment.helpEnterEquipmentWeight')} />

                    <ButtonsTypeEquipment setState={setEquipment} />
                    <HelpText text={t('[equipment]:AddEquipment.helpType')} />

                    <PickImage
                        aspect={[1,1]}
                        path={'/equipment/SelectImgEquipment'}
                        marginTop={20}
                    />
                    <HelpText text={t('[exercise]:addExercise.infoAddImage')} />
                </View>
                <ButtonGreen
                    text={t('[equipment]:AddEquipment.add')}
                    handlePess={() => {}}
                    marginTop={20}
                    fontSize={17}
                    marginBottom={40}
                />
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


export default AddEquipment;
import { View, StyleSheet, Platform } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import HeaderGoBack from '@/components/HeaderGoBack/HeaderGoBack';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import InputForAdd from '@/components/InputForAdd/InputForAdd';
import { EquipmentDTO } from '@/SQL/Equipment/DTO/EquipmentDTO';
import PickImage from '@/components/PickImage/PickImage';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import ButtonsTypeEquipment from '@/components/ButtonsTypeEquipment/ButtonsTypeEquipment';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import HelpText from '@/components/HelpText/HelpText';
import useAppTranslation from '@/localization/helpers/useAppTranslation';
import WrapperImageBackground from '@/components/WrapperImageBackground/WrapperImageBackground';
import { SET_BACKGROUND } from '@/redux/slice/setup.slice';
import ZeroItemEquipment from '@/components/ZeroItemEquipment/ZeroItemEquipment';
import { useHookRouter } from '@/router/useHookRouter';
import { checkAddDataEquipment } from '@/utils/pages/addEquipment/checkAddData';


/** `//= Окно добавления инвентаря.` */
const AddEquipment: FC = () => {

    const DISPATCH = useAppDispatch();
    const {t} = useAppTranslation(['[exercise]', '[equipment]']);

    const background = useAppSelector(state => state.setupSlice.background);
    const [equipment, setEquipment] = useState<Partial<EquipmentDTO>>({});
    const {router} = useHookRouter();

    const onAddEquipment = () => {
        if(!checkAddDataEquipment(equipment)) return;
         // Возврат на страницу с инвентарем
        if(router.canGoBack()) router.back(); 
    }

    useEffect(() => {
        if(background) setEquipment(state => ({...state, img: String(background)}))
        
        return () => {
            DISPATCH(SET_BACKGROUND(undefined));
        }
    }, [background]);

    return (
        <WrapperImageBackground
            linearGradient={{colors: [COLOR_ROOT.LIME_DARK, COLOR_ROOT.BACKGROUND, COLOR_ROOT.BACKGROUND], start: {x: .5, y: .1}}}
        >
            <HeaderGoBack/>
            <View style={styles.container} >
                <Title text={t('[equipment]:addEquipment.title')} fontSize={Platform.OS === 'ios' ? 25 : 24} />
                <View style={styles.contaiber_body} >
                    <ZeroItemEquipment item={equipment} />

                    <InputForAdd<Partial<EquipmentDTO>>
                        keyForState={'title'}
                        title={t('[equipment]:common.name')}
                        placeholder={t('[equipment]:addEquipment.enterEquipmentName')}
                        maxLength={25}
                        value={equipment.title ? equipment.title : ''}
                        setState={setEquipment}
                        marginTop={20}
                    />
                    <HelpText text={t('[equipment]:addEquipment.helpEnterEquipmentName')} />

                    <InputForAdd<Partial<EquipmentDTO>>
                        keyForState={'weight'}
                        title={t('[equipment]:addEquipment.weightEquipment')}
                        placeholder={t('[equipment]:addEquipment.enterEquipmentWeight')}
                        maxLength={25}
                        value={equipment.weight ? String(equipment.weight) : ''}
                        setState={setEquipment}
                        keyboardType='numeric'
                        marginTop={10}
                    />
                    <HelpText text={t('[equipment]:addEquipment.helpEnterEquipmentWeight')} />

                    <ButtonsTypeEquipment<Partial<EquipmentDTO>> setState={setEquipment} />
                    <HelpText text={t('[equipment]:addEquipment.helpType')} />

                    <PickImage
                        aspect={[1,1]}
                        path={'/equipment/selectImgEquipment'}
                        marginTop={20}
                    />
                    <HelpText text={t('[exercise]:addExercise.infoAddImage')} />
                </View>
                <ButtonGreen
                    text={t('[equipment]:addEquipment.add')}
                    handlePess={onAddEquipment}
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
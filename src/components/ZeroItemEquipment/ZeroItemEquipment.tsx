import { styles } from '@/components/ItemEquipment/styles'
import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { EquipmentDTO } from '@/SQL/Equipment/DTO/EquipmentDTO';
import useAppTranslation from '@/localization/helpers/useAppTranslation';
import useHookImageCheck from '@/hook/useHookImageCheck';


interface IZeroItemEquipment {
    item: Partial<EquipmentDTO>;
}


/** @component `//= Элемент со снарядом без начальных данных.` */
const ZeroItemEquipment: FC<IZeroItemEquipment> = ({
    item
}) => {

    const {t} = useAppTranslation(['[exercise]', '[equipment]']);
    const {imgCheck} = useHookImageCheck();


    //* render 
    /** `Изображение инвентаря.` 
     */
    const ImageEquipment = () => (
        <View style={[styles.box_img]} >
            <Image 
                style={styles.img} 
                source={
                    item.img ?
                    imgCheck(item.img)
                    :
                    require('@/source/img/imgForScreen/zeroFon.jpg')
                } 
            />
        </View>
    );

    /** `Текст типа инвентаря.` 
     */
    const TypeEquipment = () => (
        <Text style={styles.title} >
            {
                item.title ? 
                item.title
                :
                t('[equipment]:common.name')
            }
        </Text>
    );
    /** `Вес инвентаря.` 
     */
    const WeightEquipment = () => (
        <Text style={styles.text_weight} >
            {item.weight ? `${item.weight} ${t('[exercise]:equipment.kilograms')}`  : t('[equipment]:common.weight')}
        </Text>
    );


    return (
        <View style={[styles.container]} >
            <View style={styles.contaiber_body} >
                <ImageEquipment/>
                <View style={styles.box_text} >
                    <TypeEquipment/>
                    <WeightEquipment/>
                </View>
            </View>
        </View>
    );
};


export default ZeroItemEquipment;
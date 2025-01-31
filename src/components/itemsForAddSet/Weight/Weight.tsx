import { View, StyleSheet } from 'react-native';
import React, { FC, memo, useState } from 'react';
import Title from '@/components/Title/Title';
import { useTranslation } from 'react-i18next';
import ICON from '@/source/icon';
import ItemAddWeight from '@/components/ItemAddWeight/ItemAddWeight';
import HelpText from '@/components/HelpText/HelpText';
import InputOver from '@/components/InputOver/InputOver';
import stylesValue from '@/styles/stylesValue';


interface IWeight {
    selectedWeight: number;
    setSelectedWeight: React.Dispatch<React.SetStateAction<number>>;
}


export type TKeyItem = 'total weight' | 'barbell and plate' | 'active both';


/** @component `//= Компонент для установки используемого веса.` */
const Weight: FC<IWeight> = ({
    selectedWeight,
    setSelectedWeight
}) => {

    const {t} = useTranslation(['[exercise]']);
     /** `isShowInputOver > Показать/скрыть окно ввода веса.` */
    const [isShowInputOver, setIsShowInputOver] = useState<boolean>(false);
     /** `buttonActiveWeight > Какой пункт выбора веса активный.` */
    const [buttonActiveWeight, setButtonActiveWeight] = useState<TKeyItem>('active both');

    let currentWeight: number = 0;

    if(typeof selectedWeight === 'number') {
        currentWeight = selectedWeight;
    }

    return (
        <>
            <Title text={t('[exercise]:addSet.titleWeight')} marginTop={5} fontSize={stylesValue.folder.exercise.addSet.fontSizeTitle} />
            <View style={[styles.weight, {borderRadius: stylesValue.folder.exercise.addSet.borderRadius}]}>
                <View style={styles.weight_body} >
                    <ItemAddWeight 
                        keyItem='total weight'
                        value={currentWeight}
                        text={t('[exercise]:addSet.totalWeight')}
                        icon={ICON.KETTLEBELL} 
                        padding={3}
                        buttonActiveWeight={buttonActiveWeight}
                        setButtonActiveWeight={setButtonActiveWeight}
                        setIsShowInputOver={setIsShowInputOver}
                    />
                    <ItemAddWeight 
                        keyItem='barbell and plate'
                        value={0}
                        text={t('[exercise]:addSet.barbellAndPlateWeight')}
                        icon={ICON.WEIGHT} 
                        buttonActiveWeight={buttonActiveWeight}
                        setButtonActiveWeight={setButtonActiveWeight}
                    />
                </View>
            </View>
            <HelpText text={t('[exercise]:addSet.helpTextWeight')} />
            <InputOver
                isShowInputOver={isShowInputOver}
                setIsShowInputOver={setIsShowInputOver}
                setState={setSelectedWeight}
            />
        </>
    );
};


const styles = StyleSheet.create({
    weight: {
        height: 120,
        marginTop: 10
    },
    weight_body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});


export default memo(Weight);
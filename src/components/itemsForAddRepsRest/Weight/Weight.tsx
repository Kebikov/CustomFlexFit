import { View, StyleSheet } from 'react-native';
import React, { FC, memo, useState } from 'react';
import Title from '@/components/Title/Title';
import { useTranslation } from 'react-i18next';
import ICON from '@/source/icon';
import ItemAddWeight from '@/components/ItemAddWeight/ItemAddWeight';
import HelpText from '@/components/HelpText/HelpText';
import type { IWeightState } from '@/app/exercise/addRepsRest';
import InputOver from '@/components/InputOver/InputOver';
import stylesValue from '@/styles/stylesValue';



interface IWeight {
    value: number | IWeightState;
    setSelectedWeight: React.Dispatch<React.SetStateAction<number | IWeightState>>;
}


export type TKeyItem = 'total weight' | 'barbell and plate' | 'active both';


/**
 * @component `Компонент для установки используемого веса.`
 */
const Weight: FC<IWeight> = ({
    value,
    setSelectedWeight
}) => {

    const {t} = useTranslation(['[exercise]']);

    /**
     * @param isShowInputOver Показать/скрыть окно ввода веса.
     */
    const [isShowInputOver, setIsShowInputOver] = useState<boolean>(false);
    /**
     * @param buttonActiveWeight Какой пункт выбора веса активный.
     */
    const [buttonActiveWeight, setButtonActiveWeight] = useState<TKeyItem>('active both');

    let currentWeight: number = 0;

    if(typeof value === 'number') {
        currentWeight = value;
    }

    return (
        <>
            <Title text={t('[exercise]:addRepsRest.titleWeight')} marginTop={5} fontSize={stylesValue.folder.exercise.addRepsRest.fontSizeTitle} />
            <View style={[styles.weight, {borderRadius: stylesValue.folder.exercise.addRepsRest.borderRadius}]}>
                <View style={styles.weight_body} >
                    <ItemAddWeight 
                        keyItem='total weight'
                        value={currentWeight}
                        text={t('[exercise]:addRepsRest.totalWeight')}
                        icon={ICON.KETTLEBELL} 
                        padding={3}
                        buttonActiveWeight={buttonActiveWeight}
                        setButtonActiveWeight={setButtonActiveWeight}
                        setIsShowInputOver={setIsShowInputOver}
                    />
                    <ItemAddWeight 
                        keyItem='barbell and plate'
                        value={0}
                        text={t('[exercise]:addRepsRest.barbellAndPlateWeight')}
                        icon={ICON.WEIGHT} 
                        buttonActiveWeight={buttonActiveWeight}
                        setButtonActiveWeight={setButtonActiveWeight}
                    />
                </View>
            </View>
            <HelpText text={t('[exercise]:addRepsRest.helpTextWeight')} />
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
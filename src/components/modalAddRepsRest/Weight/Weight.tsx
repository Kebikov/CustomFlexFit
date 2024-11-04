import { View, StyleSheet } from 'react-native';
import React, { FC, memo } from 'react';
import Title from '@/components/Title/Title';
import { useTranslation } from 'react-i18next';
import ICON from '@/source/icon';
import ItemAddWeight from '@/components/ItemAddWeight/ItemAddWeight';
import HelpText from '@/components/HelpText/HelpText';



interface IWeight {
    fontSizeTitle: number;
    borderRadiusBody: number;
    setButtonActiveWeight:  React.Dispatch<React.SetStateAction<"left" | "right" | undefined>>;
    buttonActiveWeight?: "left" | "right";
}


/**
 * @component ``
 */
const Weight: FC<IWeight> = ({
    fontSizeTitle,
    borderRadiusBody,
    setButtonActiveWeight,
    buttonActiveWeight
}) => {

    const {t} = useTranslation(['[exercise]']);

    return (
        <>
            <Title text={t('[exercise]:modalAddRepsRest.titleWeight')} marginTop={5} fontSize={fontSizeTitle} />
            <View style={[styles.weight, {borderRadius: borderRadiusBody}]}>
                <View style={styles.weight_body} >
                    <ItemAddWeight 
                        text={'total weight of \n the equipment'}
                        isLeftRight='left' 
                        icon={ICON.KETTLEBELL} 
                        padding={3}
                        setButtonActiveWeight={setButtonActiveWeight}
                        opacity={
                            buttonActiveWeight === undefined ?
                            1
                            :
                            buttonActiveWeight === 'left' ?
                            1
                            :
                            .5
                        }
                    />
                    <ItemAddWeight 
                        text={'Barbell and plate \n  weight'}
                        isLeftRight='right' 
                        icon={ICON.WEIGHT} 
                        setButtonActiveWeight={setButtonActiveWeight}
                        opacity={
                            buttonActiveWeight === undefined ?
                            1
                            :
                            buttonActiveWeight === 'right' ?
                            1
                            :
                            .5
                        }
                    />
                </View>
            </View>
            <HelpText text={t('[exercise]:modalAddRepsRest.helpTextWeight')} />
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
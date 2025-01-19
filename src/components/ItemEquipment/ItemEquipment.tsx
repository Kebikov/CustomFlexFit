import { View, Text, Image } from 'react-native';
import { FC } from 'react';
import Switcher from '../Switcher/Switcher';
import { interpolate, Extrapolation } from 'react-native-reanimated';
import useHookImageCheck from '@/hook/useHookImageCheck';
import useAppTranslation from '@/localization/helpers/useAppTranslation';
import ButtonSwipeable from '../ButtonSwipeable/ButtonSwipeable';
import { IItemEquipment } from './types';
import { styles } from './styles';


/** @component `//= Элемент со снарядом.` */
const ItemEquipment: FC<IItemEquipment> = ({
    item,
    onPressing,
    isActive,
    marginTop = 10
}) => {
    const {imgCheck} = useHookImageCheck();
    const {t, t$} = useAppTranslation(['[exercise]', '[equipment]']);

    return (
        <View style={[{marginTop}]}>
            <ButtonSwipeable
                totalButton={2}
                onPressButton1={() => {}}
                onPressButton2={() => {}}
            >
                <View style={[styles.container]} >
                    <View style={styles.contaiber_body} >
                        <View 
                            style={[styles.box_img, 
                                {
                                    padding: item.type === 'plate' && item.weight !== 0 ? 
                                    interpolate(item.weight, [1, 5, 10, 20], [16, 8, 3, 0], Extrapolation.CLAMP)
                                    : 
                                    0
                                }
                            ]} >
                            <Image style={styles.img} source={imgCheck(item.img)} />
                        </View>
                        <View style={styles.box_text} >
                            <Text style={styles.title} >
                                {
                                    item.type === 'plate' ?
                                    `${t$(item.title)} ${item.weight}`
                                    :
                                    t$(item.title) === '' ?
                                    t('[equipment]:common.name')
                                    :
                                    t$(item.title)
                                }
                            </Text>
                            <Text style={styles.text_weight} >
                                {
                                    `${t('[equipment]:common.weight')}: ${String(item.weight) === '' ? 0 : item.weight} ${t('[exercise]:equipment.kilograms')}`
                                }
                            </Text>
                        </View>
                        <View style={styles.box_switcher}>
                            {
                                isActive === undefined ||  onPressing === undefined ?
                                null
                                :
                                <Switcher id={item.id} onPressing={onPressing} isEnabled={isActive(item.id)} />
                            }
                        </View>
                    </View>
                </View>
            </ButtonSwipeable>
        </View>
    );
};


export default ItemEquipment;
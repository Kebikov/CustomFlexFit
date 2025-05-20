import { View, Text, Image } from 'react-native';
import { FC } from 'react';
import { interpolate, Extrapolation } from 'react-native-reanimated';
import useHookImageCheck from '@/hook/useHookImageCheck';
import useAppTranslation from '@/localization/helpers/useAppTranslation';
import ButtonSwipeable from '../ButtonSwipeable/ButtonSwipeable';
import { IItemEquipment } from './types';
import { styles } from './styles';
import ICON from '@/source/icon';
import { COLOR_ROOT } from '@/constants/colors';
import { useSQLiteContext } from 'expo-sqlite';
import EquipmentService from "@/SQL/Equipment/service/EquipmentService";
import { useHookRouter } from '@/router/useHookRouter';



/** @component `//= Элемент со снарядом.` */
const ItemEquipment: FC<IItemEquipment> = ({
    item,
    setDataEquipment,
    marginTop = 10,
    activeButtonIdSv
}) => {
    const {imgCheck} = useHookImageCheck();
    const {t, t$} = useAppTranslation(['[exercise]', '[equipment]']);
    const {appRouter} = useHookRouter();

    const db = useSQLiteContext();

     /** `Удаление снаряда.` */
    const deleteById = (id: number) => {
        return async () => {
            if(setDataEquipment) {
                await EquipmentService.findByIdAndDelete(db, id);
                const result = await EquipmentService.find(db);
                setDataEquipment(result);
            }
        }
    }

    return (
        <ButtonSwipeable
            isSwipe={false}
            totalButton={2}
            onPressButton1={() => {}}
            onPressButton2={deleteById(item.id)}

            iconForButton2={ICON.DEL_BTN}
            colorButton2={COLOR_ROOT.BUTTON_COLOR_RED}

            paddingInsideButton={22}
            widthOneButton={62}
            heightOneButton={67}

            idButton={item.id}
            activeButtonIdSv={activeButtonIdSv}
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
                                item.order + ' ' + t$(item.title)
                            }
                        </Text>
                        <Text style={styles.text_weight} >
                            {
                                `${t('[equipment]:common.weight')}: ${String(item.weight) === '' ? 0 : item.weight} ${t('[exercise]:equipment.kilograms')}`
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </ButtonSwipeable>
    );
};


export default ItemEquipment;

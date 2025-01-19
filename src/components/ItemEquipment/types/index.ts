import { EquipmentDTO } from '@/SQL/Equipment/DTO/EquipmentDTO';
import { SharedValue } from 'react-native-reanimated';


export interface IItemEquipment {
     /** `Object EquipmentDTO` */
    item: EquipmentDTO;
     /** `[SetStateAction] Сотстояние инвентаря.` */
    setDataEquipment?: React.Dispatch<React.SetStateAction<EquipmentDTO[]>>;
     /** `Отступ с верху.` */
    marginTop?: number;
     /** `Id активной кнопки в данный момент.` */
    activeButtonIdSv?: SharedValue<string>;
}







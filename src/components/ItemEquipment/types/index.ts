import { EquipmentDTO } from '@/SQL/Equipment/DTO/EquipmentDTO';


interface IItemEquipmentBase {
     /** `Object EquipmentDTO` */
    item: EquipmentDTO;
     /** `Отступ с верху.` */
    marginTop?: number;
}

interface IItemEquipmentFnc extends IItemEquipmentBase {
     /** `Функция обработки нажатия на блок.` */
    onPressing: (id: number) => void;
     /** `Активный ли переключатель.` */
    isActive:  (id: number) => boolean;
}

interface IItemEquipment_never extends IItemEquipmentBase{
     /** `Функция обработки нажатия на блок.` */
    onPressing?: never;
     /** `Активный ли переключатель.` */
    isActive?: never;
}

export type IItemEquipment = IItemEquipmentFnc | IItemEquipment_never;






export enum EEquipmentType {
    barbell = 'barbell',
    plate_left = 'plate_left',
    plate_right = 'plate_right'
}

/**
 * @table `Equipment - Используемый инвентарь, блины, грифы.`
 * @param id ID.
 * @param title Отображаемое название снаряда.
 * @param type Тип снаряда: блин(plate_left || plate_right) или гриф(barbell).
 * @param weight Вес снаряда, грифа или блина.
 */
export interface EquipmentDTO {
    id: number;
    title: string;
    type: EEquipmentType;
    weight: number;
}

export interface EquipmentDTOomitId extends EquipmentDTO {}
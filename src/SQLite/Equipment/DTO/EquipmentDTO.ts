/**
 * @table `Equipment - Используемый инвентарь, блины, грифы.`
 * @param id ID.
 * @param title_$ Отображаемое название снаряда. [_$ значит надо проверить на ключь для перевода]
 * @param type Тип снаряда: блин(plate_left || plate_right) или гриф(barbell).
 * @param weight Вес снаряда, грифа или блина.
 * @param img Изображение для инвентаря.
 */
export interface EquipmentDTO {
    id: number;
    title: string;
    type: 'plate' | 'barbell';
    weight: number;
    img: string;
}

export interface EquipmentDTOomitId extends EquipmentDTO {}
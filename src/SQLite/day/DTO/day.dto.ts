
/**
 * @table `Days - Таблица с днями занятий.`
 * @param id Id записи.
 * @param day День занятий.
 * @param img Изображение фоновое.
 * @param date Дата последнего занятия по данной программе.(23.12.2023)
 * @param title Титульное название для дня занятий.
 * @param description Описание для дня занятий, внизу блока.
 * @param lastExercise Последний ли это день по которому занимался.(0-false, 1-true)
 */
export interface DayDTO {
    id: number;
    day: number;
    img: number;
    date: string;
    title: string;
    description: string;
    lastExercise: number;
}

export interface DaysDTOomitId extends DayDTO {}
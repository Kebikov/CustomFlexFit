/**
 * @table `Day - Тренировочный день.`
 * @param id ID.
 * @param dayQueue День занятий по очереди.
 * @param img Изображение фоновое.
 * @param date Дата последнего занятия по данной программе.[example '23.12.2023']
 * @param title Титульное название для дня занятий.
 * @param description Описание для дня занятий, внизу блока.
 * @param lastExercise Последний ли это день по которому занимался.[example 0-false, 1-true)
 */
export interface DayDTO {
    id: number;
    queue: number;
    img: number;
    date: string;
    title: string;
    description: string;
    lastExercise: number;
}

export interface DayDTOomitId extends DayDTO {}
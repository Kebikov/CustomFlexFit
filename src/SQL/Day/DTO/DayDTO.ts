export interface DayDTO {
    id: number;
     /** `Очередность.` */
    queue: number;
     /** `Изображение фоновое, имя изображения в папке памяти телефона > 'myImage'.` */
    img: string;
     /** `Дата последнего занятия по данной программе.[example '23.12.2023']` */
    date: string;
     /** `Титульное название для дня занятий.` */
    title: string;
     /** `Описание для дня занятий, внизу блока.` */
    description: string;
     /** `Последний ли это день по которому занимался.[example 0-false, 1-true)` */
    lastExercise: number;
}

export interface DayDTOomitId extends Omit<DayDTO, 'id'> {}
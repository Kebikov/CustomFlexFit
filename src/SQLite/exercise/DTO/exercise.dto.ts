export type TIsUp = 'up' | 'down' | '?' | 'not';

export enum EWeightNeck {
    big = '7.3',
    w = '5',
    dumbbell = '1.6',
    zero = '0'
}


/**
 * @table `Exercise - Таблица с днями занятий.`
 * @param id Id записи.
 * @param day День занятий.
 * @param exercise Упражнение по очередности.
 * @param title Титульное название упражнения.
 * @param description Дополнительная информация к упражнению.
 * @param weightNeck Вес грифа.
 * @param weightOne Вес с первой стороны грифа.
 * @param weightTwo Вес со второй стороны грифа.
 * @param amount Количество повторов в упражнении.
 * @param amountExercise Количество раз которое сделал с данным весом, сколько всего дней делал с таким весом.
 * @param isUp Заметка о поднятии, уменьшении или возможном поднятии веса.
 * @param img Изображение для упражнения.(размер 800*500px)
 * @param burpee Количество раз берпи в упражнении.
 */
export interface ExerciseDTO {
    id: number;
    day: number;
    exercise: number;
    title: string;
    description: string;
    weightNeck: EWeightNeck;
    weightOne: string;
    weightTwo: string;
    amount: number;
    amountExercise: number;
    isUp: TIsUp;
    img: number;
    burpee: number;
}

export interface ExerciseDTOomitId extends Omit<ExerciseDTO, 'id'> {}


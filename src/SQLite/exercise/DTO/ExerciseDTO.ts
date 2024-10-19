/**
 * @table `Exercise - Таблица с днями занятий.`
 * @param id ID.
 * @param title Титульное название упражнения.
 * @param description Дополнительная информация к упражнению. 
 * @param img Изображение для упражнения(размер 800*500px).
 */
export interface ExerciseDTO {
    id: number;
    title: string;
    description: string;
    img: number;
}

export interface ExerciseDTOomitId extends Omit<ExerciseDTO, 'id'> {}


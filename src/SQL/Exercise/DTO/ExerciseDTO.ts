export interface ExerciseDTO {
     /** `ID` */
    id: number;
     /** `Очередность.` */
    queue: number;
     /** `Титульное название упражнения.` */
    title: string;
     /** `Дополнительная информация к упражнению.` */
    description: string;
     /** `Изображение для упражнения(размер 800*500px).` */
    img: string;
}

export interface ExerciseDTOomitId extends Omit<ExerciseDTO, 'id'> {}


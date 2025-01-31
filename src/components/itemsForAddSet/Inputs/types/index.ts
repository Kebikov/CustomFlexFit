import { ExerciseDTO } from "@/SQL/Exercise/DTO/ExerciseDTO";

export interface IInputsSet extends Pick<ExerciseDTO, 'title' | 'description'> {}
import { ExerciseDTO } from "@/SQL/Exercise/DTO/ExerciseDTO";

export interface IInputsRepsRest extends Pick<ExerciseDTO, 'title' | 'description'> {}
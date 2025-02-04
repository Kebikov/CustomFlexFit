import CONFIGURATION from '@/constants/сonfiguration';
import { ExerciseDTO } from '@/SQL/Exercise/DTO/ExerciseDTO';
import { Model } from '@/SQL/Model/Model';


const exercise_model = `
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER,
    "title" TEXT,
    "description" TEXT,
    "img" TEXT
`;


class Exercise extends Model<ExerciseDTO>({
    table: CONFIGURATION.TABLE_Exercise,
    model: exercise_model,
    info: '[class Exercise]'
}){}


export default Exercise;
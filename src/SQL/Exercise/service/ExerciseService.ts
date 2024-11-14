import Exercise from "../modules/Exercise";
import { SQLiteDatabase } from 'expo-sqlite';
import { ExerciseDTO, ExerciseDTOomitId } from "../DTO/ExerciseDTO";
import CONFIGURATION from "@/constants/сonfiguration";
import { DATA_START_EXERCISE } from "@/constants/dataExercise";
import DatabaseService from "@/SQL/Database/service/DatabaseService";


class ExerciseService {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await Exercise.create(db);
    }

    /**
     * `//* Вывод в консоль данные таблицы.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await Exercise.find(db);
        console.info(JSON.stringify(result, null, 2));
    }

}

export default new ExerciseService();
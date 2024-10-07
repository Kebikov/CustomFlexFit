import Exercise from "../modules/Exercise";
import { SQLiteDatabase } from 'expo-sqlite';
import { ExerciseDTO, ExerciseDTOomitId } from "../DTO/exercise.dto";
import CONFIGURATION from "@/constants/сonfiguration";
import { DATA_START_EXERCISE } from "@/constants/dataExercise";
import DatabaseService from "@/SQLite/database/service/database.service";


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

    /**
     * `//* Добавление начальных данных в таблицу.`
     */
    async addDataStartInTableExercise(db: SQLiteDatabase, data?: ExerciseDTOomitId[]) {
        /**
         * Команда для SQL по добавлению данных.
         */
        let commandStart: string = `INSERT INTO ${CONFIGURATION.TABLE_EXERCISE} 
            (day, exercise, title, description, weightNeck, weightOne, weightTwo, amount, amountExercise, isUp, img, burpee) 
            VALUES `;

        if(data) {
            commandStart = handleCommand(data, commandStart);
        } else {
            commandStart = handleCommand(DATA_START_EXERCISE, commandStart);
        }

        /**
         * @function
         * Формирование команды SQL для добавления данных в таблицу.
         * @param dataTable Массив обьектов упражнений.
         * @returns {string} Вернет сформированную команду строкой.
         */
        function handleCommand(dataTable: ExerciseDTOomitId[], command: string): string {
            dataTable.forEach(item => {
                command += `(
                    "${item.day}", 
                    "${item.exercise}", 
                    "${item.title}", 
                    "${item.description}", 
                    "${item.weightNeck}", 
                    "${item.weightOne}",
                    "${item.weightTwo}",
                    "${item.amount}",
                    "${item.amountExercise}",
                    "${item.isUp}",
                    "${item.img}",
                    "${item.burpee}"),`;
            });

            return command;
        }

        // Удаление зарпятой в конце команды.
        let command = commandStart.slice(0, -1);

        const isDataExistence = await DatabaseService.checkDataExistenceInTable(db, CONFIGURATION.TABLE_EXERCISE);

        if(!isDataExistence) {
            await db.execAsync(command);
        }
    }

}

export default new ExerciseService();
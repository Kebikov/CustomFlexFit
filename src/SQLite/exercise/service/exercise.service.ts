import Exercise from "../modules/Exercise";
import { SQLiteDatabase } from 'expo-sqlite';
import { ExerciseDTO, ExerciseDTOomitId } from "../DTO/exercise.dto";
import CONFIGURATION from "@/constants/сonfiguration";
import { DATA_START_EXERCISE } from "@/constants/dataExercise";
import DatabaseService from "@/SQLite/database/service/DatabaseService";


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
        try {
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
                    command += `( ${item.day}, ${item.exercise}, "${item.title}", "${item.description}", "${item.weightNeck}", "${item.weightOne}", "${item.weightTwo}", ${item.amount}, ${item.amountExercise}, "${item.isUp}", "${item.img}", ${item.burpee} ),`;
                });

                return command;
            }

            // Удаление зарпятой в конце команды.
            let command = commandStart.slice(0, -1);
            console.log(command);
            const isExistTable = await DatabaseService.checkExistenceDataBase();
            if (!isExistTable) {
                console.info(`База данных ${CONFIGURATION.DB_NAME} не сушествует.`);
                return;
            }

            const result = await DatabaseService.checkDataExistenceInTable(db, CONFIGURATION.TABLE_EXERCISE);

            if(!result) {
                await db.execAsync(command);
            }
        } catch (error) {
            console.error('Error in addDataStartInTableExercise >>>', error);
        }
    }

    /**
     * `//* Возврат упражнений по дню занятий.`
     */
    async findByDay(db: SQLiteDatabase, day: string): Promise<ExerciseDTO[]> {
        const dayNum = Number(day);
        return await Exercise.findByDay(db, dayNum);
    }
}

export default new ExerciseService();
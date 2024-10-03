import { DATA_START_EXERCISE } from "@/constants/dataExercise";
import type { ExerciseDTOomitId } from "../exercise/DTO/exercise.dto";
import type { SQLiteDatabase } from "expo-sqlite";
import checkDataExistenceInTable from "./checkDataExistenceInTable";
import CONFIGURATION from "@/constants/сonfiguration";



/**
 * `Добавление начальных данных в таблицу "Configuration.TABLE_EXERCISE".`
 * - Условие: сработает, если таблица пустая, в ней нет данных.
 * @param data Массив обьектов занятий, при его передаче данные устанавливаются с него.
 * @example await addDataStartInTableExercise()
 */
const addDataStartInTableExercise = async (db: SQLiteDatabase, data?: ExerciseDTOomitId[]): Promise<void> => {
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

    const isDataExistence = await checkDataExistenceInTable(db, CONFIGURATION.TABLE_EXERCISE);

    if(!isDataExistence) {
        await db.execAsync(command);
    }

}

export default addDataStartInTableExercise;
import { SQLiteDatabase } from 'expo-sqlite';
import Day from '../modules/Day';
import displayError from '@/helpers/displayError';
import { DayDTO } from '../DTO/day.dto';
import CONFIGURATION from '@/constants/сonfiguration';
import { DATA_DAY } from "@/constants/dataDay";
import DatabaseService from '@/SQLite/database/service/database.service';


class DayServise {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await Day.create(db);
    }

    /**
     * `//* Вывод в консоль данные таблицы.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await Day.find(db); 
        if(!result) return displayError('in Days.find');
        console.info(JSON.stringify( result, null, 2));
    }

    /**
     * `//* Добавление начальных данных в таблицу.`
     */
    async addDataStartInTableDay(db: SQLiteDatabase, data: DayDTO[] | null = null) {
        try {
            /**
             * Команда для SQL по добавлению данных.
             */
            let commandStart: string = `INSERT INTO ${CONFIGURATION.TABLE__DAY} (day, img, date, title, description, lastExercise) VALUES `;

            if(data) {
                data.forEach(item => {
                    commandStart += `("${item.day}", "${item.img}", "${item.date}", "${item.title}", "${item.description}", "${item.lastExercise ? 1 : 0}"),`;
                });
            } else {
                DATA_DAY.forEach(item => {
                    commandStart += `("${item.day}", "${item.img}", "${item.date}", "${item.title}", "${item.description}", "${item.lastExercise ? 1 : 0}"),`;
                });
            }

            // Удаление зарпятой в конце команды.
            let command = commandStart.slice(0, -1);

            const isExistTable = await DatabaseService.checkExistenceDataBase();
            if (!isExistTable) {
                console.info(`База данных ${CONFIGURATION.DB_NAME} не сушествует.`);
                return;
            }

            const result = await DatabaseService.checkDataExistenceInTable(db, CONFIGURATION.TABLE__DAY);
            
            if(!result) {
                await db.execAsync(command);
            }
        } catch (error) {
            console.error('Error in  >>>', error);
        }
    }

    /**
     * `//* Возврат всех записей.`
     */
    async find(db: SQLiteDatabase): Promise<DayDTO[]> {
        const result = await Day.find(db);
        return result === undefined ? [] : result;
    }
}

export default new DayServise();
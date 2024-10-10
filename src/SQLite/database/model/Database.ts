import { SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';


class Database {

    /**
     * `//* Закрытие базы данных.`
     */
    async close(db: SQLiteDatabase) {
        await db.closeAsync();
    }

    /**
     * `//* Удаление базы даннных.`
     */
    async remove() {
        await SQLite.deleteDatabaseAsync(CONFIGURATION.DB_NAME);
    }

    /**
     * `//* Возврат количества записей в таблице.`
     */
    async findCountTable(db: SQLiteDatabase, table: string): Promise<number | null> {
        const result: {"COUNT(*)": number} | null = await db.getFirstAsync(`SELECT COUNT(*) FROM ${table}`);
        console.log('findCountTable = ', result);
        if(result !== null) {
            return result['COUNT(*)'];
        } else {
            return null;
        }
    }

    /**
     * `//* Возврат всех таблиц в базе данных.`
     */
    async findTable(db: SQLiteDatabase): Promise<Array<string>> {
        const tables: Array<{"name": string}> = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type='table'`);
        const currentArrayTables: Array<string> = [];

        tables.forEach(item => {
            if(item.name !== 'sqlite_sequence') currentArrayTables.push(item.name);
        });
        
        return currentArrayTables;
    }

    /**
     * `//* Установка версии базы данных.`
     */
    async setVersion(db: SQLiteDatabase, version: number) {
        await db.runAsync(`PRAGMA user_version = ${version}`);
    }

    /**
     * `//* Возврат версии базы данных.`
     */
    async getVersion(db: SQLiteDatabase) {
        let version = await db.getFirstAsync<{ user_version: number } | null>('PRAGMA user_version');
        console.log('version DB = ', version);
        if(version && version.user_version) {
            return version.user_version;
        } else {
            return 0;
        }
    }

    /**
     * `//* включени более эфективного режима работы базы данных.`
     */
    async modeWal(db: SQLiteDatabase) {
        await db.runAsync(`PRAGMA journal_mode = 'wal'`);
    }

}

export default new Database();
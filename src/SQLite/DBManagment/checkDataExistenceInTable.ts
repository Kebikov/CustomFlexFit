import { SQLiteDatabase } from "expo-sqlite"

/**
 * `Проверка таблицы на наличие данных в ней.`
 */
const checkDataExistenceInTable = async (db: SQLiteDatabase, table: string) => {

    const result: {"COUNT(*)": number} | null = await db.getFirstAsync(`SELECT COUNT(*) FROM ${table}`);

    if(result === null || result["COUNT(*)"] === 0) {
        return false;
    } else {
        return true;
    }

}


export default checkDataExistenceInTable;





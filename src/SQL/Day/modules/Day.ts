import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { DayDTO, DayDTOomitId } from '@/SQL/Day/DTO/DayDTO';
import { Model } from '@/SQL/Model/Model';


const day_DTO = `
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    queue INT UNIQUE,
    img TEXT,
    date TEXT,
    title TEXT,
    description TEXT,
    lastExercise INTEGER
`;


class Day extends Model<DayDTO>() {

    static table: string = CONFIGURATION.TABLE_Day;
    static column = day_DTO;
    static info: string = '[class Day]';

}


export default Day;

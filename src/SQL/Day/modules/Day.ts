import CONFIGURATION from '@/constants/сonfiguration';
import { DayDTO } from '@/SQL/Day/DTO/DayDTO';
import { Model } from '@/SQL/Model/Model';


const day_model = `
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    queue INT UNIQUE,
    img TEXT,
    date TEXT,
    title TEXT,
    description TEXT,
    lastExercise INTEGER
`;


class Day extends Model<DayDTO>({
    table: CONFIGURATION.TABLE_Day,
    model: day_model,
    info: '[class Day]'
}) {}


export default Day;

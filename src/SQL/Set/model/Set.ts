import CONFIGURATION from '@/constants/сonfiguration';
import { SetDTO } from '../DTO/SetDTO';
import { Model } from '@/SQL/Model/Model';


const set_model = `
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "reps" INT,
    "rest" INT,
    "duration" INT,
    "weight" INTEGER,
    "id_Exercise" INT NOT NULL,

    FOREIGN KEY (id_Exercise)
    REFERENCES Exercise (id) 
    ON DELETE CASCADE
`;


class Set extends Model<SetDTO>({
    table: CONFIGURATION.TABLE_Set,
    model: set_model,
    info: '[class Set]'
}) {}

export default Set;
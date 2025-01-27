import CONFIGURATION from '@/constants/сonfiguration';
import { RepsRestDTO } from '../DTO/RepsRestDTO';
import { Model } from '@/SQL/Model/Model';


const repsRest_model = `
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "reps" INT,
    "rest" INT,
    "duration" INT,
    "id_List" INT NOT NULL,

    CONSTRAINT FK_RepsRest
    FOREIGN KEY (id_List)
    REFERENCES List (id) 
    ON DELETE CASCADE
`;


class RepsRest extends Model<RepsRestDTO>({
    table: CONFIGURATION.TABLE_RepsRest,
    model: repsRest_model,
    info: '[class RepsRest]'
}) {}

export default RepsRest;
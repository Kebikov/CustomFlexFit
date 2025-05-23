import CONFIGURATION from '@/constants/сonfiguration';
import { EquipmentDTO } from '../DTO/EquipmentDTO';
import { Model } from '@/SQL/Model/Model';


const equipment_model = `
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "type" TEXT,
    "weight" INTEGER,
    "img" TEXT,
    "queue" INTEGER
`;


class Equipment extends Model<EquipmentDTO>({
    table: CONFIGURATION.TABLE_Equipment,
    model: equipment_model,
    info: '[class Equipment]'
}) {}


export default Equipment;
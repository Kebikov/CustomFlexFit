import { EquipmentDTO } from "@/SQL/Equipment/DTO/EquipmentDTO";


const barbellStandart: string =  String(require('@/source/img/weight/barbell.jpg'));
const barbellW: string =  String(require('@/source/img/weight/barbell_w.jpg'));
const dumbbell: string = String(require('@/source/img/weight/dumbbell.jpg'));
const plate: string = String(require('@/source/img/weight/plate.jpg'));


 /** `Начальные данные для добавления в BD.` */
const dataEquipment: EquipmentDTO[] = [
    {
        id: 1,
        order: 1, 
        type: 'barbell',
        title: 't$_[exercise]:common.barbell',
        weight: 8,
        img: barbellStandart
    },
    {
        id: 2,
        order: 2, 
        type: 'barbell',
        title: 't$_[exercise]:common.barbell',
        weight: 5,
        img: barbellW
    },
    {
        id: 3,
        order: 3,
        type: 'barbell',
        title: 't$_[exercise]:common.barbell',
        weight: 1.5,
        img: dumbbell
    },
    {
        id: 4,
        order: 4,
        type: 'plate',
        title: 't$_[exercise]:common.plate',
        weight: 20,
        img: plate
    },
    {
        id: 5,
        order: 5,
        type: 'plate',
        title: 't$_[exercise]:common.plate',
        weight: 10,
        img: plate
    },
    {
        id: 6,
        order: 6,
        type: 'plate',
        title: 't$_[exercise]:common.plate',
        weight: 5,
        img: plate
    },
    {
        id: 7,
        order: 7,
        type: 'plate',
        title: 't$_[exercise]:common.plate',
        weight: 1.5,
        img: plate
    },
    {
        id: 8,
        order: 8,
        type: 'plate',
        title: 't$_[exercise]:common.plate',
        weight: 1,
        img: plate
    }
];

export default dataEquipment;
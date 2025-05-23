import { EquipmentDTO } from "@/SQL/Equipment/DTO/EquipmentDTO";


const barbellStandart: string =  String(require('@/source/img/weight/barbell.jpg'));
const barbellW: string =  String(require('@/source/img/weight/barbell_w.jpg'));
const dumbbell: string = String(require('@/source/img/weight/dumbbell.jpg'));
const plate: string = String(require('@/source/img/weight/plate.jpg'));


 /** `Начальные данные для добавления в BD.` */
const dataEquipment: EquipmentDTO[] = [
    {
        id: 1,
        queue: 1, 
        type: 'barbell',
        title: 't$_[exercise]:common.barbell',
        weight: 8,
        img: barbellStandart
    },
    {
        id: 2,
        queue: 2, 
        type: 'barbell',
        title: 't$_[exercise]:common.barbell',
        weight: 5,
        img: barbellW
    },
    {
        id: 3,
        queue: 3,
        type: 'barbell',
        title: 't$_[exercise]:common.barbell',
        weight: 1.5,
        img: dumbbell
    },
    {
        id: 4,
        queue: 4,
        type: 'plate',
        title: 't$_[exercise]:common.plate',
        weight: 20,
        img: plate
    },
    {
        id: 5,
        queue: 5,
        type: 'plate',
        title: 't$_[exercise]:common.plate',
        weight: 10,
        img: plate
    },
    {
        id: 6,
        queue: 6,
        type: 'plate',
        title: 't$_[exercise]:common.plate',
        weight: 5,
        img: plate
    },
    {
        id: 7,
        queue: 7,
        type: 'plate',
        title: 't$_[exercise]:common.plate',
        weight: 1.5,
        img: plate
    },
    {
        id: 8,
        queue: 8,
        type: 'plate',
        title: 't$_[exercise]:common.plate',
        weight: 1,
        img: plate
    }
];


export default dataEquipment;
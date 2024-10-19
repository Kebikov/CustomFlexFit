import { DayDTO } from "@/SQLite/Day/DTO/DayDTO";


/**
 * `Начальные данные дней занятий.`
 */
export const DATA_DAY: Array<Omit<DayDTO, 'id'>> = [
    {
        queue: 1,
        img: require(`@/source/img/daysScreen/1.jpg`),
        date: '16.01.2024',
        title: 'Day One',
        description: 'Битепс / Ноги / Грудь',
        lastExercise: 0
    },
    {
        queue: 2,
        img: require(`@/source/img/daysScreen/2.jpg`),
        date: '17.01.2024',
        title: 'Day Two',
        description: 'Грудь / Битепс / Плечи',
        lastExercise: 0
    },
    {
        queue: 3,
        img: require(`@/source/img/daysScreen/3.jpg`),
        date: '19.01.2024',
        title: 'Day Three',
        description: 'Битепс / Грудь / Ноги',
        lastExercise: 0
    },
    {
        queue: 4,
        img: require(`@/source/img/daysScreen/4.jpg`),
        date: '21.01.2024',
        title: 'Day Four',
        description: 'Плечи / Грудь / Битепс',
        lastExercise: 0
    },
    {
        queue: 5,
        img: require(`@/source/img/daysScreen/5.jpg`),
        date: '23.01.2024',
        title: 'Day Five',
        description: 'Грудь / Плечи / Спина',
        lastExercise: 1
    }
];
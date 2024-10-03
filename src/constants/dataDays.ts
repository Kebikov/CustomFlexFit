import { DaysDTO } from "@/SQLite/days/DTO/days.dto";


/**
 * `Начальные данные дней занятий.`
 */
export const DATA_DAYS: Array<Omit<DaysDTO, 'id'>> = [
    {
        day: 1,
        img: require(`@/source/img/daysScreen/daysScreen_1.jpg`),
        date: '16.01.2024',
        title: 'Day One',
        description: 'Битепс / Ноги / Грудь',
        lastExercise: 0
    },
    {
        day: 2,
        img: require(`@/source/img/daysScreen/daysScreen_2.jpg`),
        date: '17.01.2024',
        title: 'Day Two',
        description: 'Грудь / Битепс / Плечи',
        lastExercise: 0
    },
    {
        day: 3,
        img: require(`@/source/img/daysScreen/daysScreen_3.jpg`),
        date: '19.01.2024',
        title: 'Day Three',
        description: 'Битепс / Грудь / Ноги',
        lastExercise: 0
    },
    {
        day: 4,
        img: require(`@/source/img/daysScreen/daysScreen_4.jpg`),
        date: '21.01.2024',
        title: 'Day Four',
        description: 'Плечи / Грудь / Битепс',
        lastExercise: 0
    },
    {
        day: 5,
        img: require(`@/source/img/daysScreen/daysScreen_5.jpg`),
        date: '23.01.2024',
        title: 'Day Five',
        description: 'Грудь / Плечи / Спина',
        lastExercise: 1
    }
];
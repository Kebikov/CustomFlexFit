import { ExerciseDTO } from "@/SQLite/Exercise/DTO/ExerciseDTO";


export const DATA_START_EXERCISE: Array<Omit<ExerciseDTO, 'id'>> = [
    //* DAY_1
    {
        title: 'Битепс, сидя с упором в скамью.',
        description: 'третий упор от сиденья',
        img: require('@/source/img/days/day-1/1.jpg')
    },
    {
        title: 'Присидания со штангой.',
        description: 'крепление в 9 отверстие',
        img: require('@/source/img/days/day-1/2.jpg')
    },
    {
        title: 'Жим лежа со штангой.',
        description: 'крепление в 3 отверстие',
        img: require('@/source/img/days/day-1/3.jpg')
    },
    //* DAY_2
    {
        title: 'Отжимание от брусьев.',
        description: 'крепление в 6 отверстие',
        img: require('@/source/img/days/day-2/1.jpg')
    },
    {
        title: 'Битепс, стоя со штангой.',
        description: 'штанга WZ',
        img: require('@/source/img/days/day-2/2.jpg')
    },
    {
        title: 'Разводка гантелей в стораны.',
        description: 'с двумя гантелями',
        img: require('@/source/img/days/day-2/3.jpg')
    },
    //* DAY_3
    {
        title: 'Битепс, стоя со штангой.',
        description: 'штанга WZ',
        img: require('@/source/img/days/day-3/1.jpg')
    },
    {
        title: 'Жим лежа под наклоном.',
        description: 'крепление в 4 отверстие',
        img: require('@/source/img/days/day-3/2.jpg')
    },
    {
        title: 'Подъемы на скамью с гантелями.',
        description: 'с двумя гантелями',
        img: require('@/source/img/days/day-3/3.jpg')
    },
    //* DAY_4
    {
        title: 'Разводка гантелей в стораны.',
        description: 'с двумя гантелями',
        img: require('@/source/img/days/day-4/1.jpg')
    },
    {
        title: 'Жим гантелей лежа.',
        description: 'скамья в нетральном положении',
        img: require('@/source/img/days/day-4/2.jpg')
    },
    {
        title: 'Битепс, упражнение молоток.',
        description: 'с двумя гантелями',
        img: require('@/source/img/days/day-4/3.jpg')
    },
    //* DAY_5
    {
        title: 'Грудь, свидение гантелей.',
        description: 'нетральное положение скамьи',
        img: require('@/source/img/days/day-5/1.jpg')
    },
    {
        title: 'Плечи, подьем штанги сидя.',
        description: 'крепление в 4 отверстие',
        img: require('@/source/img/days/day-5/2.jpg')
    },
    {
        title: 'Спина, тяги штанги в наклоне.',
        description: 'внешний хват',
        img: require('@/source/img/days/day-5/3.jpg')
    }
];

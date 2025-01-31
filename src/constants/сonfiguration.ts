export type TTables = 'Day' | 'Exercise' | 'List' | 'Equipment' | 'Set' | 'Set_Equipment' | 'Day_Exercise';


export interface IConfiguration {
     /** `Имя BD` */
    DB_Name: string;
     /** `Тренировочный день.` */
    TABLE_Day: TTables;
     /** `Упражнение.` */
    TABLE_Exercise: TTables;
    TABLE_List: TTables;
     /** `Используемый инвентарь, блины, грифы.` */
    TABLE_Equipment: TTables;
     /** `Подход в упражнении.` */
    TABLE_Set: TTables;

    TABLE_RELATION_Day_Exercise: TTables;
    TABLE_RELATION_Set_Equipment: TTables;
}


const CONFIGURATION: IConfiguration = {
	DB_Name: 'customFlexFit.db',

	TABLE_Day: 'Day',
	TABLE_Exercise: 'Exercise',
    TABLE_List: 'List',
    TABLE_Equipment: 'Equipment',
    TABLE_Set: 'Set',
    
    TABLE_RELATION_Day_Exercise: 'Day_Exercise',
    TABLE_RELATION_Set_Equipment: 'Set_Equipment'
};


export default CONFIGURATION;
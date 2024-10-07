export interface IConfiguration {
    /**
     * Базы данных.
     */
    DB_NAME: string;

    /**
     * Таблица дни.
     */
    TABLE__DAY: string;
    /**
     * Таблица занятий.
     */
    TABLE_EXERCISE: string;
}


const CONFIGURATION: IConfiguration = {
	DB_NAME: 'customFlexFit.db',

	TABLE__DAY: 'day',
	TABLE_EXERCISE: 'exercise'
};


export default CONFIGURATION;
export interface IConfiguration {
    /**
     * Базы данных.
     */
    DB_NAME: string;

    /**
     * Таблица дни.
     */
    TABLE__DAYS: string;
    /**
     * Таблица занятий.
     */
    TABLE_EXERCISE: string;
}


const CONFIGURATION: IConfiguration = {
	DB_NAME: 'customFlexFit.db',

	TABLE__DAYS: 'days',
	TABLE_EXERCISE: 'exercise'
};


export default CONFIGURATION;
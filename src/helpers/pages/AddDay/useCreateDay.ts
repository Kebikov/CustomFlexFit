import ImageService from '@/SQL/Database/service/ImageService';
import { useTranslation } from 'react-i18next';
import DayService from '@/SQL/Day/service/DayService';
import { useHookRouter } from '@/router/useHookRouter';
import showMessage from '@/helpers/showMessage';

import type { SQLiteDatabase } from 'expo-sqlite';
import type { DayDTO } from '@/SQL/Day/DTO/DayDTO';
import type { TdayState } from '@/app/day/addDay';


const useCreateDay = (db: SQLiteDatabase, dayState: TdayState) => {

    const {t} = useTranslation(['common', 'button', '[day]', 'alert_and_toast']);
    const {appRouter} = useHookRouter();

    async function createDay() {
         // Проверка входящих данных
        if(dayState.img === undefined) return showMessage(t('alert_and_toast:imgNotSelect'));
        if(dayState.title === t('[day]:addDay.title')) return showMessage(t('alert_and_toast:imgNotSelect'));

         // Сохранение изображения в пользовательской папке.
        const resultNameForSaveImg = await ImageService.save({pathToFile: dayState.img});
        if(!resultNameForSaveImg) throw new Error('Ощибка при сохранении изображения.');

         // Формируем обьект сушности для записи в таблицу Day.
        const entity: Omit<DayDTO, 'id'> = {
            queue: 0,
            img: resultNameForSaveImg,
            date: '',
            title: dayState.title,
            description: dayState.description === t('[day]:addDay.description') ? '' : dayState.description,
            lastExercise: 0
        }
        
         // Добавление в BD нового дня.
        const result = await DayService.insertOne(db, entity);
        if(!result) throw new Error('Ошыбка при добавлении дня в BD.');

        //if(result) appRouter.replace('/exercise/addExercise');
        if(result) appRouter.replace('/day/listDay');
    }

    return {
        /**
         * `Создание дня тренировки.`
         */
        createDay
    }
}

export default useCreateDay;
import ImageService from '@/SQLite/Database/service/ImageService';
import { useTranslation } from 'react-i18next';
import DayService from '@/SQLite/Day/service/DayService';
import { useHookRouter } from '@/router/useHookRouter';
import showMessage from '@/helpers/showMessage';

import type { SQLiteDatabase } from 'expo-sqlite';
import type { DayDTOomitId } from '@/SQLite/Day/DTO/DayDTO';
import type { TdayState } from '@/app/day/addDay';


const useCreateDay = (db: SQLiteDatabase, dayState: TdayState) => {

    const {t} = useTranslation(['common', 'button', '[day]', 'alert_and_toast']);
    const {appRouter} = useHookRouter();

    async function createDay() {
        // Проверка входящих данных
        if(dayState.img === undefined) return showMessage(t('alert_and_toast:imgNotSelect'));
        if(dayState.title === t('[day]:addDay.title')) return showMessage(t('alert_and_toast:imgNotSelect'));

        // Задаем имя для изображения.
        let nameForSaveImage: string = ImageService.getNameForImage(dayState.img);

        // Формируем обьект сушности для записи в таблицу Day.
        const entity: DayDTOomitId = {
            queue: 0,
            img: nameForSaveImage,
            date: '',
            title: dayState.title === t('[day]:addDay.title') ? '' : dayState.title,
            description: dayState.description === t('[day]:addDay.description') ? '' : dayState.description,
            lastExercise: 0
        }

        const result = await DayService.insertOne(db, entity);

        // Сохраняем изображение при удачной записи в BD.
        if(result && typeof dayState.img === 'string') {
            await ImageService.saveImage({
                folderForSave: 'myImage', 
                pathToFile: dayState.img, 
                saveFileName: nameForSaveImage
            });
        }

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
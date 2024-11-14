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

        if(!dayState.img.extension) return console.error('createDay() => Нет расширения.');;

        // Задаем имя для изображения.
        let nameForSaveImage: string = ImageService.getNameForImage(dayState.img.extension);

        // Формируем обьект сушности для записи в таблицу Day.
        const entity: DayDTO = {
            id: 0,
            queue: 0,
            img: nameForSaveImage,
            date: '',
            title: dayState.title === t('[day]:addDay.title') ? '' : dayState.title,
            description: dayState.description === t('[day]:addDay.description') ? '' : dayState.description,
            lastExercise: 0
        }

        const result = await DayService.insertOne(db, entity);

        // Сохраняем изображение при удачной записи в BD.
        if(result && typeof dayState.img.path === 'string') {
            await ImageService.saveImage({
                folderForSave: 'myImage', 
                pathToFile: dayState.img.path, 
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
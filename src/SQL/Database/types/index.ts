import { TTables } from '@/constants/сonfiguration';


export type TExistingFolders = 'myImage';


/**
 * @param folderForSave Папка в которую сохраняем файл. Без '/' в конце. [example - 'someFolderName']
 * @param pathToFile Путь к копируемому файлу из памяти телефона в память приложения, передаем путь или если из памяти приложения, то число.
 */
export interface ISave {
    folderForSave?: TExistingFolders;
    /** 
     * `Первым элементом передаем: число или строку. Строку, если это путь к изображению в памяти телефона. Число, если это изображении из памяти App.` 
     * `Вторым элементом передаем: расширение файла, если это путь к файлу из памяти телефона.`
     */
    pathToFile: string | number;
}

export interface IUpdate {
     /** `Таблица в которой обновляем изображение.` */
    table: Extract<TTables, 'Day' | 'Exercise' | 'Equipment'>;
     /** `ID записи в которой обновляем изображение.` */
    id: number;
     /** `Путь к изображений или его номер, если оно из App.` */
    pathToFile: string | number;
}


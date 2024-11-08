import { SQLiteDatabase } from "expo-sqlite";
import CONFIGURATION from '@/constants/сonfiguration';
import * as FileSystem from 'expo-file-system';
import Database, { ISave, TExistingFolders } from "../model/Database";
import type { IExportImage } from "@/source/img/day";


class ImageService {

    /**
     * `//* Сохранение изображения.`
     * @accept
     * @object {
     * @param folderForSave Папка в которую сохраняем файл. Без '/' в конце. [example - 'someFolderName']
     * @param pathToFile Путь к копируемому файлу из памяти телефона в память приложения.
     * @param saveFileName Имя сохроняемого файла. [example - '123.jpg']
     * @}
     * @return nameForSaveImage || false 
     */
    async saveImage(options: ISave): Promise<boolean> {
        try {
            const result = await Database.saveImg({...options});
            return result;
        } catch (error) {
            console.error('Error in DatabaseService.saveImage() >>>', error);
            return false;
        }
    }

    //* Получение всех изображений в папке. 
    async find(): Promise<string[] | undefined> {
        const pathTo = await Database.getPathToFolder('myImage');
        const arrNamesImg = await Database.getFilesFromFolder('myImage');

        let arrFullPathToImage: string[] = [];

        if(arrNamesImg && Array.isArray(arrNamesImg)) {
            arrNamesImg.forEach(item => {
                arrFullPathToImage.push(pathTo + item);
            });

            return arrFullPathToImage;
        } else {
            return undefined;
        }

    }

    //* Получение имени для сохроняемого изображения.
    getNameForImage(data: string): string {
        // Задаем имя для изображения.
        return new Date().getTime() + '.' + data.split('.').at(-1);
    }

}

export default new ImageService();


import { SQLiteDatabase } from "expo-sqlite";
import CONFIGURATION from '@/constants/сonfiguration';
import * as FileSystem from 'expo-file-system';
import Database, { ISave, TExistingFolders } from "../model/Database";
import type { IExportImage } from "@/source/img/day";
import { Asset } from "expo-asset";


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
            console.error('Error in ImageService.saveImage() >>>', error);
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

    /**
     * `Получение имени для сохроняемого изображения.`
     * @param extension расширение изображения (.jpg и т.д.)
     */
    getNameForImage(extension: string): string {
        // Задаем имя для изображения.
        return new Date().getTime() + '.' + extension;
    }

    /**
     * `Получение пути к изображению.`
     */
    async getPathToImage(data: string): Promise<string> {
        // Проверяем, это путь или название файла, если изображение выбрано из библиотеке App, то имя будет как число + расширение файла > "12.jpg"
        const partOne = data.split('.')[0];
        // Проверка, является ли первая састь имени числом, если да то изображение выбрано из App
        if(partOne && !isNaN(Number(partOne))) {
            const assetObj = Asset.fromModule(Number(partOne));
            await assetObj.downloadAsync();
            const assetPath = assetObj.localUri || assetObj.uri;
            console.log('assetPath = ', assetPath);
            return assetPath;
        } else {
            return data;
        }
    }

}

export default new ImageService();


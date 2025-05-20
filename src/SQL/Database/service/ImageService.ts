import * as FileSystem from 'expo-file-system';
import Database from "../model/Database";
import { ISave, IUpdate } from "../types";
import { Asset } from "expo-asset";
import DayService from '@/SQL/Day/service/DayService';
import ExerciseService from '@/SQL/Exercise/service/ExerciseService';
import EquipmentService from '@/SQL/Equipment/service/EquipmentService';
import { SQLiteDatabase } from 'expo-sqlite';
import { neverCheck } from '@/helpers/neverCheck';


class ImageService {

    /**
     * `//* Запись изображения в память приложения.`
     * @param [folderForSave = 'myImage'] ? Папка в которую сохраняем файл. Без '/' в конце.
     * @param pathToFile Путь к копируемому файлу из памяти телефона в память приложения.
     */
    async save(options: ISave): Promise<string | undefined> {
        try{

             /** `Путь к папке с изображениями.` */
            const pathToFolder = await Database.getPathToFolder(options.folderForSave  ?  options.folderForSave : 'myImage');
            if(!pathToFolder) throw new Error('Путь к папке с изображениями не получен.');

             // Если передано изображение из памяти телефона.
            if(typeof options.pathToFile === 'string') {
                 /** `Имя сохраняемого изображения.` */
                const saveFileName = this.getNameForSaveImage(options.pathToFile.split('.').at(-1) ?? 'jpg');
                 // Копируем файл из(from) в(to).
                await FileSystem.copyAsync({from: options.pathToFile, to: pathToFolder + saveFileName});
                 // Возврат пути к изображению.
                return pathToFolder + saveFileName;
            }

             // Если передано изображение из памяти App.
            if(typeof options.pathToFile === 'number') {
                const asset = Asset.fromModule(options.pathToFile);
                 // Загружаем файл.
                await asset.downloadAsync();
                 /** `Имя сохраняемого изображения.` */
                const saveFileName = this.getNameForSaveImage(asset.type);
                 // Копируем файл из(from) в(to).
                await FileSystem.copyAsync({from: asset.localUri || asset.uri, to: pathToFolder + saveFileName});
                 // Возврат пути к изображению.
                return pathToFolder + saveFileName;
            }
            console.info('File saved!');
        } catch(error) {
            console.error('Error in [ImageService.saveImage] >>> ', error);
        }
    }

    async update(db: SQLiteDatabase, options: IUpdate) {
        try {
        
            if(options.table === 'Day') {
                const result = await DayService.findById(db,options.id);
                if(!result) return null;
                const imgOldName = result.img;
                const imgNewName = await this.save({pathToFile: options.pathToFile});
                //await DayService.
                
                return;
            }
        } catch (error) {
            console.error('Error in [ImageService.update] >>>', error);
        }
    }

    //* Получение всех изображений в папке. 
    async find(): Promise<string[] | undefined> {
        try {
            const arrNamesImg = await Database.getFilesFromFolder('myImage');
            return arrNamesImg && Array.isArray(arrNamesImg) ? arrNamesImg : undefined;
        } catch (error) {
            console.error('Error in [ImageService.find] >>>', error);
        }
    }

    /**
     * `Получение имени для сохроняемого изображения.`
     * @param extension расширение изображения (.jpg и т.д.)
     */
    getNameForSaveImage(extension: string): string {
        // Задаем имя для изображения.
        return new Date().getTime() + '.' + extension;
    }

    /**
     * `Получение пути к изображению.`
     */
    async getPathToImage(data: string): Promise<string | undefined> {
        try {
            // Проверяем, это путь или название файла, если изображение выбрано из библиотеке App, то имя будет как число + расширение файла > "12.jpg"
            const partOne = data.split('.')[0];
            // Проверка, является ли первая састь имени числом, если да то изображение выбрано из App
            if(partOne && !isNaN(Number(partOne))) {
                const assetObj = Asset.fromModule(Number(partOne));
                await assetObj.downloadAsync();
                const assetPath = assetObj.localUri || assetObj.uri;
                return assetPath;
            } else {
                return data;
            }
        } catch (error) {
            console.error('Error in [DatabaseService.getPathToImage] >>>', error);
        }
    }

}

export default new ImageService();


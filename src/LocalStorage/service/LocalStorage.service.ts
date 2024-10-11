import AsyncStorage  from '@react-native-async-storage/async-storage';
import { LocalStorageDTO, TLanguage, TkeyLocalStorageDTO } from '../model/LocalStorage';


interface ILocalStorage {
    getChoiceLanguage(): Promise<LocalStorageDTO['ChoiceLanguage']>;
    setChoiceLanguage(language: TLanguage): Promise<void>;
    removeChoiceLanguage(): Promise<void>;
}


class LocalStorage implements ILocalStorage {

    /**
     * `//* Возврат выбранного языка.`
     */
    async getChoiceLanguage() {
        return await AsyncStorage.getItem('ChoiceLanguage') as LocalStorageDTO['ChoiceLanguage'];
    }

    /**
     * `//* Установка выбраного языка.`
     */
    async setChoiceLanguage(language: TLanguage) {
        const key: TkeyLocalStorageDTO = 'ChoiceLanguage';
        await AsyncStorage.setItem(key, language);
    }

    /**
     * `//* Удаление выбраного языка.`
     */
    async removeChoiceLanguage() {
        const key: TkeyLocalStorageDTO = 'ChoiceLanguage';
        await AsyncStorage.removeItem(key);
    }
}

export default new LocalStorage();
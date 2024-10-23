import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { common_en, common_ru } from "./translations/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { button_en, button_ru } from './translations/button';
import { alert_and_toast_en, alert_and_toast_ru } from './translations/alert_and_toast';


const STORE_LANGUAGE_KEY = "ChoiceLanguage";


const languageDetectorPlugin = {
    type: "languageDetector",
    async: true,
    init: () => { },
    detect: async function (callback: (lang: string) => void) {
        try {
            // get stored language from Async storage
            // put your own language detection logic here
            await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
                if (language) {
                    //if language was stored before, use this language in the app
                    return callback(language);
                } else {
                    //if language was not stored yet, use english
                    return callback("English");
                }
            });
        } catch (error) {
            console.log("Error reading language", error);
        }
    },
    cacheUserLanguage: async function (language: string) {
        try {
            //save a user's language choice in Async storage
            //await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
        } catch (error) { }
    },
};


const resources = {
    English: {
        translation: common_en,
        button: button_en,
        alert_and_toast: alert_and_toast_en
    },
    Russian: {
        translation: common_ru,
        button: button_ru,
        alert_and_toast: alert_and_toast_ru
    },
};

const ns = ['translation', 'button', 'alert_and_toast'];


i18n.use(initReactI18next)
    .use(languageDetectorPlugin as any)
    .init({
            resources,
            ns,
            defaultNS: 'translation',
            compatibilityJSON: 'v3',
            // fallback language is set to english
            fallbackLng: "English",
            interpolation: {
                escapeValue: false,
            },
        }
    );


export default i18n;
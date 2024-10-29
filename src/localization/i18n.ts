import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { common_en, common_ru } from "./translations/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { button_en, button_ru } from './translations/button';
import { alert_and_toast_en, alert_and_toast_ru } from './translations/alert_and_toast';
import { day_en, day_ru } from './translations/[day]';
import { exercise_en, exercise_ru } from './translations/[exercise]';


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
            console.error("Error reading language", error);
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
        'common': common_en,
        'button': button_en,
        'alert_and_toast': alert_and_toast_en,
        '[day]': day_en,
        '[exercise]': exercise_en
    },
    Russian: {
        'common': common_ru,
        'button': button_ru,
        'alert_and_toast': alert_and_toast_ru,
        '[day]': day_ru,
        '[exercise]': exercise_ru
    }
};

const ns = ['common', 'button', 'alert_and_toast', '[day]', '[exercise]'];


i18n.use(initReactI18next)
    .use(languageDetectorPlugin as any)
    .init({
            resources,
            ns,
            defaultNS: 'common',
            compatibilityJSON: 'v3',
            // fallback language is set to english
            fallbackLng: "English",
            interpolation: {
                escapeValue: false,
            },
        }
    );


export default i18n;

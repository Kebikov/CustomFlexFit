import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ru } from "./translations";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        translation: en,
    },
    Russian: {
        translation: ru,
    },
};

i18n.use(initReactI18next)
    .use(languageDetectorPlugin as any)
    .init({
            resources,
            compatibilityJSON: 'v3',
            // fallback language is set to english
            fallbackLng: "English",
            interpolation: {
                escapeValue: false,
            },
        }
    );

// i18n.use(initReactI18next)
//     .use(languageDetectorPlugin as any)
//     .init({
//             resources: {
//                 ru: {

//                 },
//                 en: {

//                 }
//             },
//             compatibilityJSON: 'v3',
//             // fallback language is set to english
//             fallbackLng: "English",
//             interpolation: {
//                 escapeValue: false,
//             },
//         }
//     );


export default i18n;
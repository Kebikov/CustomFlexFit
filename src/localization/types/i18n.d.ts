import i18next from "i18next";
import { ILng_alert_and_toast } from "../translations/alert_and_toast/types/alert_and_toast.type";
import { ILng_Button } from "../translations/button/types/button.type";


declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            button: ILng_Button,
            alert_and_toast: ILng_alert_and_toast,
            translation: {
                language: string;
                general: {
                    title: string;
                    description: string;
                },
                page: {
                    listDay: {
                        title: string;
                        description: string;
                        button: string;
                    }
                },
                folder: {
                    day: {
                        guide: {
                            title: string;
                            description: string;
                            button: string;
                            step1: string; 
                            step2: string;
                            step3: string;
                        },
                        addDay: {
                            pageTitle: string;
                            title: string;
                            description: string;
                            addExistingnBackground: string;
                            buttonChoiceBackground: string;
                            placeholderInputTitle: string;
                            placeholderInputDescription: string;
                        },
                        modalAddDay: {
                            description: string;
                        }
                    },
                    exercise: {
                        addExercise: {
                            title: string;
                        }
                    }
                }
            }
        }
    }
}
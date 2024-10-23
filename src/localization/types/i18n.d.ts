import i18next from "i18next";

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
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
                },
                alert_and_toast: {
                    imgNotSelect: string;
                    notTitle: string;
                    notDescription: string;
                },
                button: {
                    create: string;
                }
            }
        }
    }
}
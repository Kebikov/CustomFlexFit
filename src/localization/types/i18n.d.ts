import i18next from "i18next";

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            translation: {
                language: string;
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
                        }
                    }
                }
            }
        }
    }
}
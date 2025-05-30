

export type AppRouterTypes = {
    '/': undefined;

    '/choiceLanguage': undefined;
    '/settingsScreen': undefined;
    '/modal': undefined;

    //: exercise 
    '/exercise/addExercise': undefined;
    '/exercise/[id]': {dayExercise: number};
    '/exercise/modal': undefined;
    '/exercise/modalAddImageExercise': undefined;
    '/exercise/addSet': {sendIndex: string};

    //: Equipment
    '/equipment': undefined;
    '/equipment/addEquipment': undefined;
    '/equipment/selectImgEquipment': undefined;
    
    //: day 
    '/day/guide': undefined; // описание как создавать тренировочный день
    '/day/addDay': undefined; // создание тренировочного дня
    '/day/listDay': undefined; // список всех тренировочных дней
    '/day/modalAddBackground': undefined;

    //: test 
    '/test/showImgInFolder': undefined; // страница с сохранеными изображениями в папке
};



export type TTypeToString<T> = {
    [key in keyof T]: 
        T[key] extends number 
        ? 
        string : 

        T[key] extends number | undefined 
        ? 
        string | undefined : 

        T[key] extends number | null
        ? 
        string : 

        T[key] extends string | undefined 
        ?
        string :

        T[key] extends string | null
        ?
        string :

        T[key];
};





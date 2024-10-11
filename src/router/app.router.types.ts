

export type AppRouterTypes = {
    '/': undefined;
    '/listDay': undefined;
    '/choiceLanguage': undefined;
    '/settingsScreen': undefined;
    '/exercise/[id]': {dayExercise: number};
    '/modal': undefined;
    '/exercise/modal': undefined;
    '/addDay': undefined;

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





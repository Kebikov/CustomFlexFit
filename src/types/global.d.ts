declare global {
    namespace App {
         /** `Удяляет ID и следит, чтобы его точно не было.` */
        type StrictOmit<T, K extends keyof T> = Omit<T, K> & {[P in K]?: never};

        /** 
          * `Все свойства необязательные, кроме id.` 
          */
        type PartialExceptId<T extends {id: number}> = 
            { 
                [K in keyof T as K extends 'id' ? never : K]?: T[K]
            }
            & 
            {
                id: number
            }
    }

    interface Console {
        cleaning: () => void;
    }
}


export {}
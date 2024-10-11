export type TLanguage = 'English' | 'Russian';

export interface LocalStorageDTO {
    ChoiceLanguage: TLanguage | null;
}

export type TkeyLocalStorageDTO = keyof LocalStorageDTO;




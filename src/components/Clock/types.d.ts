export type TTypeClock = 'hours/minutes' | 'minutes_30/seconds';

export type IStateDataClock = {
    [key: string]: {
        one: number;
        two: number;
    }
}

export interface IClock {
    //* State для контроля открытия закрытия модального окна.
    /** `Уникальный id для элемента на странице.` */
    id: string;
    /** `State > id Clock который надо показать.` */
    idShowClock: string;
    /** `SetStateAction > id Clock который надо показать.` */
    setIdShowClock: React.Dispatch<React.SetStateAction>;
    //* State для установки выбранного значения.
    /** `State > Обьект с выбранным временем.` */
    selectedData:  IStateDataClock;
    /** `SetStateAction > Установка выбранного времени.` */
    setSelectedData: React.Dispatch<React.SetStateAction< IStateDataClock >>;
    //* Настройка для отображения данных.
    /** `? Предустановки для отображения чисел [default: 'hours/minutes']` */
    typeClock?: TTypeClock | IArraysForClock;
    //* Style 
    /** `? Цвет фона часов. [default: COLOR_ROOT.BACKGROUND]` */
    colorBody?: string;
    /** `? Цвет фона нажней кнопки. [default: COLOR_ROOT.BACKGROUND]` */
    colorButton?:string;
    /** `? Цвет текста. [default: 'white']` */
    colorText?: string;
    /** `? Цвет линии между часами и кнопкой. [default: 'rgba(255, 255, 255, 0.3)']` */
    colorLine?: string;
    /** `? Использовать ли портал, полезно для работы в модальных окнах. [default: true]` */
    isUsePortal?: boolean;
    /** `? Тип отображения, как часы(2 цыфры) или одна цыфра.` */
    typeOfDisplay?: 'one number' | 'clock';
}

export type TPositions = {
    num: string;
    top: number;
    heightElement: number;
};

export interface INameAndNote {
    name: string;
    note: string;
}

export interface IWeightState {
    /** `ID используемого грифа.` */
    barbell: number;
    /** `Массив ID блинов на первой стороне.` */
    plate_1: number[];
    /** `Массив ID блинов на второй стороне.` */
    plate_2: number[];
}

export interface IArraysForClock {
    one: {
        /** `Первое число в установке времени.` */
        total: number;
        /** `Второе число в установке времени.` */
        step: number;
    };
    two: {
        /** `Значение последнего элемента.` */
        total: number;
        /** `Шаг элемента.` */
        step: number;
    };
}

export interface IGetPositions {
    /** `Массив для добавления позиций.` */
    data: string[];
    /** `Высота одного элемента.` */
    heightElement: number; 
    /** `Смещение для центрирования.` */
    offset: number;
    /** `Дополнительная информация в консоль.` */
    info?: string;
}
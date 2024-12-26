interface IBaseClock {
    /** `State > Обьект с выбранным временем.` */
    selectedTime:  ITimeClock;
    /** `SetStateAction > Установка выбранного времени.` */
    setSelectedTime: React.Dispatch<React.SetStateAction<ITimeClock>>;
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
    /** `? Предустановки для отображения чисел [default: 'hours/minutes']` */
    typeClock?: 'hours/minutes' | 'minutes_30/seconds';
    /** `? Пользовательская установка отображения чисел, имеет приоритет перед typeClock.` */
    typeClockCustom?: IArraysForClock;
    /** `? Тип отображения, как часы(2 цыфры) или одна цыфра.` */
    typeOfDisplay?: 'one number' | 'clock';
}

interface IStateIdShowClock extends IBaseClock {
    /** `Id элемента.` */
    id: number;
    /** `State > id Clock который надо показать.` */
    idShowClock: number;
    /** `SetStateAction > id Clock который надо показать.` */
    setIdShowClock: React.Dispatch<React.SetStateAction<number>>;
}

interface IStateIdShowClock_never extends  IBaseClock {
    id?: never;
    idShowClock?: never;
    setIdShowClock?: never;
}

export type IClock = IStateIdShowClock | IStateIdShowClock_never



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
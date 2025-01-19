export interface ISwitcher {
     /** `Id для выбранного блока.` */
    id: number;
     /** `Функция обработки нажатия.` */
    onPressing: (id: number) => void;
     /** `Cостояние(вкл./выкл.).` */
    isEnabled: boolean;
     /** `Высота контейнера. [default = 33]` */
    height?: number;
     /** `Ширина контейнера. [default = 22]` */
    width?: number;
     /** `Диаметр круга.` */
    diameter?: number;
     /** `Отступ внутри контейнера. [default = 8]` */
    padding?: number;
     /** `Цвет в левом положении. [default = COLOR_ROOT.BUTTON_COLOR_RED]` */
    colorOff?: string;
     /** `Цвет в правом положении. [default = COLOR_ROOT.BUTTON_COLOR_GREEN]` */
    colorOn?: string;
     /** `Продолжительность анимации. [default = 200]` */
    animatedDuration?: number;
}
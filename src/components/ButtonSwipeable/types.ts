import { SharedValue } from "react-native-reanimated";
import { ViewProps } from "react-native";

export interface IButtonSwipeable extends ViewProps {
     /** Дочерний элемент оболочки. */
    children: JSX.Element | JSX.Element[];
     /** Количество кнопок под кнопкой. */
    totalButton: 1 | 2 | 3;

    //* Отступ от основной кнопки. 
     /** Отступ с верху. */
    marginTop?: number;

    //* Функции срабатываюшее при нажатии кнопок. 
     /** Функция обработываюшая нажатия на кнопку #1. */
    onPressButton1: () => void;
     /** Функция обработываюшая нажатия на кнопку #2. */
    onPressButton2?: () => void;
     /** Функция обработываюшая нажатия на кнопку #3. */
    onPressButton3?: () => void;
    /** Обрабатывать ли жесты свайпа для открытия. */
    isSwipe?: boolean;

    //* Параметры кнопок и иконок. 
     /** Цвет эконки. */
    iconColor?: string;
     /** Иконка кнопки #1. `default = ICON.EDIT_BTN` */
    iconForButton1?: number;
     /** Иконка кнопки #2. `default = ICON.COPY` */
    iconForButton2?: number;
     /** Иконка кнопки #3. `default = ICON.DEL_BTN` */
    iconForButton3?: number;
     /** Цвет кнопки 1. `default = COLOR_ROOT.BUTTON_COLOR_GREEN` */
    colorButton1?: string;
     /** Цвет кнопки 2. `default = COLOR_ROOT.BUTTON_COLOR_YELLOW` */
    colorButton2?: string;
     /** Цвет кнопки 3. `default = COLOR_ROOT.BUTTON_COLOR_RED` */
    colorButton3?: string;
     /** Отступ внутри кнопки для регулировки размера иконки внутри кнопки. `default = 23` */
    paddingInsideButton?: number;
     /** Радиус закругления блока. `default = 10` */
    borderRadiusButton?: number;
     /** Ширина одной кнопки. */
    widthOneButton?: number;
     /** Высота одной кнопки. */
    heightOneButton?: number;

    //* Переменные необходимые для определения активной кнопки и закрытия не активных. 
     /** Id кнопки. */
    idButton?: number;
     /** Id активной кнопки. */
    activeButtonIdSv?: SharedValue<number | undefined>;
}
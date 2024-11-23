export interface IButtonSwipeable {
    /** Дочерний элемент оболочки. */
    children: JSX.Element | JSX.Element[];
    /** Количество кнопок под кнопкой. */
    totalButton: 1 | 2 | 3;
    /** Функция обработываюшая нажатия на кнопку #1. */
    onPressButton1: () => void;
    /** Функция обработываюшая нажатия на кнопку #2. */
    onPressButton2?: () => void;
    /** Функция обработываюшая нажатия на кнопку #3. */
    onPressButton3?: () => void;
    /** Иконка кнопки #1. `default = ICON.EDIT_BTN` */
    iconForButton1?: number;
    /** Иконка кнопки #2. `default = ICON.COPY` */
    iconForButton2?: number;
    /** Иконка кнопки #3. `default = ICON.DEL_BTN` */
    iconForButton3?: number;
    /** Отступ внутри кнопки для регулировки размера иконки внутри кнопки. `default = 23` */
    paddingInsideButton?: number;
    /** Радиус закругления блока. `default = 10` */
    borderRadiusButton?: number;
    /** Цвет кнопки 1. `default = COLOR_ROOT.BUTTON_COLOR_GREEN` */
    colorButton1?: string;
    /** Цвет кнопки 2. `default = COLOR_ROOT.BUTTON_COLOR_YELLOW` */
    colorButton2?: string;
    /** Цвет кнопки 3. `default = COLOR_ROOT.BUTTON_COLOR_RED` */
    colorButton3?: string;
    /** Отступ с верху. */
    marginTop?: number;
    /** Цвет эконки. */
    iconColor?: string;
    /** Функция из DraggableFlatList, для обработки перемешения элемента. `default = undefined` */
    drag?: () => void;
    /** Булевое значение из DraggableFlatList, во время перемешения true. `default = undefined` */
    isActive?: boolean;
    /** Ширина одной кнопки. */
    widthOneButton?: number;
    /** Высота одной кнопки. */
    heightOneButton?: number;
}
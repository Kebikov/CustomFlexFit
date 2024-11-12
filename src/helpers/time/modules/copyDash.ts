import { tabObj, lines } from './dataForTable';
import {IlengthColumn, IOptions, IDashOption} from '../types';


/**
 * `Для состовления разделителя в зависимости от суммы максимальных значений длинны всех колокок таблицы.`
 * 
 * `В итоге получим строку вида "-----", длинной всей таблицы.`
 */
export function copyDash(
    columnLength: IlengthColumn[]
): {
    dashUp: string;
    dashCenter: string;
    dashBottom: string;
} {

    const getDash = (option: IDashOption) => {
        let dash: string = option.start;
        /**
         * `Дополнительная длинна к линии, для компенсации длинны строки, котору мы задаем дополнительными отступами.`
         */
        const lenghtPlus = tabObj.start.length + tabObj.end.length;

        columnLength.forEach((item, index) => {
            /**
             * `Полная длинна строки, сама строка + добавленые отступы.`
             */
            const fullLengthColumn = item.length + lenghtPlus;
            for(let i = 0; i <= fullLengthColumn; i++) {
                if(i === fullLengthColumn) {
                    // если это последний столбец, добавляем угол
                    if(index === columnLength.length - 1) {
                        dash += option.end;
                    } else {
                        dash += option.gaps;
                    }
                    
                } else {
                    dash += lines.horizon;
                }
            }
        })
        return dash;
    }

    return {
        dashUp: getDash({start: lines.angleTopLeft, gaps: lines.connectionTop, end: lines.angleTopRight}),
        dashCenter: getDash({start: lines.connectionLeft, gaps: lines.connectionCross, end: lines.connectionRight}),
        dashBottom: getDash({start: lines.angleBottomLeft, gaps: lines.connectionBottom, end: lines.angleBottomRight})
    };
}
import React, { FC } from 'react';
import { dayScreen } from '@/source/img/day';
import { SET_BACKGROUND } from '@/redux/slice/setup.slice';
import ScreenAddBackground from '@/components/ScreenAddBackground/ScreenAddBackground';



/**
 * @modal `Модальное окно для выбора фона для дня занятий.`
 */
const ModalAddBackground: FC = () => {
    
    return (
        <ScreenAddBackground
            imagesForChoice={dayScreen}
            height={132}
        />
    );
};


export default ModalAddBackground;
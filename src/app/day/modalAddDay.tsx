import React, { FC } from 'react';
import { dayScreen } from '@/source/img/day';
import { SET_BACKGROUND_FOR_DAY } from '@/redux/slice/setup.slice';
import ScreenAddBackground from '@/components/ScreenAddBackground/ScreenAddBackground';


/**
 * @modal `Модальное окно для выбора фона для дня занятий.`
 */
const ModalAddDay: FC = () => {

    return (
        <ScreenAddBackground
            imagesForChoice={dayScreen}
            height={132}
            SET_ACTIONS={SET_BACKGROUND_FOR_DAY}
        />
    );
};


export default ModalAddDay;
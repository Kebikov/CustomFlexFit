import React, { FC } from 'react';
import { exerciseImage } from '@/source/img/exercise';
import { SET_BACKGROUND_FOR_EXERCISE } from '@/redux/slice/setup.slice';
import ScreenAddBackground from '@/components/ScreenAddBackground/ScreenAddBackground';


/**
 * @modal `Модальное окно для выбора фона для занятий.`
 */
const ModalAddImageExercise: FC = () => {

    return (
        <ScreenAddBackground
            imagesForChoice={exerciseImage}
            height={180}
            SET_ACTIONS={SET_BACKGROUND_FOR_EXERCISE}
        />
    );
};


export default ModalAddImageExercise;
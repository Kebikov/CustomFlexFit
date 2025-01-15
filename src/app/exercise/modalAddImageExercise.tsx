import React, { FC } from 'react';
import { exerciseImage } from '@/source/img/exercise';
import ScreenAddBackground from '@/components/ScreenAddBackground/ScreenAddBackground';


/**
 * @modal `Модальное окно для выбора фона для занятий.`
 */
const ModalAddImageExercise: FC = () => {

    return (
        <ScreenAddBackground
            imagesForChoice={exerciseImage}
            height={170}
        />
    );
};


export default ModalAddImageExercise;
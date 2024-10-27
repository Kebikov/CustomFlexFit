import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import HeaderGoBack from '@/components/HeaderGoBack/HeaderGoBack';
import { COLOR_ROOT } from '@/constants/colors';

/**
 * @modal `Модальное окно для добавления повторов и времени отдыха у упражнения.`
 */
const modalAddRepsRest: FC = () => {

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <HeaderGoBack/>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
});

export default modalAddRepsRest;
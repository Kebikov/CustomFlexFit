import { StyleSheet, View } from 'react-native';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHookRouter } from '@/router/useHookRouter';
import { useAppSelector } from '@/redux/store/hooks';
import { useAppDispatch } from '@/redux/store/hooks';
import { SET_BACKGROUND_FOR_DAY } from '@/redux/slice/setup.slice';
import DayService from '@/SQLite/Day/service/DayService';
import { useSQLiteContext } from 'expo-sqlite';
import PickImage from '@/components/PickImage/PickImage';
import DayElement from '@/components/DayElement/DayElement';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import InputForAdd from '@/components/InputForAdd/InputForAdd';
import type { DayDTOomitId } from '@/SQLite/Day/DTO/DayDTO';
import WrapperImageBackground from '@/components/WrapperImageBackground/WrapperImageBackground';
import { logPage, logInfo } from '@/helpers/log/log';
import useCreateDay from '@/helpers/pages/AddDay/useCreateDay';


export type TdayState = Pick<DayDTOomitId, 'title' | 'description'> & {img: string | undefined};


/**
 * @page `Добавление тренировачного дня.`
 */
const AddDay: FC = () => {
    logPage.page('AddDay');

    const db = useSQLiteContext();
    const {t} = useTranslation(['common', 'button', '[day]']);
    const {appRouter} = useHookRouter();
    const dispatch = useAppDispatch();

    const [dayState, setDayState] = useState<TdayState>({
        img: undefined,
        title: t('[day]:addDay.title'), 
        description: t('[day]:addDay.description')
    });
    logInfo.info('dayState >>> ', dayState);

    const selectedBackgroundDay = useAppSelector(state => state.setupSlice.selectedBackgroundDay);

    const {createDay} = useCreateDay(db, dayState);

    useEffect(() => {
        selectedBackgroundDay ? setDayState(state => ({...state, img: selectedBackgroundDay})) : null;
    }, [selectedBackgroundDay]);

    useEffect(() => {
        return() => {
            dispatch(SET_BACKGROUND_FOR_DAY(''));
        }
    },[])

    return (
        <WrapperImageBackground
            imageBackground={require('@/source/img/imgForScreen/4.jpg')}
            overlayColor={'rgba(0, 0, 0, 0.5)'}
        >
            <View style={styles.containerWrapperScroll} >
                <Title text={t('[day]:addDay.pageTitle')} />
                <View style={styles.bodyForm} >

                    <DayElement
                        title={dayState.title}
                        description={dayState.description}
                        backgroundZero={true} 
                        img={dayState.img}
                        isShowShadow={selectedBackgroundDay ? true : false}
                    />

                    <PickImage
                        SET_ACTIONS={SET_BACKGROUND_FOR_DAY}
                        aspect={[28, 10]}
                        modalPath='/day/modalAddDay'
                        marginTop={30}
                    />

                    <InputForAdd<TdayState>
                        keyForState='title'
                        title={t('common:title')}
                        setState={setDayState} 
                        placeholder={t('[day]:addDay.placeholderInputTitle')}
                        maxLength={27}
                        marginTop={10}
                    />

                    <InputForAdd<TdayState>
                        keyForState='description'
                        title={t('common:description')}
                        setState={setDayState} 
                        placeholder={t('[day]:addDay.placeholderInputDescription')}
                        maxLength={35}
                        marginTop={10}
                    />

                    <ButtonGreen
                        text={t('button:create')}
                        handlePess={createDay}
                        marginTop={40}
                    />
                </View>
            </View>
        </WrapperImageBackground>
    );
};


const styles = StyleSheet.create({
    containerWrapperScroll: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyForm: {
        paddingHorizontal: 20,
        width: '100%'
    }
});


export default AddDay;



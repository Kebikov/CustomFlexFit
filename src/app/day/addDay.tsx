import { StyleSheet, ImageBackground, View } from 'react-native';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useConvertFont from '@/hook/useConvertFont';
import { useHookRouter } from '@/router/useHookRouter';
import { useAppSelector } from '@/redux/store/hooks';
import { useAppDispatch } from '@/redux/store/hooks';
import { SET_BACKGROUND_FOR_DAY } from '@/redux/slice/setup.slice';
import DatabaseService from '@/SQLite/Database/service/DatabaseService';
import DayService from '@/SQLite/Day/service/DayService';
import { useSQLiteContext } from 'expo-sqlite';
import Menu from '@/components/Menu/Menu';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import PickBackgroundForDay from '@/components/PickBackgroundForDay/PickBackgroundForDay';
import DayElement from '@/components/DayElement/DayElement';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import InputForAddDay from '@/components/InputForAddDay/InputForAddDay';
import type { DayDTOomitId } from '@/SQLite/Day/DTO/DayDTO';
import WrapperImageBackground from '@/components/WrapperImageBackground/WrapperImageBackground';


export interface IdayState {
    img: number | string | undefined;
    title: string;
    description: string;
}


/**
 * @page `Добавление тренировачного дня.`
 */
const AddDay: FC = () => {
    console.log('page > AddDay');

    const db = useSQLiteContext();
    const {t} = useTranslation(['common', 'button', '[day]']);
    const {appRouter} = useHookRouter();
    const dispatch = useAppDispatch();

    const [dayState, setDayState] = useState<IdayState>({
        img: undefined,
        title: t('[day]:addDay.title'), 
        description: t('[day]:addDay.description')
    });

    const selectedBackgroundDay = useAppSelector(state => state.setupSlice.selectedBackgroundDay);

    /**
     * `Создание дня тренировки.`
     */
    const createDay = async () => {
        // Задаем имя для изображения.
        let nameForSaveImage: string;
        if(typeof dayState.img === 'string') {
            nameForSaveImage = new Date().getTime() + '.' + dayState.img.split('.').at(-1);
        } else if(typeof dayState.img === 'number'){
            nameForSaveImage = String(dayState.img);
        } else {
            nameForSaveImage = '';
        }

        // Формируем обьект сушности для записи в таблицу Day.
        const entity: DayDTOomitId = {
            queue: 0,
            img: nameForSaveImage,
            date: '',
            title: dayState.title === t('[day]:addDay.title') ? '' : dayState.title,
            description: dayState.description === t('[day]:addDay.description') ? '' : dayState.description,
            lastExercise: 0
        }

        const result = await DayService.insertOne(db, entity);

        // Сохраняем изображение при удачной записи в BD.
        if(result && typeof dayState.img === 'string') {
            const resultSaveImage = await DatabaseService.saveImage({
                folderForSave: 'myImage', 
                pathToFile: dayState.img, 
                saveFileName: nameForSaveImage
            });
        }
        if(result) appRouter.replace('/exercise/addExercise');
    }

    useEffect(() => {
        selectedBackgroundDay ? setDayState(state => ({...state, img: selectedBackgroundDay})) : null;
        return() => {
            console.log('Page the AddDay unmount');
            dispatch(SET_BACKGROUND_FOR_DAY(''));
        }
    }, [selectedBackgroundDay]);

    return (
        <WrapperImageBackground
            imageBackground={require('@/source/img/imgForScreen/4.jpg')}
            overlayColor={'rgba(0, 0, 0, 0.5)'}
        >
            <View style={styles.containerWrapperScroll} >
                <Title text={t('[day]:addDay.pageTitle')} />

                <DayElement
                    title={dayState.title}
                    description={dayState.description}
                    backgroundZero={true} 
                    img={dayState?.img}
                    isShowShadow={selectedBackgroundDay ? true : false}
                />

                <PickBackgroundForDay 
                    setState={setDayState} 
                    SET_ACTIONS={SET_BACKGROUND_FOR_DAY}
                    aspect={[28, 10]}
                    modalPath='/day/modalAddDay'
                />

                <InputForAddDay<IdayState>
                    keyForState='title'
                    title={t('common:title')}
                    setDayState={setDayState} 
                    placeholder={t('[day]:addDay.placeholderInputTitle')}
                    maxLength={27}
                    marginTop={10}
                />

                <InputForAddDay<IdayState>
                    keyForState='description'
                    title={t('common:description')}
                    setDayState={setDayState} 
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
        </WrapperImageBackground>
    );
};


const styles = StyleSheet.create({
    containerWrapperScroll: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default AddDay;



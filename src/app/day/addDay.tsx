import { StyleSheet, View } from 'react-native';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/redux/store/hooks';
import { useAppDispatch } from '@/redux/store/hooks';
import { SET_BACKGROUND } from '@/redux/slice/setup.slice';
import { useSQLiteContext } from 'expo-sqlite';
import PickImage from '@/components/PickImage/PickImage';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import InputForAdd from '@/components/InputForAdd/InputForAdd';
import type { DayDTOomitId } from '@/SQL/Day/DTO/DayDTO';
import WrapperImageBackground from '@/components/WrapperImageBackground/WrapperImageBackground';
import useCreateDay from '@/utils/pages/addDay/useCreateDay';
import DayElementZero from '@/components/DayElementZero/DayElementZero';
import { logApp } from '@/utils/log';
import { DayDTO } from '@/SQL/Day/DTO/DayDTO';


export type TdayState = Omit<Pick<DayDTOomitId, 'title' | 'description' | 'img'>, 'img'> & {img: string | number | undefined};


/** `Добавление тренировачного дня.` */
const AddDay: FC = () => { logApp.page('AddDay')

    const db = useSQLiteContext();
    const {t} = useTranslation(['common', 'button', '[day]']);
    const dispatch = useAppDispatch();

    const [dayState, setDayState] = useState<TdayState>({
        img: undefined,
        title: t('[day]:addDay.title'), 
        description: t('[day]:addDay.description')
    });

    const background = useAppSelector(state => state.setupSlice.background);

    const {createDay} = useCreateDay(db, dayState);

    useEffect(() => {
        background ? setDayState(state => ({...state, img: background})) : null;
    }, [background]);

    useEffect(() => {
        return() => {
            dispatch(SET_BACKGROUND(undefined));
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

                    <DayElementZero
                        title={dayState.title}
                        description={dayState.description}
                        backgroundZero={true} 
                        img={dayState.img}
                        isShowShadow={background ? true : false}
                    />

                    <PickImage
                        aspect={[28, 10]}
                        path='/day/modalAddBackground'
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



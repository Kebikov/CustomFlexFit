import { FC, useCallback, useState, useEffect } from 'react';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import { Stack } from 'expo-router';
import { PortalProvider, PortalHost } from '@gorhom/portal';
import CONFIGURATION from '@/constants/сonfiguration';
import DBManagment from '@/SQLite/DBManagment';
import { useFonts } from 'expo-font';
import showAllTable from '@/SQLite/DBManagment/showAllTable';
import * as SplashScreen from 'expo-splash-screen';
import Days from '@/SQLite/days/modules/Days';
import Exercise from '@/SQLite/exercise/modules/Exercise';

SplashScreen.preventAutoHideAsync();

interface IMainLayout {
    children?: JSX.Element | JSX.Element[] | undefined;
}

export const MainLayout: FC<IMainLayout> = ({children}) => {

    const [loaded, error] = useFonts({
		Sport: require('@/source/fonts/BebasNeue.ttf')
	});


    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
            console.log(1);
          }
    },[loaded, error]);

    if (!loaded && !error) return null;

	return (
        <GestureHandlerRootView style={{flex: 1}} >
            <PortalProvider>
                <SQLiteProvider databaseName={CONFIGURATION.DB_NAME} onInit={migrateDbIfNeeded} >
                    <Provider store={store} >
                            <>
                                {children}
                            </>
                    </Provider>
                </SQLiteProvider>
            </PortalProvider>
        </GestureHandlerRootView>
	);
}

const IndexLayout = () => {

    return(
        <MainLayout>
            <Stack screenOptions={{headerShown: false}} >
                <Stack.Screen name='exercise/[id]' options={{animation: 'ios'}}/>
                <Stack.Screen name='settingsScreen' options={{animation: 'ios'}}/>
                <Stack.Screen name='index' options={{animation: 'ios'}}/>
            </Stack>
        </MainLayout>
    )
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
    try{
        const DATABASE_VERSION = 1;
        //* получаем версию BD
        let version = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
        //* если версия равна или больше чем DATABASE_VERSION, то ни чего не делаем
        if(version?.user_version === undefined) return;
        //if (version.user_version >= DATABASE_VERSION) return;
        //* если версия равна 0 значит она только что создана и можно заволняь ее начальными данными, если надо
        if(version.user_version === 0) {
            await db.withExclusiveTransactionAsync(async () => {
                // включени более эфективного режима работы BD
                await db.runAsync(`PRAGMA journal_mode = 'wal'`);
                await Days.createTable(db);
                await Exercise.createTable(db);
                // внесение начальных данных в таблицу Days
                await DBManagment.addDataStartInTableDays(db);
                // внесение начальных данных в таблицу Exercise
                await DBManagment.addDataStartInTableExercise(db);
            });
        }
        //* меняем версию базы данных
        await db.runAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    } catch(error) {
        console.error('Error in migrateDbIfNeeded >>> ', error);
        throw error;
    }
}

export default IndexLayout;




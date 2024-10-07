import { FC, useCallback, useState, useEffect } from 'react';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import { Stack } from 'expo-router';
import { PortalProvider, PortalHost } from '@gorhom/portal';
import CONFIGURATION from '@/constants/сonfiguration';
import DBManagment from '@/SQLite/database/service/database.service';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import dayService from '@/SQLite/day/service/day.service';
import exerciseService from '@/SQLite/exercise/service/exercise.service';
import databaseService from '@/SQLite/database/service/database.service';


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
        let version = await databaseService.getVersion(db);
        //* если версия равна или больше чем DATABASE_VERSION, то ни чего не делаем
        if(!version) return;
        //if (version.user_version >= DATABASE_VERSION) return;
        //* если версия равна 0 значит она только что создана и можно заволняь ее начальными данными, если надо
        if(version === 0) {
            await db.withExclusiveTransactionAsync(async () => {
                await databaseService.connectionModeWal(db);
                await dayService.createTable(db);
                await exerciseService.createTable(db);
                await dayService.addDataStartInTableDay(db);
                await exerciseService.addDataStartInTableExercise(db);
            });
        }
        //* меняем версию базы данных
        await databaseService.setVersion(db, DATABASE_VERSION);
    } catch(error) {
        console.error('Error in migrateDbIfNeeded >>> ', error);
        throw error;
    }
}

export default IndexLayout;




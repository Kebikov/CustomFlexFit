import { FC, useEffect } from 'react';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import { Stack, SplashScreen } from 'expo-router';
import { PortalProvider } from '@gorhom/portal';
import CONFIGURATION from '@/constants/сonfiguration';
import { useFonts } from 'expo-font';

import dayService from '@/SQLite/day/service/day.service';
import exerciseService from '@/SQLite/exercise/service/exercise.service';
import databaseService from '@/SQLite/database/service/database.service';
import { COLOR_ROOT } from '@/constants/colors';
import ExerciseLayout from './exercise/_layout';
import '@/localization/i18n';


SplashScreen.preventAutoHideAsync();


interface IMainLayout {
    children?: JSX.Element | JSX.Element[] | undefined;
}


export const MainLayout: FC<IMainLayout> = ({children}) => {
    
    const [loaded, error] = useFonts({
		'Sport': require('@/source/fonts/BebasNeue.ttf')
	});


    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);
    
    if (!loaded && !error) return null;
    
	return (
        <GestureHandlerRootView style={{flex: 1, backgroundColor: COLOR_ROOT.BACKGROUND}} >
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
                <Stack.Screen name='index' options={{animation: 'ios'}}/>
                <Stack.Screen name='settingsScreen' options={{animation: 'ios'}}/>
                <Stack.Screen name='choiceLanguage' options={{animation: 'ios'}}/>

                <Stack.Screen name="modal" options={{presentation: 'modal'}} />
                {/* folders */}
                <Stack.Screen name='exercise' options={{animation: 'ios'}}/>
                <Stack.Screen name='day' options={{animation: 'ios'}}/>
            </Stack>
        </MainLayout>
    )
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
    try{
        await databaseService.checkExistenceDataBase();
        const DATABASE_VERSION = 1;
        //* получаем версию BD
        let version = await databaseService.getVersion(db);
        
        //* если версия равна или больше чем DATABASE_VERSION, то ни чего не делаем
        if (version >= DATABASE_VERSION) return;
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








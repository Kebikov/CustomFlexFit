import { FC, useEffect } from 'react';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import CONFIGURATION from '@/constants/сonfiguration';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { COLOR_ROOT } from '@/constants/colors';
import { PortalProvider, PortalHost } from '@gorhom/portal';
import '@/localization/i18n';
import React from 'react';
//* SQLite
import DayService from '@/SQL/Day/service/DayService';
import ExerciseService from '@/SQL/Exercise/service/ExerciseService';
import DatabaseService from '@/SQL/Database/service/DatabaseService';
import EquipmentService from '@/SQL/Equipment/service/EquipmentService';
import Set_Equipment_Service from '@/SQL/REFERENCES/Set_Equipment/service/Set_Equipment_Service';
import Day_Exercise_Service from '@/SQL/REFERENCES/Day_Exercise/service/Day_Exercise_Service';
import SetService from '@/SQL/Set/service/SetService';
import dataEquipment from '@/data/equipment/dataEquipment';



DarkTheme.colors.background = COLOR_ROOT.BACKGROUND;

SplashScreen.preventAutoHideAsync();


interface IMainLayout {
    children?: JSX.Element | JSX.Element[] | undefined;
}


export const MainLayout: FC<IMainLayout> = ({children}) => {

    const [loaded, error] = useFonts({
        'Sport': require('@/source/fonts/BebasNeue.ttf'),
        'Sport200': require('@/source/fonts/Oswald/Oswald-ExtraLight.ttf'),
        'Sport300': require('@/source/fonts/Oswald/Oswald-Light.ttf'),
        'Sport400': require('@/source/fonts/Oswald/Oswald-Regular.ttf'),
        'Sport500': require('@/source/fonts/Oswald/Oswald-Medium.ttf'),
        'Sport600': require('@/source/fonts/Oswald/Oswald-SemiBold.ttf'),
        'Sport700': require('@/source/fonts/Oswald/Oswald-Bold.ttf')
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hide();
        }
    }, [loaded, error]);
    
    if (!loaded && !error) return null;

	return (
        <ThemeProvider value={DarkTheme} >
            <GestureHandlerRootView style={{flex: 1, backgroundColor: COLOR_ROOT.BACKGROUND}} >
                <PortalProvider>
                    <SQLiteProvider databaseName={CONFIGURATION.DB_Name} onInit={migrateDbIfNeeded} >
                        <Provider store={store} >
                                <PortalHost name='clock' />
                                <PortalHost name='InputOver' />
                                <>
                                    {children}
                                </>
                        </Provider>
                    </SQLiteProvider>
                </PortalProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
	);
}

const IndexLayout = () => {

    return(
        <MainLayout>
            <StatusBar translucent backgroundColor='transparent'/>
            <Stack 
                screenOptions={{
                    headerShown: false
                }} 
            >
                <Stack.Screen name='index' options={{animation: 'ios_from_left'}} />
                <Stack.Screen name='settingsScreen' options={{animation: 'ios_from_left'}} />
                <Stack.Screen name='choiceLanguage' options={{animation: 'ios_from_left'}} />

                <Stack.Screen name="modal" options={{presentation: 'modal'}} />
                {/* folders */}
                {/* <Stack.Screen name='exercise' options={{animation: 'ios_from_left'}} />
                <Stack.Screen name='day' options={{animation: 'ios_from_left'}} /> */}
            </Stack>
        </MainLayout>
    )
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
    try{
        await DatabaseService.checkExistenceDataBase();
        const DATABASE_VERSION = 1;
        //* получаем версию BD
        let version = await DatabaseService.getVersion(db);
        
        //* если версия равна или больше чем DATABASE_VERSION, то ни чего не делаем
        if (version && version >= DATABASE_VERSION) return;
        //* если версия равна 0 значит она только что создана и можно заволняь ее начальными данными, если надо
        if(version === 0) {
            await db.withExclusiveTransactionAsync(async () => {
                await DatabaseService.connectionModeWal(db);

                await DayService.createTable(db);
                await ExerciseService.createTable(db);
                await SetService.createTable(db);
                await EquipmentService.createTable(db);

                await EquipmentService.initializeDatabase(db, dataEquipment);

                await Day_Exercise_Service.createTable(db);
                await Set_Equipment_Service.createTable(db);

            });
        }
        //* меняем версию базы данных
        await DatabaseService.setVersion(db, DATABASE_VERSION);
    } catch(error) {
        console.error('Error in migrateDbIfNeeded >>> ', error);
        throw error;
    }
}

export default IndexLayout;








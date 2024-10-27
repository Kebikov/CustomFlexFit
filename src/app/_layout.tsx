import { FC, useEffect } from 'react';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import { Stack, SplashScreen } from 'expo-router';
import CONFIGURATION from '@/constants/сonfiguration';
import { useFonts } from 'expo-font';
import { COLOR_ROOT } from '@/constants/colors';
import { PortalProvider, PortalHost } from '@gorhom/portal';
import '@/localization/i18n';
//* SQLite
import DayService from '@/SQLite/Day/service/DayService';
import ExerciseService from '@/SQLite/Exercise/service/ExerciseService';
import DatabaseService from '@/SQLite/Database/service/DatabaseService';
import EquipmentService from '@/SQLite/Equipment/service/EquipmentService';
import ListService from '@/SQLite/List/service/ListService';
import List_Equipment_Service from '@/SQLite/REFERENCES/List_Equipment/service/List_Equipment_Service';
import RepsRestService from '@/SQLite/RepsRest/service/RepsRestService';



SplashScreen.preventAutoHideAsync();


interface IMainLayout {
    children?: JSX.Element | JSX.Element[] | undefined;
}


export const MainLayout: FC<IMainLayout> = ({children}) => {
    
    // const [loaded, error] = useFonts({
	// 	'Sport': require('@/source/fonts/BebasNeue.ttf')
	// });

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
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);
    
    if (!loaded && !error) return null;
    
	return (
        <GestureHandlerRootView style={{flex: 1, backgroundColor: COLOR_ROOT.BACKGROUND}} >
            <PortalProvider>
                <SQLiteProvider databaseName={CONFIGURATION.DB_Name} onInit={migrateDbIfNeeded} >
                    <Provider store={store} >
                            <PortalHost name='clock' />
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
                <Stack.Screen name='index' options={{animation: 'ios'}} />
                <Stack.Screen name='settingsScreen' options={{animation: 'ios'}} />
                <Stack.Screen name='choiceLanguage' options={{animation: 'ios'}} />

                <Stack.Screen name="modal" options={{presentation: 'modal'}} />
                {/* folders */}
                <Stack.Screen name='exercise' options={{animation: 'ios'}} />
                <Stack.Screen name='day' options={{animation: 'ios'}} />
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
        if (version >= DATABASE_VERSION) return;
        //* если версия равна 0 значит она только что создана и можно заволняь ее начальными данными, если надо
        if(version === 0) {
            await db.withExclusiveTransactionAsync(async () => {
                await DatabaseService.connectionModeWal(db);

                await DayService.createTable(db);
                await ExerciseService.createTable(db);
                await ListService.createTable(db);
                await EquipmentService.createTable(db);
                await List_Equipment_Service.createTable(db);
                await RepsRestService.createTable(db);

                //await dayService.addDataStartInTableDay(db);
                //await exerciseService.addDataStartInTableExercise(db);
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








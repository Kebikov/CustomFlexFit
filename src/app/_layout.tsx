import { FC, Suspense } from 'react';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/redux/store/store';
import { Stack } from 'expo-router';
import { PortalProvider, PortalHost } from '@gorhom/portal';
import COMMAND_SQL from '@/SQLite/CommandSQL/commandSQL';
import CONFIGURATION from '@/constants/сonfiguration';
import DBManagment from '@/SQLite/DBManagment';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Text } from 'react-native';
import showAllTable from '@/SQLite/DBManagment/showAllTable';



interface IMainLayout {
    children?: JSX.Element | JSX.Element[] | undefined;
}

export const MainLayout: FC<IMainLayout> = ({children}) => {

    const [fontsLoaded] = useFonts({
		Sport: require('@/source/fonts/BebasNeue.ttf')
	});

    if (!fontsLoaded) return null;

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
        console.log(version);
        //* если версия равна или больше чем DATABASE_VERSION, то ни чего не делаем
        if(version?.user_version === undefined) return;
        //if (version.user_version >= DATABASE_VERSION) return;
        //* если версия равна 0 значит она только что создана и можно заволняь ее начальными данными, если надо
        if(version.user_version === 0) {
            // await db.withExclusiveTransactionAsync(async () => {
                console.log('RUN 1');
                // включени более эфективного режима работы BD
                await db.runAsync(`PRAGMA journal_mode = 'wal'`);
                console.log(1);
                // Создание таблицы с днями.
                await db.runAsync(COMMAND_SQL.createTableDays);
                console.log(2);
                // Создание таблицы с упражнениями.
                await db.runAsync(COMMAND_SQL.createTableExercise);
                console.log(3);
                console.log('Show = ', await showAllTable(db, 'get'));
                // внесение начальных данных в таблицу Days
                await DBManagment.addDataStartInTableDays(db);
                console.log(4);
                // внесение начальных данных в таблицу Exercise
                await DBManagment.addDataStartInTableExercise(db);
                console.log(5);
                console.log('готово');
            // });
        }
        //* меняем версию базы данных
        await db.runAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    } catch(error) {
        console.error('Error in migrateDbIfNeeded >>> ', error);
        throw error;
    }
}

export default IndexLayout;




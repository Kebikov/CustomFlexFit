import { FC } from 'react';
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
                <SQLiteProvider databaseName={CONFIGURATION.DB_NAME} onInit={migrateDbIfNeeded}>
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
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='sql' options={{animation: 'ios'}}/>
                <Stack.Screen name='index' options={{animation: 'ios'}}/>
            </Stack>
        </MainLayout>
    )
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    //* получаем версию BD
    let version = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
    console.log('SQLiteProvider: ', version?.user_version);
    //const result: boolean = await deleteData();
	//const result: boolean = await createData();
    //* если версия равна или больше чем DATABASE_VERSION, то ни чего не делаем
    if(version?.user_version === undefined) return;
    //if (version.user_version >= DATABASE_VERSION) return;
    //* если версия равна 0 значит она только что создана и можно заволняь ее начальными данными, если надо
    if(version.user_version === 0) {
        db.withTransactionAsync(async () => {
            await db.runAsync(`PRAGMA journal_mode = 'wal'`);

            // Создание таблицы с днями.
            await db.runAsync(COMMAND_SQL.createTableDays);
            // Создание таблицы с упражнениями.
            await db.runAsync(COMMAND_SQL.createTableExercise);

            // внесение начальных данных в таблицу Days
            await DBManagment.addDataStartInTableDays();
            // внесение начальных данных в таблицу Exercise
            await DBManagment.addDataStartInTableExercise(db);
            console.log('готово');
        });
    }

    //* меняем версию базы данных
    await db.runAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export default IndexLayout;




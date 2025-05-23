import { StyleSheet, Image, Pressable } from 'react-native';
import ICON from '@/source/icon';
import { useSQLiteContext } from 'expo-sqlite';
import { consoleTable } from 'react-native-console-table';
import DatabaseService from '@/SQL/Database/service/DatabaseService';
import DayService from '@/SQL/Day/service/DayService';
import EquipmentService from '@/SQL/Equipment/service/EquipmentService';
import SetService from '@/SQL/Set/service/SetService';
import ExerciseService from '@/SQL/Exercise/service/ExerciseService';


/**
 * @component `Вывод в консоль данных всех таблиц SQL.`
 */
const ButtonTablesSQL = () => {

    const db = useSQLiteContext();

    const onPress = async () => {
        // "Day"
        //"Exercise"
        //"Set"
        // "Equipment"
        console.cleaning();
        await DatabaseService.getTable.log(db);
        consoleTable(await DayService.find(db), {title: 'Day', selectionTitle: 'background_green', selectionHeader: 'background_magenta'});
        consoleTable(await ExerciseService.find(db), {title: 'Exercise', selectionTitle: 'background_green', selectionHeader: 'background_magenta'});
        consoleTable(await SetService.find(db), {title: 'Set', selectionTitle: 'background_green', selectionHeader: 'background_magenta'});
        consoleTable(await EquipmentService.find(db), {title: 'Equipment', selectionTitle: 'background_green', selectionHeader: 'background_magenta'});
    }

    return (
        <Pressable 
            onPress={onPress}
            style={styles.container} 
        >
            <Image 
                style={styles.image}
                source={ICON.SETTINGS_ICON}
            />
        </Pressable>
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 60,
        height: 60,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        zIndex: 10000,
        padding: 10,
        borderRadius: 10,
        opacity: .3
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    }
});


export default ButtonTablesSQL;
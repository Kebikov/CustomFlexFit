import { View, Text, StyleSheet, Button } from 'react-native';
import React, { FC } from 'react';

import backupDB from '@/SQL/Database/Backup/backupDB';
import { useAppDispatch } from '@/redux/store/hooks';
//* component
import TopMenu from '@/components/TopMenu/TopMenu';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import Sql from '@/components/Sql/Sql';


/** @page `//-- Экран с настройками приложения.` */
const SettingsScreen: FC = () => {

    const dispatch = useAppDispatch();

    return (
        <WrapperScroll>
            <TopMenu/>
            <View style={styles.main} >
                <Sql/>

                {/* <Text style={styles.text} >Backup Data</Text>
                <View style={styles.buttonsBox} >
                    <View style={styles.button} >
                        <Button title='save data' color={COLOR_ROOT.LIME_70} onPress={() => backupDB()}/>
                    </View>
                    <View style={styles.button} >
                        <Button 
                            title='load data' 
                            color={COLOR_ROOT.LIME_70} 
                            onPress={async () => {
                                    await loadDb();
                                    dispatch(setSliceIsUpdateToggle());
                                }
                            }
                        />
                    </View> */}

                {/* </View> */}
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    buttonsBox: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 50
    },
    button: {
        width: 100
    }
});

export default SettingsScreen;
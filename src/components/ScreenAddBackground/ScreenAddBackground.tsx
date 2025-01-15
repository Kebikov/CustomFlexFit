import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { FlatList } from 'react-native-gesture-handler';
import Description from '@/components/Description/Description';
import { useTranslation } from 'react-i18next';
import ItemForChoiceBackground from '@/components/ItemForChoiceBackground/ItemForChoiceBackground';
import HeaderGoBack from '../HeaderGoBack/HeaderGoBack';
import WrapperScroll from '../WrapperScroll/WrapperScroll';
import type { IExportImage } from '@/source/img/day';


interface IScreenAddBackground {
    imagesForChoice: IExportImage[];
    height: number;
}


/**
 * @modal `Экран для выбора фона для дня занятий.`
 * @param imagesForChoice Массив изображений из которых выбираем.
 * @param height Высота одного изображения.
 */
const ScreenAddBackground: FC<IScreenAddBackground> = ({
    imagesForChoice,
    height
}) => {
    
    const {t} = useTranslation(['[day]']);
    const [selectImg, setSelectImg] = useState<string | number | undefined>(undefined);
    
    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
            isScrollEnabled={false}
        >
            <HeaderGoBack/>
        
            <View style={{alignItems: 'flex-start', width: '100%', marginTop: 60, paddingHorizontal: 20}} >
                <Description text={t('[day]:modalAddDay.description')} />
            </View>
            

            <View style={styles.container} >

                <FlatList
                    style={{width: '100%', marginTop: 10}}
                    contentContainerStyle={{gap: 10, paddingBottom: 20, paddingHorizontal: 20}}

                    data={imagesForChoice}
                    renderItem={({item}) => (
                        <ItemForChoiceBackground 
                            imgObj={item} 
                            selectImg={selectImg} 
                            setSelectImg={setSelectImg} 
                            height={height} 
                        />
                    )}
                    keyExtractor={item => String(item.source)}

                    ListEmptyComponent={<View><Text style={{color: 'white'}}>Нет элементов.</Text></View>}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_ROOT.BACKGROUND
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ScreenAddBackground;
import React, { FC, useEffect, useState } from 'react';
import DayService from '@/SQL/Day/service/DayService';
import DayElement from '@/components/DayElement/DayElement';
import WrapperScroll from '../../components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import { useSQLiteContext } from 'expo-sqlite';
import type { DayDTO } from '@/SQL/Day/DTO/DayDTO';
import DragFlatList from '@/components/DragFlatList/DragFlatList';
import HelperUtils from '@/utils/HelperUtils';


/** `Страница с днями занятий.` */ 
const ListDay: FC = () => {
    const db = useSQLiteContext();
    /**
     * @param stateDays Массив с данными дней.
     */
    const [stateDays, setStateDays] = useState<Array<DayDTO> | []>([]);
    console.log(JSON.stringify( stateDays, null, 2));
    const render = (item: DayDTO) => <DayElement day={item} key={item.id} />
    /** 
      * `Высота одного элемента в DragFlatList.` 
      * */
    const elementHeight = 140;

    useEffect(() => {
        (async () => {
            let data: Array<DayDTO> = await DayService.find(db);
            setStateDays(HelperUtils.sortByQueue(data));
        })();
    },[]);

    useEffect(() => {
        return () => {
            (async () => {
                await DayService.findByIdAndUpdate(db, HelperUtils.pickObject(stateDays, ['id', 'queue']));
            })();
        }
    },[stateDays]);

    if(stateDays.length === 0) return null;

    return (
        <WrapperScroll backgroundColor={COLOR_ROOT.BACKGROUND} >
            <DragFlatList
                style={{flex: 1, padding: 10}}
                styleFlatList={{flex: 1}}
                scrollEnabled={false}
                heightElement={elementHeight}
                data={stateDays}
                setData={setStateDays}
                renderItem={render}
            />
        </WrapperScroll>
    );
};


export default ListDay;
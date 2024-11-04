import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import ItemEquipment from '@/components/ItemEquipment/ItemEquipment';


interface IselectEquipment {
}


/**
 * @page `Страница выбора оборудования для занятий.`
 */
const SelectEquipment: FC = () => {

    /**
     * @param activeEquipment Массив id которые выбраны.
     */
    const [activeEquipment, setActiveEquipment] = useState<number[]>([]);
    /**
     * `Обработка нажатия на переключатель элемента.`
     * @param id Id выбранного элемента.
     */
    const onPressing = (id: number) => {
        if(activeEquipment.indexOf(id) === -1) {
            setActiveEquipment(state => ([...state, id]));
        } else {
            const filter = activeEquipment.filter(item => item !== id);
            setActiveEquipment(filter);
        }
    }
    /**
     * `Определение, активный ли элемент.`
     * @param id Id элемента.
     */
    const isActive = (id: number) => activeEquipment.indexOf(id) === -1 ? false : true;

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <View style={styles.container} >
                <Title text={`твое оборудование ${"\n"}для занятий`} />
                <Text style={styles.text}>Выберите оборудование которое вы будите использовать для занятий. При необходимости добавьте своё оборудование.</Text>
                <View style={styles.contaiber_body} >
                    <ItemEquipment
                        title='Гриф гантели'
                        weight={1.5}
                        img={require('@/source/img/weight/dumbbell.jpg')}
                        onPressing={onPressing}
                        isActive={isActive}
                    />
                    <ItemEquipment
                        title='Гриф штанги'
                        weight={8}
                        img={require('@/source/img/weight/barbell.jpg')}
                        onPressing={onPressing}
                        isActive={isActive}
                    />
                    <ItemEquipment
                        title='Диск 20'
                        weight={20}
                        img={require('@/source/img/weight/plate.jpg')}
                        onPressing={onPressing}
                        isActive={isActive}
                    />
                    <ItemEquipment
                        title='Диск 10'
                        weight={10}
                        img={require('@/source/img/weight/plate.jpg')}
                        onPressing={onPressing}
                        isActive={isActive}
                    />
                    <ItemEquipment
                        title='Диск 5'
                        weight={5}
                        img={require('@/source/img/weight/plate.jpg')}
                        onPressing={onPressing}
                        isActive={isActive}
                    />
                    <ItemEquipment
                        title='Диск 1.5'
                        weight={1.5}
                        img={require('@/source/img/weight/plate.jpg')}
                        onPressing={onPressing}
                        isActive={isActive}
                    />
                </View>
            </View>
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    contaiber_body: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        marginTop: 20,
        color: 'white',
        fontSize: 14
    }
});


export default SelectEquipment;
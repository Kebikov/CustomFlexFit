import { useAppDispatch } from "@/redux/store/hooks";
import { SET_EXERCISE_STATE } from "@/redux/slice/sets.slice";
import { IExerciseState } from "@/redux/slice/sets.slice";


 /** `Добавление нового элемента.` */
export const useHandleExercise = () => {

    const DISPATCH = useAppDispatch();

    const addElement = (id: string, data: IExerciseState[]) => {
        const find = data.findIndex(item => item.id === id);
            /** `Копия добавляемого элемента` */
        const newElement: IExerciseState = JSON.parse(JSON.stringify(data[find]));
            /** `Массив всех id` */
        const arrId = data.map(item => Number(item.id));
            /** `Максимальный id` */
        const maxId = Math.max(...arrId);
        // Установка id добавляемого элемента
        newElement.id = String(maxId + 1);
        // Добавляем новый элемент в конец списка.
        const newData = [...data.slice(0, find + 1), newElement, ...data.slice(find + 1)];
    
        DISPATCH(SET_EXERCISE_STATE(newData));
    }

    return {
        addElement
    }
}


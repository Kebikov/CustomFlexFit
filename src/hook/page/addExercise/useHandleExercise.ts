import { useAppDispatch } from "@/redux/store/hooks";
import { SET_EXERCISE_STATE } from "@/redux/slice/sets.slice";
import { IExerciseState } from "@/redux/slice/sets.slice";
import showMessage from "@/utils/showMessage";
import useAppTranslation from "@/localization/helpers/useAppTranslation";


 /** `Добавление нового элемента.` */
const useHandleExercise = () => {

    const DISPATCH = useAppDispatch();
    const {t} = useAppTranslation(['alert_and_toast']);

    const addElement = (id: number, data: IExerciseState[]) => {
         // Копия данных для возможности внесения изминений, данные приходят как состояние из useState которые изменять нельзя напрямую
        const copyData = JSON.parse(JSON.stringify(data)) as IExerciseState[];

         // Нахадим в массиве элемент копию которого будем создавать.
        const findIndex = copyData.findIndex(item => item.id === id);
         /** `Копия добавляемого элемента` */
        const newElement: IExerciseState = JSON.parse(JSON.stringify(copyData[findIndex]));
         /** `Массив всех id` */
        const arrId = copyData.map(item => Number(item.id));
         /** `Максимальный id` */
        const maxId = Math.max(...arrId);
         // Установка id добавляемого элемента
        newElement.id = maxId + 1;
         // Установка очередности у добавляемого элемента
        newElement.order = newElement.order + 1;
         // Обновление очередности в элементах массива которые ниже добавляемого элемента
        for(const el of copyData) el.order >= newElement.order ? el.order += 1 : undefined;
         // Добавляем новый элемент.
        const newData = [...copyData.slice(0, findIndex + 1), newElement, ...copyData.slice(findIndex + 1)];
        
        DISPATCH(SET_EXERCISE_STATE(newData));
    }

     /** `Удаление элемента, если он не последний.` */
    const removeElement = (id: number, data: IExerciseState[]) => {
        if(data.length > 1) {
            const filterData = data.filter(item => item.id !== id);
            DISPATCH(SET_EXERCISE_STATE(filterData));
        } else {
            showMessage(t('alert_and_toast:itLastElement'))
        }
    }

    return {
        addElement,
        removeElement
    }
}

export default useHandleExercise;


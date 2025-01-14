import { TStateDataClock } from "../types";

interface IcheckId {
    id: string;
    selectedData: TStateDataClock;
}

 /** `Проверка правильности установленных id у состояний и компонента.` */
export const checkId = ({
    id,
    selectedData
}: IcheckId) => {
    const keys = Object.keys(selectedData);
    if(keys.includes(id)) {
        return;
    } else {
        throw new Error(`Указан не верный id в компоненте Clock.`)
    }
}
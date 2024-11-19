import { useAppSelector } from "@/redux/store/hooks"

const useHookImageCheck = () => {

    const pathToImageFolder = useAppSelector(state => state.setupSlice.pathToImageFolder);

    const imgCheck = (value: number | string): number | {uri: string} => {

        if(typeof value === 'string') {
            // Начинается ли строка со слова file
            const startString = value.startsWith('file');

            if(startString) {
                return {uri: value}
            } else {
                return {uri: pathToImageFolder + '/' + value}
            }
        } else {
            return value;
        }
    }

    return {
        imgCheck
    }
}

export default useHookImageCheck;
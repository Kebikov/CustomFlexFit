import { useAppSelector } from "@/redux/store/hooks";


const useHookImageCheck = () => {

    const pathToImageFolder = useAppSelector(state => state.setupSlice.pathToImageFolder);

    const imgCheck = (value: number | string): number | {uri: string} | undefined => {

        if(typeof value === 'string' && isNaN(Number(value))) {
            // Начинается ли строка со слова file
            const startString = value.startsWith('file');

            if(startString) {
                return {uri: value}
            } else {
                return {uri: pathToImageFolder + '/' + value}
            }
        }

        if(typeof value === 'number' ) return value

        if( !isNaN(Number(value)) ) {
            return Number(value);
        }
        
    }

    return {
        imgCheck
    }
}

export default useHookImageCheck;
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

/**
 * @hook `Для компенсации разницы в тексте, между английским и русским языком.`
 * @example 
 * import useConvertFont from '@/hook/useConvertFont';
 * const {convertFont} = useConvertFont();
 * <Text style={{fontSize: convertFont(15)}}>text</Text>
 */
const useConvertFont = () => {
    const {i18n} = useTranslation();
    const convertLanguage: number = i18n.language === 'English' ? 1.05 : 1;
    const convertPlatform: number = Platform.OS === 'ios' ? 1.12 : 1;
    const convert = convertLanguage * convertPlatform;

    const convertFont = (fontSize: number) => {
        return fontSize * convert;
    }

    return {
        convertFont
    }
}

export default useConvertFont;
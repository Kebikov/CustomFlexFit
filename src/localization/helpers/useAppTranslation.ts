import { useTranslation } from 'react-i18next';
import { FlatNamespace } from 'i18next';
import { $Tuple } from 'react-i18next/helpers';


/**
 * `Вернет fnc.t для перевода и fnc.t$ для перевода с проверкой ключа.`
 */
const useAppTranslation = <
    Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined
>(ns?: Ns) => {
    const {t} = useTranslation(ns);

    const t$ = (value: string) => {
        const findKey = 't$_';
        if(value.includes(findKey, 0)) {
            const key = value.split(findKey)[1];
            return t(key as any);
        } else {
            return value;
        }
    }

    return {
        t$, 
        t
    }
};

export default useAppTranslation;





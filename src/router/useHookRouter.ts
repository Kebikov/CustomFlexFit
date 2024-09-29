import { useRouter } from "expo-router";
import type { AppRouterTypes } from "@/router/app.router.types";

type TKeyApp = keyof AppRouterTypes;

interface IObjectParams<T extends TKeyApp> {
    pathname: T;
    params: AppRouterTypes[T];
}

export interface IAppRouter {
    push<T extends TKeyApp>(path: IObjectParams<T>): void;
    push(path: TKeyApp): void;
    push<T extends TKeyApp>(path: TKeyApp | IObjectParams<T>): void;

    navigate<T extends TKeyApp>(path: IObjectParams<T>): void;
    navigate(path: TKeyApp): void;
    navigate<T extends TKeyApp>(path: TKeyApp | IObjectParams<T>): void;

    replace<T extends TKeyApp>(path: IObjectParams<T>): void;
    replace(path: TKeyApp): void;
    replace<T extends TKeyApp>(path: TKeyApp | IObjectParams<T>): void;
}

/**
 * `Hook типизированной маршрутизации.`
 * @example const {appRouter, router} = useHookRouter();
 * @return appRouter, router
 */
export const useHookRouter = () => {
    const router = useRouter();

    class AppRouter  {

        push<T extends TKeyApp>(path: IObjectParams<T>): void;
        push(path: TKeyApp): void;
        push<T extends TKeyApp>(path: TKeyApp | IObjectParams<T>): void {
            if(typeof path === 'object' && 'pathname' in path && 'params' in path) {
                router.push({pathname: path.pathname, params: path.params});
            } else {
                router.push(path);
            }
        }
    
        navigate<T extends TKeyApp>(path: IObjectParams<T>): void;
        navigate(path: TKeyApp): void;
        navigate<T extends TKeyApp>(path: TKeyApp | IObjectParams<T>): void {
            if(typeof path === 'object' && 'pathname' in path) {
                router.navigate({pathname: path.pathname, params: path.params});
            } else {
                router.navigate(path);
            }
        }
        
    
        replace<T extends TKeyApp>(path: IObjectParams<T>): void;
        replace(path: TKeyApp): void;
        replace<T extends TKeyApp>(path: TKeyApp | IObjectParams<T>): void {
            if(typeof path === 'object' && 'pathname' in path) {
                router.replace({pathname: path.pathname, params: path.params});
            } else {
                router.replace(path);
            }
        }
        
    }

    const appRouter = new AppRouter();

    return {
        /**
         * `Глобальный обьект маршрутизации.`
         */
        router,
        /**
         * `Типизированный обьект маршрутизации.`
         */
        appRouter
    }
}


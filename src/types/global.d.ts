declare global {
    namespace App {
        type StrictOmit<T, K extends keyof T> = Omit<T, K> & {[P in K]?: never};

        type StricPick<T, K extends keyof T> = Partial<Omit<T, K>> & {[T in K]: number};
    }
}

export {}
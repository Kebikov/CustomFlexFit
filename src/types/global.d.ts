declare global {
    namespace App {
        type StrictOmit<T, K extends keyof T> = Omit<T, K> & {[P in K]?: never};
    }
}

export {}
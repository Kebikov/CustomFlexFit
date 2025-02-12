// type StricPartialExceptId1<T extends {id: number}> = {
//     [K in keyof T as K extends 'id' ? never : K]?: K extends keyof T ? T[K] : never;
// } & {id: number}

// type StricPartialExceptId1<T extends {id: number}> = 
// { 
//     [K in keyof T as K extends 'id' ? never : K]?: T[K]
// }
// & 
// {
//     id: number
// }


// interface ITest {
//     id: number;
//     title: string;
//     description: string;
// }

// const foo: StricPartialExceptId1<ITest> = {
//     id: 23,
//     title: 'sg',
//     description: 'sdf',
//     name: 'sdf'
// }

// function fooT(t: StricPartialExceptId1<ITest> | StricPartialExceptId1<ITest>[]) {
// }

// fooT({
//     id: 12,
//     name: 'sdf'
// })
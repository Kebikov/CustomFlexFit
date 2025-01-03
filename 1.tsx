interface ICom<I> {
    name: I
}

type TEx = '1i' | '2i'

const Comp = <I,>({
    name
}: ICom<I>) => {
    name
    return(
        <></>
    )
}

<Comp<TEx>
    name={'1i'}
/>
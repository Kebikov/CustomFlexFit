# Кнопка со скрытыми кнопками под ней.

<img src="https://drive.google.com/thumbnail?id=1VL-2XEN3-MTrtYNZULKzPmZ05WbiyWFe" width="200" >

## Пример

```typescript
import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ButtonSwipeable from '@/components/widgets/ButtonSwipeable/ButtonSwipeable';

const Test: FC = () => {

    const press = () => {
      
    }

    return (
        <View style={styles.main}>
            <ButtonSwipeable 
                totalButton={3}
                onPressButton1={press}
                iconForButton1={require('@/source/img/icon/bell-white.png')}
            >
                <View>
                    <Text style={styles.text} >BUTTON</Text>
                </View>
            </ButtonSwipeable>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text: {color: 'white', fontSize: 18},
});

export default Test;
```
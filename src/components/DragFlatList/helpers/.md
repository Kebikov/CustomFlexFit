```typescript
{
  "0": {
    "updatedIndex": 0,
    "updatedTop": 0
  },
  "1": {
    "updatedIndex": 1,
    "updatedTop": 70
  }
}

// after drag

{
  "0": {
    "updatedIndex": 1,
    "updatedTop": 70
  },
  "1": {
    "updatedIndex": 0,
    "updatedTop": 0
  }
}
```

`0` `1` Все элементы получают свой индекс  и т.д.

`updatedIndex` очередность в отображении данных на экране

После перемещения индексы у элементов остаются прежними, меняется только `updatedIndex`, меняется индекс очередности у элемента.
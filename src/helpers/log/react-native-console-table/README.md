# react-native-console-table

>This package is designed to display an array of objects (with the same interface) as a table in the terminal.

## 🗃️ Installation
`npm i react-native-modal-clock`

### 📖 Usage

📌 For correct table border display, ensure that a monospaced font is set for the terminal.

🛠️ You can do this in VSCode: `File > Preferences > Settings > Font Family` enter `'Courier New', monospace'`.

```typescript
const dataMock: {name: string, age: number, country: string, job: string}[] = [
    { name: 'Alice', age: 25, country: 'USA', job: 'Developer' },
    { name: 'Bob', age: 30, country: 'UK', job: 'Driver' },
    { name: 'Charlie', age: 28, country: 'Canada', job: 'Engineer' },
    { name: 'Charlie', age: 28, country: 'Canada', job: 'Manager' },
    { name: 'Bob', age: 30, country: 'UK', job: 'Developer' }
];
```

By default, without a settings object.

<img src="./img/1.JPG" alt="Описание изображения" width="400" >





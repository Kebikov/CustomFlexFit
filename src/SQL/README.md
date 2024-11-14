# Menu

[диаграмма BD](#диаграмма-bd)

[таблица команды](#таблица-команды)

[добавление команды](#добавление-команды)

[получение команды](#получение-команды)

[обновление команды](#обновление-команды)

[удаление команды](#удаление-команды)

[связи команды](#связи-команды)

[дополнительные команды](#дополнительные-команды)

## диаграмма BD

[ссылка на диограмму BD](https://app.diagrams.net/#G1nLtGVJ3J262TntzBlExsixzFjgsQTEmj#%7B%22pageId%22%3A%22dVbUphDdP3_9vKwfMPyg%22%7D)


## таблица команды

`create` - создание таблицы в BD

`remove` - удаление таблицы

## добавление команды

`insertOne` - добавление одной записи в модель

## получение команды

`find` - поиск всех записей таблицы

`findById` - посучение записи по ID

`.select('name', 'age')` - доп.метод, выбор определенных полед записи

## обновление команды

`findByIdAndUpdate` - обновление записи по ID


## удаление команды

`findByIdAndDelete` - удаление записи по ID

## связи команды

`.populate('color', ['red', 'blue'])` - доп.метод, получение данных из связанной таблицы 


## дополнительные команды

`save` - сохранение данных

`findOne` - получение одной сущности





```
    /**
     * `//* Добавление начальных данных в таблицу.`
     */
    async addDataStartInTableDay(db: SQLiteDatabase, data: DayDTO[] | null = null) {
        try {
            /**
             * Команда для SQL по добавлению данных.
             */
            let commandStart: string = `INSERT INTO ${CONFIGURATION.TABLE_Day} (day, img, date, title, description, lastExercise) VALUES `;

            if(data) {
                data.forEach(item => {
                    commandStart += `("${item.day}", "${item.img}", "${item.date}", "${item.title}", "${item.description}", "${item.lastExercise ? 1 : 0}"),`;
                });
            } else {
                DATA_DAY.forEach(item => {
                    commandStart += `("${item.day}", "${item.img}", "${item.date}", "${item.title}", "${item.description}", "${item.lastExercise ? 1 : 0}"),`;
                });
            }

            // Удаление зарпятой в конце команды.
            let command = commandStart.slice(0, -1);

            const isExistTable = await DatabaseService.checkExistenceDataBase();
            if (!isExistTable) {
                console.info(`База данных ${CONFIGURATION.DB_Name} не сушествует.`);
                return;
            }

            const result = await DatabaseService.checkDataExistenceInTable(db, CONFIGURATION.TABLE_Day);
            
            if(!result) {
                await db.execAsync(command);
            }
        } catch (error) {
            console.error('Error in  >>>', error);
        }
    }
```

```
    /**
     * `//* Добавление начальных данных в таблицу.`
     */
    async addDataStartInTableExercise(db: SQLiteDatabase, data?: ExerciseDTOomitId[]) {
        try {
            /**
             * Команда для SQL по добавлению данных.
             */
            let commandStart: string = `INSERT INTO ${CONFIGURATION.TABLE_EXERCISE} 
                (day, exercise, title, description, weightNeck, weightOne, weightTwo, amount, amountExercise, isUp, img, burpee) 
                VALUES `;

            if(data) {
                commandStart = handleCommand(data, commandStart);
            } else {
                commandStart = handleCommand(DATA_START_EXERCISE, commandStart);
            }

            /**
             * @function
             * Формирование команды SQL для добавления данных в таблицу.
             * @param dataTable Массив обьектов упражнений.
             * @returns {string} Вернет сформированную команду строкой.
             */
            function handleCommand(dataTable: ExerciseDTOomitId[], command: string): string {
                dataTable.forEach(item => {
                    command += `( ${item.day}, ${item.exercise}, "${item.title}", "${item.description}", "${item.weightNeck}", "${item.weightOne}", "${item.weightTwo}", ${item.amount}, ${item.amountExercise}, "${item.isUp}", "${item.img}", ${item.burpee} ),`;
                });

                return command;
            }

            // Удаление зарпятой в конце команды.
            let command = commandStart.slice(0, -1);
            const isExistTable = await DatabaseService.checkExistenceDataBase();
            if (!isExistTable) {
                console.info(`База данных ${CONFIGURATION.DB_NAME} не сушествует.`);
                return;
            }

            const result = await DatabaseService.checkDataExistenceInTable(db, CONFIGURATION.TABLE_EXERCISE);

            if(!result) {
                await db.execAsync(command);
            }
        } catch (error) {
            console.error('Error in addDataStartInTableExercise >>>', error);
        }
    }
```

```
export type TIsUp = 'up' | 'down' | '?' | 'not'

export enum EWeightNeck {
    big = '7.3',
    w = '5',
    dumbbell = '1.6',
    zero = '0'
}
```


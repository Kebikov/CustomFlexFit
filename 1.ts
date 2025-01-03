performance — это мощный API, предоставляющий инструменты для измерения и анализа производительности веб-приложений. С его помощью можно делать гораздо больше, чем просто замерять время выполнения операций. Вот что еще можно делать:

1. Измерение времени загрузки страницы

Используя performance.timing или performance.getEntriesByType('navigation'), можно получить подробные данные о процессе загрузки страницы:

const timing = performance.timing;
const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
console.log(`Время загрузки страницы: ${pageLoadTime} мс`);

Современный подход:

const [navigation] = performance.getEntriesByType('navigation');
console.log(`Время загрузки страницы: ${navigation.loadEventEnd - navigation.startTime} мс`);

2. Создание пользовательских меток (Custom Markers)

Можно вручную создавать метки для измерения времени выполнения между определенными событиями:

performance.mark('startTask');

// Ваш код или операция
setTimeout(() => {
    performance.mark('endTask');
    performance.measure('Task Duration', 'startTask', 'endTask');
    const [measure] = performance.getEntriesByName('Task Duration');
    console.log(`Время выполнения задачи: ${measure.duration} мс`);
}, 1000);

3. Анализ производительности ресурсов

С помощью performance.getEntriesByType('resource') можно получить информацию о загружаемых ресурсах (например, CSS, JS, изображения):

const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
    console.log(`Ресурс: ${resource.name}, Время загрузки: ${resource.duration} мс`);
});

4. Измерение FPS (кадров в секунду)

Можно измерить плавность анимации или взаимодействия пользователя, анализируя промежуток времени между вызовами requestAnimationFrame:

let lastFrameTime = performance.now();
let frameCount = 0;

function calculateFPS() {
    const now = performance.now();
    frameCount++;
    if (now - lastFrameTime >= 1000) {
        console.log(`FPS: ${frameCount}`);
        frameCount = 0;
        lastFrameTime = now;
    }
    requestAnimationFrame(calculateFPS);
}

calculateFPS();

5. Использование Performance Observer

С помощью PerformanceObserver можно отслеживать события производительности в реальном времени, например, загрузку ресурсов или пользовательские метки:

const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
        console.log(`Тип: ${entry.entryType}, Имя: ${entry.name}, Длительность: ${entry.duration} мс`);
    });
});

observer.observe({ entryTypes: ['mark', 'measure', 'resource'] });

// Добавление метки для теста
performance.mark('testMarker');

6. Измерение времени отклика пользователя (First Input Delay)

Можно измерить, сколько времени проходит с момента первого взаимодействия пользователя до его обработки:

const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log(`First Input Delay: ${entry.processingStart - entry.startTime} мс`);
    }
});

observer.observe({ type: 'first-input', buffered: true });

7. Отслеживание данных о навигации

performance.navigation или performance.getEntriesByType('navigation') позволяет анализировать тип навигации (например, перезагрузка страницы или переход по ссылке):

const navigationType = performance.navigation.type;
console.log(`Тип навигации: ${navigationType}`);

8. Подробный анализ производительности React-приложений

Интеграция с библиотеками вроде React Profiler API (https://reactjs.org/docs/profiler.html) позволяет собирать данные о времени рендеринга компонентов и оптимизировать их.

Эти возможности делают performance незаменимым инструментом для анализа и оптимизации производительности веб-приложений.
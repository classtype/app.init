# app.init - Это модуль для инициализации приложений.

Другими словами данный пакет позволяет автоматически загрузить все необходимые файлы в указанных дирректориях.


### Установка

```
npm install --save app.init
```

### Пример инициализации нового приложения

В данном примере сразу же подгружаются все файлы в дирректориях "./Class" и "./Modules".
Подразумевается что во всех вложенных дирректориях находятся только *.js файлы или вложенные директории.

```js
require('app.init')(
    './Class',// Классы
    './Modules',// Модули
    './config.js',// Конфиг
    './init.js'// Инициализация
);
```

```js
require('app.init')(
/*┌────────────────┐
  │ Базовые модули │
  └────────────────┘*/[
        'Classtype',// Classtype
        'console.dump',// Модуль для получения дампа объекта
        'escapeHtml',// Модуль для экранирования спец.симвов
        'File',// Модуль для работы с файлом
        'Files',// Модуль для работы с файлами
        'ErrorLog',// Модуль для красивого вывода ошибок в консоль
        'Colors',// Модуль для цветного вывода текста в консоль
        'Bot'// Модуль для работы с телеграм ботом
    ],
    
/*┌─────────────────────────┐
  │ Пользовательские модули │
  └─────────────────────────┘*/[
        './Class',// Классы
        './Modules',// Модули
        './config.js',// Конфиг
        './init.js'// Инициализация
    ]
);
```

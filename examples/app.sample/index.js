require('../../src/app.init')(
// Базовые модули
    [
        'Classtype',// Classtype
        'console.dump',// Модуль для получения дампа объекта
        'escapeHtml',// Модуль для экранирования спец.симвов
        'JSONFiles',// Модуль для работы с JSON файлами
        'ErrorLog',// Модуль для красивого вывода ошибок в консоль
        'Colors',// Модуль для цветного вывода текста в консоль
        'Bot'// Модуль для работы с телеграм ботом
    ],
    
// Пользовательские модули
    [
        'config.js',// Конфиг
        './Class',// Базовые классы
        './Modules'// Модули
    ]
);
/*
require('../src/app.init')(
    './Class',// Базовые классы
    './Modules'// Модули
);
*/
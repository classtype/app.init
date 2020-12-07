require('../src/app.init')(
// Базовые модули
    [
        'Classtype',// Classtype
        'console.dump',// Модуль для получения дампа объекта
        'escapeHtml',// Модуль для экранирования спец.симвов
        'JSONFiles',// Модуль для работы с JSON файлами
        'ErrorLog',// Модуль для красивого вывода ошибок в консоль
        'Colors'// Модуль для цветного вывода текста в консоль
    ],
    
// Пользовательские модули
    [
        'config.js',// Конфиг
        './Class',// Базовые классы
        './Modules'// Модули
    ],
    
// Код который выполняется после загрузки всех скрепотов
    function() {
        console.log('Скрипт запущен!');
    }
);
/*
require('../src/app.init')(
    './Class',// Базовые классы
    './Modules',// Модули
    function() {console.log('Скрипт запущен!');}// Код который выполняется после загрузки всех скрепотов
);
*/
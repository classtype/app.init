require('../src/app.init')(
// Базовые модули
    [
        'Classtype',// Classtype
        'console.dump',// Модуль для получения дампа объекта
        'JSONFiles',// Модуль для работы с JSON файлами
        'ErrorLog',// Модуль для красивого вывода ошибок в консоль
        'Colors'// Вывод цветов
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
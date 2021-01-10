//--------------------------------------------------------------------------------------------------

    var fs = require('fs');
    var path = require('path');
    var colors = require('colors/safe');
    
// Выводит ошибку в консоль
    var ErrorLog = require('./ErrorLog');
    
//--------------------------------------------------------------------------------------------------

// Добавляем обработчик на обработку исключений
    process.on('uncaughtException', function(error) {
    // Выводим ошибку в консоль
        ErrorLog(error);
    });
    
// Добавляем обработчик на обработку исключений для Promise
    process.on('unhandledRejection', function(error) {
        ErrorLog(error);
    });
    
// Переопределяем $
    global.$ = {};
    
// Возвращает фатальную ошибку и останавливает процесс
    var fatalError = function(error, msg) {
        console.log(colors.bgRed('Ошибка: '+error));
        console.log(colors.bgBlue('Подсказка: '+msg));
        process.exit();
    };
    
// Загружает модули
    var loadModules = function(base_path, dirs) {
    // Проходим по списку файлов и папок
        for (var i = 0; i < dirs.length; i++) {
        // Путь к текущему объекту
            var pwd = path.join(base_path, dirs[i]);
            
        // Проверяем объект на существование
            if (!fs.existsSync(pwd)) {
                fatalError(
                    'Такого пути не существует: "'+pwd+'"',
                    'Возможно вы указали неверный путь в файле: "'+process.mainModule.filename+'"'
                );
            }
            
        // Директория
            if (fs.statSync(pwd).isDirectory()) {
            // Переходим в директорию
                loadModules(pwd, fs.readdirSync(pwd));
            }
            
        // Файл
            else {
            // Расширение файла не .js
                if (pwd.substr(-3) != '.js') {
                    fatalError(
                        'Неверный тип файла: "'+pwd+'"',
                        'Доступны файлы только с расширением *.js'
                    );
                }
                
            // Загружаем модуль
                require(pwd);
            }
        }
    };
    
/*--------------------------------------------------------------------------------------------------
|
| -> Инициализирует загрузку модулей
|
|-------------------------------------------------------------------------------------------------*/

    module.exports = function() {
    // Список аргументов
        var args = arguments;
        
    // Базовые модули
        if (typeof args[0] == 'object') {
        // Проходим по списку базовых модулей
            for (var i = 0; i < args[0].length; i++) {
            // Classtype
                if (args[0][i] == 'Classtype') {
                // Для создания динамических классов
                    Object.defineProperty($, 'CT', {
                            value: require('ct')
                        }
                    );
                // Для создания статических классов
                    Object.defineProperty($, 'extend', {
                            value: $.CT.static.extend
                        }
                    );
                }
                
            // Для создания статических классов
                if (args[0][i] == 'extend') {
                    Object.defineProperty($, 'extend', {
                            value: require('ct').static.extend
                        }
                    );
                }
                
            // Выводит ошибку в консоль
                if (args[0][i] == 'ErrorLog') {
                    $.ErrorLog = ErrorLog;
                }
                
            // Работа с JSON файлами
                if (args[0][i] == 'JSONFiles') {
                    $.JSONFiles = require('./JSONFiles');
                }
                
            // Получения дампа объекта
                if (args[0][i] == 'console.dump') {
                    require('console.dump');
                }
                
            // Экранирование спец.симвов
                if (args[0][i] == 'escapeHtml') {
                    $.escapeHtml = require('./escapeHtml');
                }
                
            // Телеграм бот
                if (args[0][i] == 'Bot') {
                    $.ErrorLog = ErrorLog;
                    $.Colors = colors;
                    $.Bot = require('./Bot');
                }
                
            // Цветной вывод текста в консоль
                if (args[0][i] == 'Colors') {
                    $.Colors = colors;
                }
            }
            
        // Инициализируем загрузку пользовательских модулей
            loadModules(path.dirname(module.parent.filename), args[1]);
        }
        
    // Только пользовательские модули
        else {
            loadModules(path.dirname(module.parent.filename), args);
        }
    };
    
//--------------------------------------------------------------------------------------------------
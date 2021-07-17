//--------------------------------------------------------------------------------------------------

    var fs = require('fs');
    var path = require('path');
    var ErrorLog = require('app.errorlog');
    var stackTrace = require('stack-trace');
    
//--------------------------------------------------------------------------------------------------

// Добавляем обработчик на обработку исключений
    process.on('uncaughtException', function(error) {
    // Выводим ошибку в консоль
        ErrorLog(error, module.filename);
    });
    
// Добавляем обработчик на обработку исключений для Promise
    process.on('unhandledRejection', function(error) {
    // Выводим ошибку в консоль
        ErrorLog(error, module.filename);
    });
    
// Переопределяем $
    global.$ = {};
    
// Поиск подстроки "searchString" в файле "fileName"
    var include = (message, fileName, searchString) => {
    // Стек ошибки
        let stack = stackTrace.parse(new Error);
        
        for (let i = 0; i < stack.length; i++) {
            if (stack[i]['fileName'] == fileName) {
            // Строка с ошибкой
                let line = stack[i].lineNumber;
                
            // Позиция в строке с ошибкой
                let column = stack[i].columnNumber;
                
            // Содержимое файла с ошибкой
                let content = fs.readFileSync(stack[i].fileName).toString().split('\n');
                
                for (let i = line - 1; i < content.length; i++) {
                // Начальная позиция
                    let start = content[i].indexOf(searchString, column);
                    
                // Сбрасываем позицию
                // так как поиск последующих строк всегда идет с нулевой позиции
                    column = 0;
                    
                    if (start != -1) {
                    // Лог
                        let log = '';
                        
                    // Сообщение об ошибке
                        log += ErrorLog.msg(message+"'"+searchString+"'", fileName);
                        
                    // Выделение ошибки в файле
                        log += ErrorLog.highlight(
                            fileName,// Путь
                            i + 1,// Номер строки
                            start,// Начальная позиция
                            start + searchString.length// Конечная позиция
                        );
                        
                    // Выводим в консоль
                        console.log(log + '\n');
                        process.exit();
                        //return;
                    }
                }
            }
        }
    };
    
// Загружает модули
    var loadModules = function(base_path, dirs) {
    // Проходим по списку файлов и папок
        for (var i = 0; i < dirs.length; i++) {
        // Путь к текущему объекту
            var pwd = path.join(base_path, dirs[i]);
            
        // Проверяем объект на существование
            if (!fs.existsSync(pwd)) {
                include(
                    'Модуль не найден:',
                    process.mainModule.filename,
                    dirs[i]
                );
            }
            
        // Директория
            if (fs.statSync(pwd).isDirectory()) {
            // Переходим в директорию
                loadModules(pwd, fs.readdirSync(pwd));
            }
            
        // Файл
            else {
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
            // Выводит ошибку в консоль
                if (args[0][i] == 'ErrorLog') {
                    $.ErrorLog = ErrorLog;
                }
                
            // Работа с файлами
                if (args[0][i] == 'File') {
                    $.File = require('app.file');
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
                    $.Colors = require('colors/safe');
                    $.Bot = require('./Bot');
                }
                
            // Цветной вывод текста в консоль
                if (args[0][i] == 'Colors') {
                    $.Colors = require('colors/safe');
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
//--------------------------------------------------------------------------------------------------

    var fs = require('fs');
    var path = require('path');
    var colors = require('colors/safe');
    var CT = require('ct');
    
//--------------------------------------------------------------------------------------------------

// Выводит ошибку в консоль
    var code_error = function(error) {
        var stack = require('./stackTrace').parse(error);
        var fileName = stack[0].fileName;
        var lineNumber = stack[0].lineNumber;
        var columnNumber = stack[0].columnNumber - 1;
        
    // Проверяем файл на существование
        if (fs.existsSync(fileName)) {
        // Имя файла с ошибкой
            console.log(
                colors.bgRed('Файл: ') +
                colors.bgRed('"'+fileName+'"')
            );
            
        // Содержимое ошибки
            console.log(
                colors.bgBlack('Ошибка: ') +
                colors.bgBlack(error.message)
            );
            
        // Содержимое файла с ошибкой
            var script_content = fs.readFileSync(fileName).toString().split("\n");
            
        // Строка с ошибкой
            var script = script_content[lineNumber - 1];
            
        // Разбиваем строку с ошибкой на три подстроки
            var line1 = script.substr(0, columnNumber);
            var line2 = script.substr(columnNumber, lineNumber + 1);
            var line3 = script.substr(columnNumber + lineNumber + 1);
            
        // Две строки перед строкой с ошибкой и две после
            var code = [];
            code[0] = script_content[lineNumber - 3];
            code[1] = script_content[lineNumber - 2];
            code[2] = script_content[lineNumber];
            code[3] = script_content[lineNumber + 1];
            
        // Вторая строка идущая перед строкой с ошибкой
            if (lineNumber - 2 >= 1) {
                console.log(
                    colors.bgGreen((lineNumber - 2) + '. ') +
                    colors.bgYellow(code[0])
                );
            }
            
        // Первая строка идущая перед строкой с ошибкой
            if (lineNumber - 1 >= 1) {
                console.log(
                    colors.bgGreen((lineNumber - 1) + '. ') +
                    colors.bgYellow(code[1])
                );
            }
            
        // Строка с ошибкой
            console.log(
                colors.bgMagenta(lineNumber + '. ') +
                colors.bgYellow(line1) +
                colors.bgRed(line2) +
                colors.bgYellow(line3)
            );
            
        // Перая строка идущая за строкой с ошибкой
            if (script_content.length >= lineNumber + 1) {
                console.log(
                    colors.bgGreen((lineNumber + 1) + '. ') +
                    colors.bgYellow(code[2])
                );
            }
            
        // Вторая строка идущая за строкой с ошибкой
            if (script_content.length >= lineNumber + 2) {
                console.log(
                    colors.bgGreen((lineNumber + 2) + '. ') +
                    colors.bgYellow(code[3])
                );
            }
        }
    };
    
// Добавляем обработчик на обработку исключений
    process.on('uncaughtException', function(error) {
    // Выводим ошибку в консоль
        code_error(error);
    });
    
// Переопределяем $
    global.$ = {};
    
// Для создания динамических классов
    Object.defineProperty($, 'CT', {
            value: CT
        }
    );
    
// Для создания статических классов
    Object.defineProperty($, 'extend', {
            value: CT.static.extend
        }
    );
    
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
            // Выводит ошибку в консоль
                if (args[0][i] == 'ErrorLog') {
                    $.ErrorLog = code_error;
                }
                
            // Получения дампа объекта
                if (args[0][i] == 'console.dump') {
                    require('console.dump');
                }
                
            // Вывод цветов
                if (args[0][i] == 'Colors') {
                    Object.defineProperty($, 'Colors', {
                            value: colors
                        }
                    );
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
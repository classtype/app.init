/*--------------------------------------------------------------------------------------------------
|
| -> База данных
|
|-------------------------------------------------------------------------------------------------*/

$.DB = {
    Users: new $.JSONFiles('./examples/bot.sample/Database/Users')
};

/*--------------------------------------------------------------------------------------------------
|
| -> Авторизация
|
|-------------------------------------------------------------------------------------------------*/

$.Bot.authorization = function(ctx, next, callback) {
// Получаем информацию о пользователе
    $.Users.get(ctx.chat, function(status, userInfo) {
    // Возвращаем ошибку
        if (status == 'error') {
            console.log(this['error_msg']);
            return;
        }
        
    // Возвращаем информацию о пользователе
        if (typeof callback == 'function') {
            let bot = new $.Bot(ctx, next, callback);
            callback.call(bot, bot, new ($.User || $.Users)(userInfo));
        }
    });
};

/*--------------------------------------------------------------------------------------------------
|
| -> Базовый класс для User
|
|-------------------------------------------------------------------------------------------------*/

$.Users = class {
// Список полей по умолчанию
    static defaultInfo = {
        user_id: 0,// ID пользователя
        username: '',// Псевдоним пользователя
        first_name: ''// Имя пользователя
    }
    
// Конструктор
    constructor(userInfo) {
        this.userInfo = userInfo;// Сохраняем информацию о пользователе
    }
    
// Сохранить изменения в БД
    save(callback) {
        $.Users.set(this.userInfo, callback);
    }
    
// ID пользователя
    get user_id() {
        return this.userInfo['user_id'];
    }
};

/*--------------------------------------------------------------------------------------------------
|
| -> Задает поля по умолчанию
|
|-------------------------------------------------------------------------------------------------*/

$.Users.setDefaultInfo = function(userInfo) {
// Создаем список полей
    userInfo = typeof userInfo == 'object' ? userInfo : {};
    
// Проходим по списку полей по умолчанию для Users
    for (let field in $.Users.defaultInfo) {
        if (typeof userInfo[field] == 'undefined') {
            userInfo[field] = $.Users.defaultInfo[field];
        }
    }
    
// Проходим по списку полей по умолчанию для User
    if ($.User && typeof $.User.defaultInfo == 'object') {
        for (let field in $.User.defaultInfo) {
            if (typeof userInfo[field] == 'undefined') {
                userInfo[field] = $.User.defaultInfo[field];
            }
        }
    }
    
// Возвращаем результат
    return userInfo;
};

/*--------------------------------------------------------------------------------------------------
|
| -> Создает нового пользователя
|
|-------------------------------------------------------------------------------------------------*/

$.Users.add = function(chat, callback) {
// Создаем список полей
    let userInfo = {};
    
// Добавляем поля присланные от Telegram
    userInfo['user_id'] = chat['id'];// ID пользователя
    userInfo['username'] = chat['username'];// Псевдоним пользователя
    userInfo['first_name'] = chat['first_name'];// Имя пользователя
    
// Задаем поля по умолчанию
    userInfo = $.Users.setDefaultInfo(userInfo);
    
// Создаем пользователя в БД
    $.DB['Users'].add(chat['id'], userInfo, function(status) {
    // Возвращаем ошибку
        if (status == 'error') {
            if (typeof callback == 'function') {
                callback.call(this, status);
            }
            return;
        }
        
    // Выводим в консоль
        console.log($.Colors.blue.bold('Add.User:')+' '+$.Colors.blue(userInfo['user_id']));
        
    // Возвращаем информацию о пользователе
        if (typeof callback == 'function') {
            callback(status, userInfo);
        }
    });
};

/*--------------------------------------------------------------------------------------------------
|
| -> Получает информацию о пользователе
|
|-------------------------------------------------------------------------------------------------*/

$.Users.get = function(chat, callback) {
// Получаем информацию из БД
    $.DB['Users'].get(chat['id'], function(status, userInfo) {
    // Ошибка при чтении файла
        if (status == 'error') {
        // Файл содержит не правильный JSON!
            if (this['error_code'] == 303) {
                if (typeof callback == 'function') {
                    callback.call(this, status);
                }
                return;
            }
            
        // Создаем нового пользователя
            return $.Users.add(chat, callback);
        }
        
    /*---------------------------------------------|
    | Обновляем в БД поля которые прислал Telegram |
    |---------------------------------------------*/
    
    // Флаг изменений
        let isUpdate = false;
        
    // Список полей которые нужно обновить
        let fields = [
            'username',// Псевдоним пользователя
            'first_name'// Имя пользователя
        ];
        
    // Проходим по списку полей
        for (let i = 0; i < fields.length; i++) {
        // Поле изменилось
            if (chat[fields[i]] != userInfo[fields[i]]) {
                userInfo[fields[i]] = chat[fields[i]];
                isUpdate = true;
            }
        }
        
    // Если есть изменения, то сохраняем информацию в БД
        if (isUpdate) {
            $.Users.set(userInfo, callback);
        }
        
    // Если изменений нет, то просто возвращаем информацию о пользователе
        else {
            if (typeof callback == 'function') {
                callback(status, userInfo);
            }
        }
    });
};

/*--------------------------------------------------------------------------------------------------
|
| -> Сохраняет информацию о пользователе
|
|-------------------------------------------------------------------------------------------------*/

$.Users.set = function(userInfo, callback) {
// Задаем поля по умолчанию
    userInfo = $.Users.setDefaultInfo(userInfo);
    
// Сохраняем информацию в БД
    $.DB['Users'].set(userInfo['user_id'], userInfo, function(status) {
    // Возвращаем ошибку
        if (status == 'error') {
            if (typeof callback == 'function') {
                callback.call(this, status);
            }
            return;
        }
        
    // Возвращаем информацию о пользователе
        if (typeof callback == 'function') {
            callback(status, userInfo);
        }
    });
};

//--------------------------------------------------------------------------------------------------
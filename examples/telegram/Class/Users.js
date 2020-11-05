//--------------------------------------------------------------------------------------------------

$.Users = {
    
/*--------------------------------------------------------------------------------------------------
|
| -> Задает поля по умолчанию
|
|-------------------------------------------------------------------------------------------------*/

    setDefaultInfo: function(userInfo) {
    // Создаем пользователя
        userInfo = typeof userInfo == 'object' ? userInfo : {};
        
    // Добавляем поля по умолчанию
        var defaultUserInfo = {};
        defaultUserInfo['user_id'] = 0;// ID пользователя
        defaultUserInfo['username'] = '';// Псевдоним пользователя
        defaultUserInfo['first_name'] = '';// Имя пользователя
        defaultUserInfo['message_id'] = 0;// ID последнего сообщения
        
    // Проходим по списку полей по умолчанию
        for (var field in defaultUserInfo) {
            if (typeof userInfo[field] == 'undefined') {
                userInfo[field] = defaultUserInfo[field];
            }
        }
        
    // Возвращаем результат
        return userInfo;
    },
    
/*--------------------------------------------------------------------------------------------------
|
| -> Создает нового пользователя
|
|-------------------------------------------------------------------------------------------------*/

    add: function(chat, callback) {
    // Создаем пользователя
        var userInfo = {};
        userInfo['user_id'] = chat['id'];// ID пользователя
        userInfo['username'] = chat['username'];// Псевдоним пользователя
        userInfo['first_name'] = chat['first_name'];// Имя пользователя
        
    // Задаем поля по умолчанию
        userInfo = $.Users.setDefaultInfo(userInfo);
        
    // Создаем пользователя в базе
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
    },
    
/*--------------------------------------------------------------------------------------------------
|
| -> Получает информацию о пользователе
|
|-------------------------------------------------------------------------------------------------*/

    get: function(chat, callback) {
    // Получаем информацию из базы
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
            
        /*----------------------------------------------------|
        | Обновляем в нашей базе поля которые пислал Telegram |
        |----------------------------------------------------*/
        
        // Флаг изменений
            var isUpdate = false;
            
        // Список полей которые нужно обновить
            var fields = [
                'username',// Псевдоним пользователя
                'first_name'// Имя пользователя
            ];
            
        // Проходим по списку полей
            for (var i = 0; i < fields.length; i++) {
            // Поле изменилось
                if (chat[fields[i]] != userInfo[fields[i]]) {
                    userInfo[fields[i]] = chat[fields[i]];
                    isUpdate = true;
                }
            }
            
        // Если есть изменения, то сохраняем информацию в базу
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
    },
    
/*--------------------------------------------------------------------------------------------------
|
| -> Сохраняет информацию о пользователе
|
|-------------------------------------------------------------------------------------------------*/

    set: function(userInfo, callback) {
    // Задаем поля по умолчанию
        userInfo = $.Users.setDefaultInfo(userInfo);
        
    // Сохраняем информацию в базе
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
    }
};

//--------------------------------------------------------------------------------------------------
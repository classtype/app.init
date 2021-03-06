//--------------------------------------------------------------------------------------------------

$.User = class extends $.Users {
    
/*--------------------------------------------------------------------------------------------------
|
| -> Список полей по умолчанию
|
|-------------------------------------------------------------------------------------------------*/

    static defaultInfo = {
        message_id: 0// ID последнего сообщения от бота
    }
    
/*--------------------------------------------------------------------------------------------------
|
| -> Методы
|
|-------------------------------------------------------------------------------------------------*/

// Сохраняет ID последнего сообщения
    setMessageID(message_id, callback) {
        this.userInfo['message_id'] = message_id;
        this.save();
    }
};

//--------------------------------------------------------------------------------------------------
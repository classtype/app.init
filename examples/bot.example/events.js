/*--------------------------------------------------------------------------------------------------
|
| -> Обработчик текста
|
|-------------------------------------------------------------------------------------------------*/

$.Bot.onText(function(bot, User) {
// Удаляем присланное сообщение от пользователя
    this.remove();
    
// Отправляем сообщение от бота
    this.send(this.text)
    
// Сохраняем ID отправленного сообщения
    .then(function({ message_id }) {
        User.setMessageID(message_id);
    });
});

//--------------------------------------------------------------------------------------------------
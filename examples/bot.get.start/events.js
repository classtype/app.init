//--------------------------------------------------------------------------------------------------

// Слущает все сообщения от пользователя
$.Bot.onText(function() {
// Отправляем сообещние от бота
    this.send(
    // Текст
        this.text,

    // Клавиатура
        [
            [this.text]// Кнопка
        ]
    );

// Выводим в консоль сообщение от пользователя
    console.log('this.text =', this.text);

// Выводим в консоль информацию о чате с которого пришло сообщение
    console.log('this.chat =', this.chat);
});

//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------

$.Bot.onText('Привет бот', function() {
    this.send(`Привет ${this.chat.first_name}!`);
});

$.Bot.onText(function() {
    this.send(`Вы отправили:\n"${this.text}"`);
});

//--------------------------------------------------------------------------------------------------
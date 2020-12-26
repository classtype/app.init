//--------------------------------------------------------------------------------------------------

$.Bot.onStart(function() {
    this.send('Вы уверены, что хотите продолжить?', [
        ['Да','button_1'],
        ['Нет','button_2']
    ]);
});

$.Bot.onClick('button_1', function() {
    this.send('Вы выбрали "Да"');
    this.complete();
});

$.Bot.onClick('button_2', function() {
    this.send('Вы выбрали "Нет"');
    this.complete();
});

$.Bot.onClick(function() {
    this.send(`Вы кликнули по кнопке:\n"${this.button_id}"`);
    this.complete();
});

//--------------------------------------------------------------------------------------------------
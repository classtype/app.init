/*--------------------------------------------------------------------------------------------------
|
| -> Пример отправки сообщения от бота
|
|-------------------------------------------------------------------------------------------------*/

$.Bot.onStart(function() {
    this.send('Начинаю запуск...');
});

/*--------------------------------------------------------------------------------------------------
|
| -> Пример обычной клавиатуры
|
|-------------------------------------------------------------------------------------------------*/

$.Bot.onText('Обычная клавиатура.', function() {
    this.send('Пример обычной клавиатуры.', [
        ['Кнопка 1'],
        ['Кнопка 2']
    ]);
});

$.Bot.onText('Кнопка 1', function() {
    this.send('Вы кликнули по кнопке:\n"Кнопка 1"');
});

$.Bot.onText('Кнопка 2', function() {
    this.send('Вы кликнули по кнопке:\n"Кнопка 2"');
});

/*--------------------------------------------------------------------------------------------------
|
| -> Примеры рядов
|
|-------------------------------------------------------------------------------------------------*/

$.Bot.onText('Ряд по вертикали.', function() {
    this.send('Пример рядов по вертикали.', [
        ['Кнопка 1'],// Ряд 1
        ['Кнопка 2'],// Ряд 2
        ['Кнопка 3'],// Ряд 3
        ['Кнопка 4'] // Ряд 4
    ]);
});

$.Bot.onText('Ряд по горизонтали.', function() {
    this.send('Пример рядов по горизонтали.', [
        [['Кнопка 1'], ['Кнопка 2'], ['Кнопка 3'], ['Кнопка 4']]// Ряд 1
    ]);
});

$.Bot.onText('Рaзнoypoвнeвый ряд.', function() {
    this.send('Пример рaзнoypoвнeвого ряда.', [
        [['Кнопка 1'], ['Кнопка 2'], ['Кнопка 3']],              // Ряд 1
        [['Кнопка 4']],                                          // Ряд 2
        [['Кнопка 5'], ['Кнопка 6'], ['Кнопка 7'], ['Кнопка 8']],// Ряд 3
        [['Кнопка 9'], ['Кнопка 10']]                            // Ряд 4
    ]);
});

/*--------------------------------------------------------------------------------------------------
|
| -> Пример встроенной клавиатуры
|
|-------------------------------------------------------------------------------------------------*/

$.Bot.onText('Встроенная клавиатура.', function() {
    this.send('Пример встроенной клавиатуры.', [
        ['Кнопка 1','button_1'],
        ['Кнопка 2','button_2'],
        ['Кнопка 3','button_3']
    ]);
});

$.Bot.onClick(function() {
    this.send(`Вы кликнули по кнопке:\n"${this.button_id}"`);
    this.complete();
});

//--------------------------------------------------------------------------------------------------
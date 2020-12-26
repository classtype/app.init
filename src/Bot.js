//--------------------------------------------------------------------------------------------------

var Telegraf = require('telegraf').Telegraf;
var Extra = require('telegraf/extra');
var bot = new Telegraf();
var events = [];

//--------------------------------------------------------------------------------------------------

var Bot = class {
// Конструктор
    constructor(ctx, next) {
        this.ctx = ctx;
        this.next = next;
    }
    
/*--------------------------------------------------------------------------------------------------
|
| -> Технические методы
|
|-------------------------------------------------------------------------------------------------*/

    getText(text, count) {
    // Приводим к строке
        text += '';
        
    // Текст не задан
        if (typeof text != 'string' || text == '') {
        // Задаем текст который отправил пользователь
            text = this.text;
        }
        
    // Максимальная длина текста по умолчанию
        count = count||4096;
        
    // Обрезает текст до 4096 символов
    // Это необходимо так как Telegram не будет принимать сообщения привышающие 4096 символов
        text = text.substring(0, 4096);// Первые 4096 символов
        //text = text.substring(text.length - 4096, text.length);// Последние 4096 символов
        
    // Возвращаем обновленный текст
        return text;
    }
    
/*--------------------------------------------------------------------------------------------------
|
| -> Свойства
|
|-------------------------------------------------------------------------------------------------*/

    get message() {
        return this.ctx.message ||
               this.ctx.editedMessage ||
               this.ctx.channelPost ||
               this.ctx.editedChannelPost ||
              (this.ctx.callbackQuery && this.ctx.callbackQuery.message) || {};
    }
    
    get message_id() {
        return this.message.message_id;
    }
    
    get from() {
        return this.ctx.from;
    }
    
    get chat() {
        return this.ctx.chat;
    }
    
    get date() {
        return this.message.date;
    }
    
    get text() {
        return this.message.text;
    }
    
    get command() {
        return this.text && this.text.substring(1);
    }
    
    get match() {
        return this.ctx.match;
    }
    
/*--------------------------------------------------------------------------------------------------
|
| -> Отправляет ответ на запрос пришедший от встроенной клавиатуры
|
|-------------------------------------------------------------------------------------------------*/

// Отправляет ответ без всплывающего уведомления
// это нужно для того чтобы убрать режим ожидания на нажатой кнопке,
// то есть продемонстрировать пользователю, что операция завершена
    complete() {
        return this.ctx.answerCbQuery();
    }
    
// Отправляет ответ в виде всплывающего уведомления без подтверждения
    notification(text) {
        return this.ctx.answerCbQuery(this.getText(text, 1024), false);
    }
    
// Отправляет ответ в виде всплывающего уведомления с подтверждением
    alert(text) {
        return this.ctx.answerCbQuery(this.getText(text, 1024), true);
    }
    
/*--------------------------------------------------------------------------------------------------
|
| -> Работа с сообщениями
|
|-------------------------------------------------------------------------------------------------*/
    
// Удаляет сообщение
    remove(message_id) {
        return this.ctx.deleteMessage(message_id);
    }
    
// Отправляет сообщение
    send(text, keyboard) {
        return this.ctx.reply(this.getText(text), this.extra(keyboard));
    }
    
// Редактирует сообщение
    edit(text, keyboard) {
    // Сообщение с клавиатурой
        if (keyboard) {
            return this.ctx.editMessageText(this.getText(text), this.extra(keyboard));
        }
        
    // Сообщение без клавиатуры
        return this.ctx.editMessageText(this.getText(text));
    }
    
// Extra
    extra(keyboard) {
    // Сообщение без клавиатуры
        if (!keyboard) {
            return;
        }
        
    // Сообщение с клавиатурой
        else {
            return Extra.markup(function(m) {
            // Создаем кнопки
                let buttons = [];
                
            // Одноуровневая клавиатура
                if (!Array.isArray(keyboard[0][0])) {
                    for (let i = 0; i < keyboard.length; i++) {
                        if (keyboard[0][1]) {
                            buttons.push(m.callbackButton(keyboard[i][0], keyboard[i][1]));
                        } else {
                            buttons.push(keyboard[i][0]);
                        }
                    }
                    return keyboard[0][1] ? m.inlineKeyboard(buttons) : m.keyboard(buttons);
                }
                
            // Многоуровненвая клавиатура
                else {
                    for (let i = 0; i < keyboard.length; i++) {
                        let array = [];
                        for (let level in keyboard[i]) {
                            if (keyboard[0][0][1]) {
                                array.push(m.callbackButton(keyboard[i][level][0], keyboard[i][level][1]));
                            } else {
                                array.push(keyboard[i][level][0]);
                            }
                        }
                        buttons.push(array);
                    }
                    return keyboard[0][0][1] ? m.inlineKeyboard(buttons) : m.keyboard(buttons);
                }
            });
        }
    }
};

/*--------------------------------------------------------------------------------------------------
|
| -> Авторизация
|
|-------------------------------------------------------------------------------------------------*/

Bot.authorization = function(ctx, next, callback) {
    if (typeof callback == 'function') {
        var bot = new Bot(ctx, next);
        callback.call(bot, bot);
    }
};

/*--------------------------------------------------------------------------------------------------
|
| -> Запуск бота
|
|-------------------------------------------------------------------------------------------------*/

Bot.launch = function(config) {
// Задаем токен
    bot.token = this.token;
    
// Запускаем слушатели
    for (var i = 0; i < events.length; i++) {
        events[i].call(this);
    }
    
// Вывод ошибок в консоль
    bot.catch(function(err, ctx) {
        $.ErrorLog(err);
    });

// Запуск бота
    bot.launch(config);
    
// Время запуска
    var date = new Date();
    
    var now = {};
    now.day = date.getDate();
    now.month = (date.getMonth() + 1);
    now.year = date.getFullYear();
    now.hours = date.getHours();
    now.minutes = date.getMinutes();
    now.seconds = date.getSeconds();
    
    now.day = (now.day < 10 ? '0' : '') + now.day;
    now.month = (now.month < 10 ? '0' : '') + now.month;
    now.hours = (now.hours < 10 ? '0' : '') + now.hours;
    now.minutes = (now.minutes < 10 ? '0' : '') + now.minutes;
    now.seconds = (now.seconds < 10 ? '0' : '') + now.seconds;
    
// Сообщаем о запуске бота
    console.log($.Colors.green.bold(
        'Бот запущен '+
            now.day+'.'+now.month+'.'+now.year+' в '+
            now.hours+':'+now.minutes+':'+now.seconds+'!'
    ));
};

/*--------------------------------------------------------------------------------------------------
|
| -> Слушатели
|
|-------------------------------------------------------------------------------------------------*/

// Включает тестирование бота
Bot.test = function(callback) {
    events.push(() => {
        bot.on('text', (ctx, next) => {
            Bot.authorization(ctx, next, function() {
                this.send(this.text, [
                    [this.text]
                ]);
                callback.call(this, arguments);
            });
        });
    });
};

// Слушает комманду "/start"
Bot.start = function(callback) {
    events.push(() => {
        bot.start((ctx, next) => {
            Bot.authorization(ctx, next, callback);
        });
    });
};

// Слушает комманду "/help"
Bot.help = function(callback) {
    events.push(() => {
        bot.help((ctx, next) => {
            Bot.authorization(ctx, next, callback);
        });
    });
};

// Слушает комманду "/settings"
Bot.settings = function(callback) {
    events.push(() => {
        bot.settings((ctx, next) => {
            Bot.authorization(ctx, next, callback);
        });
    });
};

// Слушает любой команду
Bot.command = function() {
    events.push(() => {
    // Слушать все комманды
        if (typeof arguments[0] == 'function') {
            bot.on('text', (ctx, next) => {
            // Если прислана НЕ команда то выходим
                if (ctx.message.text[0] !== '/') {
                    return next();
                }
                Bot.authorization(ctx, next, arguments[0]);
            });
        }
        
    // Слушать одну конкретную комманду
        else {
            bot.command(arguments[0], (ctx, next) => {
                Bot.authorization(ctx, next, arguments[1]);
            });
        }
    });
};

// Слушает любой текст
Bot.text = function() {
    events.push(() => {
    // Слушать любой текст
        if (typeof arguments[0] == 'function') {
            bot.on('text', (ctx, next) => {
                Bot.authorization(ctx, next, arguments[0]);
            });
        }
        
    // Слушать один конкретный текст
        else {
            bot.hears(arguments[0], (ctx, next) => {
                Bot.authorization(ctx, next, arguments[1]);
            });
        }
    });
};

// Слушает встроенную клавиатуру
Bot.action = function(trigger, callback) {
    events.push(() => {
        bot.action(trigger, (ctx, next) => {
            Bot.authorization(ctx, next, callback);
        });
    });
};

//--------------------------------------------------------------------------------------------------

module.exports = Bot;

//--------------------------------------------------------------------------------------------------
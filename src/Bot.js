//--------------------------------------------------------------------------------------------------

let Telegraf = require('telegraf').Telegraf;
let Extra = require('telegraf/extra');
let bot = new Telegraf();
let events = [];

//--------------------------------------------------------------------------------------------------

let Bot = class {
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
        
    // Максимальная длина строки по умолчанию
        count = count||4096;
        
    // Обрезаем строку до 4096 символов
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
    
    get button_id() {
        return this.match && this.match[0];
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
    send(text, ...args) {
        return this.ctx.reply(this.getText(text), this.extra(args));
    }
    
// Редактирует сообщение
    edit(text, ...args) {
        return this.ctx.editMessageText(this.getText(text), this.extra(args));
    }

// Extra
    extra(args) {
    // Параметры по умолчанию
        let p = {
            html: false,// Включить html-режим
            resize: false,// Сжать кнопки у клавиатуры
            oneTime: false,// Скрыть клавиатуру после клика
            markdown: false,// Включить markdown-разметку
            webPreview: false,// Включить предпросмотр
            keyboard: false,// Включить клавиатуру
        };
        
    // Проходим по списку аргуметов
        for (let i = 0; i < args.length; i++) {
        // Проходим по параметров
            for (let param in p) {
                if (p[param] == false) {
                    p[param] = (args[i] == param ? true : false);
                }
            }
            
        // Включить клавиатуру
            if (Array.isArray(args[i])) {
                p['keyboard'] = args[i];
            }
        }
        
    // Сообщение без клавиатуры
        if (!p['keyboard']) {
            return;
        }
        
    // Сообщение с клавиатурой
        return Extra
        
    // Html-режим
        .HTML(p['html'])
        
    // Markdown-разметка
        .markdown(p['markdown'])
        
    // Предпросмотр
        .webPreview(p['webPreview'])
        
    // Markup
        .markup(function(m) {
        // Сжимаем кнопки у клавиатуры
            if (p['resize']) {
                m.resize();
            }
            
        // Скрываем клавиатуру после клика
            if (p['oneTime']) {
                m.oneTime();
            }
            
        // Создаем кнопки
            let buttons = [];
            
        // Двухуровневая клавиатура
            if (Array.isArray(p['keyboard'][0][0])) {
                for (let i = 0; i < p['keyboard'].length; i++) {
                    let array = [];
                    for (let level in p['keyboard'][i]) {
                        if (p['keyboard'][0][0][1]) {
                            array.push(m.callbackButton(p['keyboard'][i][level][0], p['keyboard'][i][level][1]));
                        } else {
                            array.push(p['keyboard'][i][level][0]);
                        }
                    }
                    buttons.push(array);
                }
                return p['keyboard'][0][0][1] ? m.inlineKeyboard(buttons) : m.keyboard(buttons);
            }
            
        // Одноуровневая клавиатура
            for (let i = 0; i < p['keyboard'].length; i++) {
                if (p['keyboard'][0][1]) {
                    buttons.push(m.callbackButton(p['keyboard'][i][0], p['keyboard'][i][1]));
                } else {
                    buttons.push(p['keyboard'][i][0]);
                }
            }
            return p['keyboard'][0][1] ? m.inlineKeyboard(buttons) : m.keyboard(buttons);
        });
    }
};

/*--------------------------------------------------------------------------------------------------
|
| -> Авторизация
|
|-------------------------------------------------------------------------------------------------*/

Bot.authorization = function(ctx, next, callback) {
    if (typeof callback == 'function') {
        let bot = new Bot(ctx, next);
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
    for (let i = 0; i < events.length; i++) {
        events[i].call(this);
    }
    
// Вывод ошибок в консоль
    bot.catch(function(err, ctx) {
        $.ErrorLog(err);
    });

// Запуск бота
    bot.launch(config);
    
// Время запуска
    let date = new Date();
    
    let now = {};
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
| -> Обработчики
|
|-------------------------------------------------------------------------------------------------*/

// Обработчик команды "/start"
Bot.onStart = function(callback) {
    events.push(() => {
        bot.start((ctx, next) => {
            Bot.authorization(ctx, next, callback);
        });
    });
};

// Обработчик команды "/help"
Bot.onHelp = function(callback) {
    events.push(() => {
        bot.help((ctx, next) => {
            Bot.authorization(ctx, next, callback);
        });
    });
};

// Обработчик команды "/settings"
Bot.onSettings = function(callback) {
    events.push(() => {
        bot.settings((ctx, next) => {
            Bot.authorization(ctx, next, callback);
        });
    });
};

// Обработчик команд
Bot.onCommand = function() {
    events.push(() => {
    // Слушать все команды
        if (typeof arguments[0] == 'function') {
            bot.on('text', (ctx, next) => {
            // Если прислана НЕ команда то выходим
                if (ctx.message.text[0] !== '/') {
                    return next();
                }
                Bot.authorization(ctx, next, arguments[0]);
            });
        }
        
    // Слушать одну конкретную команду
        else {
            bot.command(arguments[0], (ctx, next) => {
                Bot.authorization(ctx, next, arguments[1]);
            });
        }
    });
};

// Обработчик текста
Bot.onText = function() {
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

// Обработчик кнопок со встроенной клавиатуры
Bot.onClick = function() {
    events.push(() => {
    // Слушать все кнопки
        if (typeof arguments[0] == 'function') {
            bot.action(/.+/, (ctx, next) => {
                Bot.authorization(ctx, next, arguments[0]);
            });
        }
        
    // Слушать одну конкретную кнопку
        else {
            bot.action(arguments[0], (ctx, next) => {
                Bot.authorization(ctx, next, arguments[1]);
            });
        }
    });
};

//--------------------------------------------------------------------------------------------------

module.exports = Bot;

//--------------------------------------------------------------------------------------------------
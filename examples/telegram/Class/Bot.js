//--------------------------------------------------------------------------------------------------

var Telegraf = require('telegraf').Telegraf;
var Extra = require('telegraf/extra');
var bot = new Telegraf(process.env.BOT_TOKEN);

//--------------------------------------------------------------------------------------------------

// Вывод ошибок в консоль
bot.catch(function(err, ctx) {
    $.ErrorLog(err);
});

//--------------------------------------------------------------------------------------------------

$.Bot = {
    
/*--------------------------------------------------------------------------------------------------
|
| -> Авторизация
|
|-------------------------------------------------------------------------------------------------*/

    exec: function(ctx, chat, callback) {
    // Получаем информацию о пользователе
        $.Users.get(chat, function(status, userInfo) {
        // Возвращаем ошибку
            if (status == 'error') {
                console.log(this['error_msg']);
                return;
            }
            
        // Возвращаем информацию о пользователе
            if (typeof callback == 'function') {
                callback(ctx, new $.User(userInfo), Extra);
            }
        });
    },
    
// Слушатель комманды "/start"
    start: function(callback) {
        bot.start(function(ctx) {
            $.Bot.exec(ctx, ctx.update.message.chat, callback);
        });
    },
    
// Слушатель комманды "/help"
    help: function(callback) {
        bot.help(function(ctx) {
            $.Bot.exec(ctx, ctx.update.message.chat, callback);
        });
    },
    
// Слушатель команды
    command: function(command, callback) {
        bot.command(command, function(ctx) {
            $.Bot.exec(ctx, ctx.update.message.chat, callback);
        });
    },
    
// Слушатель строки
    hears: function(string, callback) {
        bot.hears(string, function(ctx) {
            $.Bot.exec(ctx, ctx.update.message.chat, callback);
        });
    },
    
// Слушатель текста
    on: function(trigger, callback) {
        bot.on(trigger, function(ctx) {
            $.Bot.exec(ctx, ctx.update.message.chat, callback);
        });
    },
    
// Слушатель встроенной клавиатуры
    action: function(trigger, callback) {
        bot.action(trigger, function(ctx) {
            $.Bot.exec(ctx, ctx.update.callback_query.message.chat, callback);
        });
    }
};

/*--------------------------------------------------------------------------------------------------
|
| -> Запускает бота
|
|-------------------------------------------------------------------------------------------------*/

process.nextTick(function() {
// Запускаем бота
    bot.launch();
    
// Создаем время запуска
    var date = new Date();
    
    var now = {};
    now.day = date.getDate();
    now.month = (date.getMonth()+1);
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
            now.day+'.'+now.month+'.'+now.year
        +' в '+
            now.hours+':'+now.minutes+':'+now.seconds+'!'
    ));
});

//--------------------------------------------------------------------------------------------------
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
    
/*--------------------------------------------------------------------------------------------------
|
| -> Обработчики для текста
|
|-------------------------------------------------------------------------------------------------*/

    on: function(triggers, callback) {
        bot.on(triggers, function(ctx) {
            $.Bot.exec(ctx, ctx.update.message.chat, callback);
        });
    },
    
/*--------------------------------------------------------------------------------------------------
|
| -> Обработчики для встроенной клавиатуры
|
|-------------------------------------------------------------------------------------------------*/

    action: function(triggers, callback) {
        bot.action(triggers, function(ctx) {
            $.Bot.exec(ctx, ctx.update.callback_query.message.chat, callback);
        });
    },
    
/*--------------------------------------------------------------------------------------------------
|
| -> Запускает бота
|
|-------------------------------------------------------------------------------------------------*/

    launch: function() {
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
    }
};

//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------

// Прототип
$.User.prototype = {};
$.User.name.prototype = {};
$.User.name.name.prototype = {};

$.User.prototype = (arg) => { };
$.User.name.prototype = (arg) => { };

$.User.prototype.id = {};
$.User.name.prototype.id = {};

$.User.prototype.add = (arg) => { };
$.User.name.prototype.add = (arg) => { };

User.prototype = {};
User.name.prototype = {};

User.prototype = (arg) => { };
User.name.prototype = (arg) => { };

User.prototype.id = {};
User.name.prototype.id = {};

User.prototype.add = (arg) => { };
User.name.prototype.add = (arg) => { };

//--------------------------------------------------------------------------------------------------

// Прототип (fake)
$.User.prototypefake = {};
$.User.name.prototypefake = {};

$.User.prototypefake = (arg) => { };
$.User.name.prototypefake = (arg) => { };

$.User.prototypefake.id = {};
$.User.name.prototypefake.id = {};

$.User.prototypefake.add = (arg) => { };
$.User.name.prototypefake.add = (arg) => { };

User.prototypefake = {};
User.name.prototypefake = {};

User.prototypefake = (arg) => { };
User.name.prototypefake = (arg) => { };

User.prototypefake.id = {};
User.name.prototypefake.id = {};

User.prototypefake.add = (arg) => { };
User.name.prototypefake.add = (arg) => { };

//--------------------------------------------------------------------------------------------------

// Вызов
$.User;
$.User();

$.User.id;
$.User.getName();

$.User.name.id;
$.User.name.getName();

User;
User();

User.id;
User.getName();

User.name.id;
User.name.getName();

//--------------------------------------------------------------------------------------------------

// Вызов экземпляра класса
new $.User;
new $.User();

new $.User.add;
new $.User.add();

new $.User.name.add;
new $.User.name.add();

new User;
new User();

new User.add;
new User.add();

new User.name.add;
new User.name.add();

//--------------------------------------------------------------------------------------------------

// Объект
$.User = {
    id: 1,
    add1: (arg) => { },
    add2: function(arg) { },
    add3: function add3(arg) { },
    add4: class { },
    add5: class add5 { },
};

User = {
    id: 1,
    add1: (arg) => { },
    add2: function(arg) { },
    add3: function add3(arg) { },
    add4: class { },
    add5: class add5 { },
};

//--------------------------------------------------------------------------------------------------

// Присвоение
$.User = 123;
$.User.id = 123;
$.User.name.id = 123;

User = 123;
User.id = 123;
User.name.id = 123;

//--------------------------------------------------------------------------------------------------

// Методы
$.User.add1 = (arg) => { };
$.User.name.add1 = (arg) => { };

$.User.add2 = function(arg) { };
$.User.name.add2 = function(arg) { };

$.User.add3 = function add3(arg) { };
$.User.name.add3 = function add3(arg) { };

$.User.add4 = class { };
$.User.name.add4 = class { };

$.User.add5 = class add5 { };
$.User.name.add5 = class add5 { };

User.add1 = (arg) => { };
User.name.add1 = (arg) => { };

User.add2 = function(arg) { };
User.name.add2 = function(arg) { };

User.add3 = function add3(arg) { };
User.name.add3 = function add3(arg) { };

User.add4 = class { };
User.name.add4 = class { };

User.add5 = class add5 { };
User.name.add5 = class add5 { };

//--------------------------------------------------------------------------------------------------

// Функции
add1 = (arg) => { };
add2 = function(arg) { };
add3 = function add3(arg) { };
add4 = class { };
add5 = class add5 { };

//--------------------------------------------------------------------------------------------------

$.User = class {
    constructor(arg) {
        this.id;
    }
    method_name(arg) {
        this.id;
    }
    function(arg) {
        this.id;
    }
    functionfake(arg) {
        this.id;
    }
    fakefunction(arg) {
        this.id;
    }
};

User = class {
    constructor(arg) {
        this.id;
    }
    method_name(arg) {
        this.id;
    }
    function(arg) {
        this.id;
    }
    functionfake(arg) {
        this.id;
    }
    fakefunction(arg) {
        this.id;
    }
};

//--------------------------------------------------------------------------------------------------

class User {
    constructor(arg) {
        this.id;
    }
    method_name(arg) {
        this.id;
    }
    function(arg) {
        this.id;
    }
    functionfake(arg) {
        this.id;
    }
    fakefunction(arg) {
        this.id;
    }
};

//--------------------------------------------------------------------------------------------------

// Стрелочные функции
(arg1, arg2);
( ) => { };
( arg) => { };
(arg ) => { };
( arg ) => { };
(arg1, arg2) => { };
(arg1 , arg2) => { };
(arg = 1) => { };
(arg = 1) => arg;

//--------------------------------------------------------------------------------------------------

// this
this;
this.name;
this.name.name;

this();
this.name();
this.name.name();

//--------------------------------------------------------------------------------------------------

let a = class {
    name() {
        
    }
    name(asdad) {
        
    }
    name(asdads) {
        
    }
};

//--------------------------------------------------------------------------------------------------

// Глобальные объекты
Symbol();

clearImmediate(immediateObject);
clearInterval(intervalObject);
clearTimeout(timeoutObject);

setImmediate(() => {});
setInterval(() => {}, 1000);
setTimeout(() => {}, 1000);

queueMicrotask(() => {});

require();
require.cache;
require.extensionsdeprecated;
require.resolve();

__dirname;
__filename;

console.log();

exports;
global;
GLOBAL;
module;
process;
root;

//--------------------------------------------------------------------------------------------------

_= 'Hello World!';

//--------------------------------------------------------------------------------------------------

// Цвета
alert;     // support.function
undefined; // support.constant
arguments; // variable.language
debugger;  // storage.type

//--------------------------------------------------------------------------------------------------
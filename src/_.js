/*--------------------------------------------------------------------------------------------------

// Строка
_`Hello world!`               // Вывод в консоль: Hello world!
_='Hello world!'              // Вывод в консоль: Hello world!
_("Hello world!")             // Вывод в консоль: Hello world!

// Число
_`${123456}`                  // Вывод в консоль: 123456
_=123456                      // Вывод в консоль: 123456
_(123456)                     // Вывод в консоль: 123456

// Переменная
let value = class {};
_`${value}`                   // Вывод в консоль: [class value]
_=value                       // Вывод в консоль: [class value]
_(value)                      // Вывод в консоль: [class value]

// Объект
_`${{ name:"John", age:25 }}` // Вывод в консоль: { name: 'John', age: 25 }
_={ name:"John", age:25 }     // Вывод в консоль: { name: 'John', age: 25 }
_({ name:"John", age:25 })    // Вывод в консоль: { name: 'John', age: 25 }

// Класс
_`${class {}}`                // Вывод в консоль: [class (anonymous)]
_=class {}                    // Вывод в консоль: [class _]
_(class {})                   // Вывод в консоль: [class (anonymous)]

// Стрелочная функция
_`${() => {}}`                // Вывод в консоль: [Function]
_=() => {}                    // Вывод в консоль: [Function: _]
_(() => {})                   // Вывод в консоль: [Function]

// Неопределённый тип
_`${undefined}`               // Вывод в консоль: undefined
_=undefined                   // Вывод в консоль: undefined
_(undefined)                  // Вывод в консоль: undefined

// Булев
_`${false}`                   // Вывод в консоль: false
_=false                       // Вывод в консоль: false
_(false)                      // Вывод в консоль: false

// Null
_`${null}`                    // Вывод в консоль: null
_=null                        // Вывод в консоль: null
_(null)                       // Вывод в консоль: null

--------------------------------------------------------------------------------------------------*/

// Переопределяем "_"
Object.defineProperty(global, '_', {
    set: (log) => {
        console.log(log);
    },
    get: () => {
        return (...args) => {
            if (!Array.isArray(args[0])) {
                console.log(args[0]);
                return;
            }
            
            let result = '';
            
            for (let i = 1; i < args.length; i++) {
                result += args[i] + args[0][i];
            }
            
            result = args[0][0] + result;
            
        // Для правильного вывода других типов
        // все кроме строк, например чисел
            console.log(result+'' == args[1]+'' ? args[1] : result);
        };
    }
});

//--------------------------------------------------------------------------------------------------
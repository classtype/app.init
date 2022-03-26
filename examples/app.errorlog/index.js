//--------------------------------------------------------------------------------------------------

require('../../src/app.init.js')(
    // 'module_no_found'        // Cannot find module
    // './examples/001.js'      // Cannot find module
    // './examples/002.js'      // ENOENT: no such file or directory, scandir
    // './examples/003.js'      // ENOENT: no such file or directory, open
    // './examples/004.js'      // ENOENT: no such file or directory, readlink
    // './examples/005.js'      // Error list
    // './examples/006.await.js'// await is only valid in async function
    // './examples/007.eval.js' // f is not defined
    // './examples/008.js'      // Maximum call stack size exceeded
    // './examples/009.js'      // Cannot set property 'value' of undefined
    // './examples/010.js'      // foo is not defined
    // './examples/011.js'      // Unexpected identifier
    // './examples/012.js'      // Unexpected token '{'
    // './examples/013.js'      // Unexpected token '}'
    // './examples/014.js'      // Unexpected end of input
    // './examples/015.js'      // Unexpected token ')'
    // './examples/016.js'      // Invalid or unexpected token
    // './examples/017.js'      // Promise resolver undefined is not a function
    // './examples/018.js'      // SyntaxError
    // './examples/019.js'      // Unexpected token }
    './examples/020.js'         // method_error
);

//--------------------------------------------------------------------------------------------------
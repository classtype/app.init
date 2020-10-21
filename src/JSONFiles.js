//--------------------------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');
var ErrorLog = require('./ErrorLog');// Выводит ошибку в консоль

//--------------------------------------------------------------------------------------------------

module.exports = function(_path) {
    
/*--------------------------------------------------------------------------------------------------
|
| -> Переменные
|
|-------------------------------------------------------------------------------------------------*/

    var _t = this;// Указатель
    var _pathStorage = path.join(path.dirname(process.mainModule.filename), _path+'');// Путь к файлам
    
/*--------------------------------------------------------------------------------------------------
|
| -> Error
|
|-------------------------------------------------------------------------------------------------*/

    var _error = function(path, err, error_code, error_msg, callback) {
        callback.call({
            path: path,
            error_code: error_code,
            error_msg: error_msg+'\nПуть: "'+path+'"',
            err: err
        }, 'error');
    };
    
/*--------------------------------------------------------------------------------------------------
|
| -> Add
|
|-------------------------------------------------------------------------------------------------*/

    _t.add = function(fileName, _json, callback) {
        var error_code = 0;
        var error_msg = '';
        
        fs.stat(_pathStorage, function(err, stats) {
            if (err) {
                error_code = 101;
                error_msg = 'Каталог не найден!';
                return _error(_pathStorage, err, error_code, error_msg, callback);
            }
            
            var _path = path.join(_pathStorage, fileName+'');
            var _source = JSON.stringify(_json);
            
            fs.stat(_path, function(err, stats) {
                if (!err) {
                    if (stats.isFile()) {
                        error_code = 102;
                        error_msg = 'Файл с таким именем уже существует!';
                        return _error(_path, err, error_code, error_msg, callback);
                    }
                    
                    if (stats.isDirectory()) {
                        error_code = 103;
                        error_msg = 'Каталог с таким именем уже существует!';
                        return _error(_path, err, error_code, error_msg, callback);
                    }
                    
                    error_code = 104;
                    error_msg = 'Неизвестная ошибка #1!';
                    return _error(_path, err, error_code, error_msg, callback);
                }
                
                fs.writeFile(_path, _source, 'utf8', function(err) {
                    if (err) {
                        error_code = 105;
                        error_msg = 'Неизвестная ошибка #2!';
                        return _error(_path, err, error_code, error_msg, callback);
                    }
                    callback.call({path: _path, json: _json, source: _source}, 'good');
                });
            });
        });
    };
    
/*--------------------------------------------------------------------------------------------------
|
| -> Del
|
|-------------------------------------------------------------------------------------------------*/

    _t.del = function(fileName, callback) {
        var error_code = 0;
        var error_msg = '';
        
        fs.stat(_pathStorage, function(err, stats) {
            if (err) {
                error_code = 201;
                error_msg = 'Каталог не найден!';
                return _error(_pathStorage, err, error_code, error_msg, callback);
            }
            
            var _path = path.join(_pathStorage, fileName+'');
            
            fs.stat(_path, function(err, stats) {
                if (err || !stats.isFile()) {
                    error_code = 202;
                    error_msg = 'Файл не найден!';
                    return _error(_path, err, error_code, error_msg, callback);
                }
                
                fs.unlink(_path, function(err) {
                    callback.call({path: _path}, 'good');
                });
            });
        });
    };
    
/*--------------------------------------------------------------------------------------------------
|
| -> GET
|
|-------------------------------------------------------------------------------------------------*/

    _t.get = function(fileName, callback) {
        var error_code = 0;
        var error_msg = '';
        
        fs.stat(_pathStorage, function(err, stats) {
            if (err) {
                error_code = 301;
                error_msg = 'Каталог не найден!';
                return _error(_pathStorage, err, error_code, error_msg, callback);
            }
            
            var _path = path.join(_pathStorage, fileName+'');
            
            fs.stat(_path, function(err, stats) {
                if (err || !stats.isFile()) {
                    error_code = 302;
                    error_msg = 'Файл не найден!';
                    return _error(_path, err, error_code, error_msg, callback);
                }
                
                fs.readFile(_path, 'utf8', function(err, _source) {
                    try {
                        var _json = JSON.parse(_source);
                    }
                    
                    catch (e) {
                        ErrorLog(e);
                        error_code = 303;
                        error_msg = 'Файл содержит не правильный JSON!';
                        return _error(_path, err, error_code, error_msg, callback);
                    }
                    
                    callback.call({path: _path, json: _json, source: _source}, 'good', _json, _source, _path);
                });
            });
        });
    };
    
/*--------------------------------------------------------------------------------------------------
|
| -> Set
|
|-------------------------------------------------------------------------------------------------*/

    _t.set = function(fileName, _json, callback) {
        var error_code = 0;
        var error_msg = '';
        
        fs.stat(_pathStorage, function(err, stats) {
            if (err) {
                error_code = 401;
                error_msg = 'Каталог не найден!';
                return _error(_pathStorage, err, error_code, error_msg, callback);
            }
            
            var _path = path.join(_pathStorage, fileName+'');
            var _source = JSON.stringify(_json);
            
            fs.stat(_path, function(err, stats) {
                if (err || !stats.isFile()) {
                    error_code = 402;
                    error_msg = 'Файл не найден!';
                    return _error(_path, err, error_code, error_msg, callback);
                }
                
                fs.writeFile(_path, _source, 'utf8', function(err) {
                    if (err) {
                        error_code = 403;
                        error_msg = 'Неизвестная ошибка!';
                        return _error(_path, err, error_code, error_msg, callback);
                    }
                    callback.call({path: _path, json: _json, source: _source}, 'good');
                });
            });
        });
    };
};

//--------------------------------------------------------------------------------------------------
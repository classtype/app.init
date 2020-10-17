//--------------------------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');

//--------------------------------------------------------------------------------------------------

module.exports = function(_path) {
    
/*--------------------------------------------------------------------------------------------------
|
| -> Переменные
|
|-------------------------------------------------------------------------------------------------*/

    var _t = this;// Указатель
    var _pathStorage = path.join(path.dirname(process.mainModule.filename), _path);// Путь к файлам
    
/*--------------------------------------------------------------------------------------------------
|
| -> Error
|
|-------------------------------------------------------------------------------------------------*/

    _t.Error = function(path, err, error_msg, callback) {
        callback.call({
            path: path,
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
        var error_msg = '';
        
        fs.stat(_pathStorage, function(err, stats) {
            if (err) {
                error_msg = 'Каталог не найден!';
                return _t.Error(_pathStorage, err, error_msg, callback);
            }
            
            var _path = path.join(_pathStorage, fileName);
            var _source = JSON.stringify(_json);
            
            fs.stat(_path, function(err, stats) {
                if (!err) {
                    if (stats.isFile()) {
                        error_msg = 'Файл с таким именем уже существует!';
                        return _t.Error(_path, err, error_msg, callback);
                    }
                    
                    if (stats.isDirectory()) {
                        error_msg = 'Каталог с таким именем уже существует!';
                        return _t.Error(_path, err, error_msg, callback);
                    }
                    
                    error_msg = '1Неизвестная ошибка!';
                    return _t.Error(_path, err, error_msg, callback);
                }
                
                fs.writeFile(_path, _source, 'utf8', function(err) {
                    if (err) {
                        error_msg = '2Неизвестная ошибка!';
                        return _t.Error(_path, err, error_msg, callback);
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
        fs.stat(_pathStorage, function(err, stats) {
            if (err) {
                error_msg = 'Каталог не найден!';
                return _t.Error(_pathStorage, err, error_msg, callback);
            }
            
            var _path = path.join(_pathStorage, fileName);
            
            fs.stat(_path, function(err, stats) {
                if (err || !stats.isFile()) {
                    error_msg = 'Файл не найден!';
                    return _t.Error(_path, err, error_msg, callback);
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
        fs.stat(_pathStorage, function(err, stats) {
            if (err) {
                error_msg = 'Каталог не найден!';
                return _t.Error(_pathStorage, err, error_msg, callback);
            }
            
            var _path = path.join(_pathStorage, fileName);
            
            fs.stat(_path, function(err, stats) {
                if (err || !stats.isFile()) {
                    error_msg = 'Файл не найден!';
                    return _t.Error(_path, err, error_msg, callback);
                }
                
                fs.readFile(_path, 'utf8', function(err, _source) {
                    try {
                        var _json = JSON.parse(_source);
                        callback.call({path: _path, json: _json, source: _source}, 'good', _json, _source, _path);
                    }
                    
                    catch (e) {
                        error_msg = 'Файл содержит не правильный JSON!';
                        return _t.Error(_path, err, error_msg, callback);
                    }
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
        fs.stat(_pathStorage, function(err, stats) {
            if (err) {
                error_msg = 'Каталог не найден!';
                return _t.Error(_pathStorage, err, error_msg, callback);
            }
            
            var _path = path.join(_pathStorage, fileName);
            var _source = JSON.stringify(_json);
            
            fs.stat(_path, function(err, stats) {
                if (err || !stats.isFile()) {
                    error_msg = 'Файл не найден!';
                    return _t.Error(_path, err, error_msg, callback);
                }
                
                fs.writeFile(_path, _source, 'utf8', function(err) {
                    if (err) {
                        error_msg = 'Неизвестная ошибка!';
                        return _t.Error(_path, err, error_msg, callback);
                    }
                    callback.call({path: _path, json: _json, source: _source}, 'good');
                });
            });
        });
    };
    
//--------------------------------------------------------------------------------------------------

};

//--------------------------------------------------------------------------------------------------
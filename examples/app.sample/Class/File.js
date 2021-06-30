/*--------------------------------------------------------------------------------------------------
|
| -> Init
|
|-------------------------------------------------------------------------------------------------*/

var Storage = new $.File('./Storage');

/*--------------------------------------------------------------------------------------------------
|
| -> Add
|
|-------------------------------------------------------------------------------------------------*/

Storage.add('id1', {name:'Mick', level:5}, function(status) {
    console.log('--------------------');
    
    if (status == 'error') {
        console.log('Ошибка! '+this.error_msg);
        return;
    }
    
    console.log('Файл "'+this.path+'" создан!');
});

Storage.add('id2', {name:'Jonni', level:6}, function(status) {
    console.log('--------------------');
    
    if (status == 'error') {
        console.log('Ошибка! '+this.error_msg);
        return;
    }
    
    console.log('Файл "'+this.path+'" создан!');
});

/*--------------------------------------------------------------------------------------------------
|
| -> Set
|
|-------------------------------------------------------------------------------------------------*/

Storage.set('id1', {name:'Mick', level:7}, function(status) {
    console.log('--------------------');
    
    if (status == 'error') {
        console.log('Ошибка! '+this.error_msg);
        return;
    }
    
    console.log('Файл "'+this.path+'" изменен!');
});

/*--------------------------------------------------------------------------------------------------
|
| -> Get
|
|-------------------------------------------------------------------------------------------------*/

Storage.get('id1', function(status, json) {
    console.log('--------------------');
    
    if (status == 'error') {
        console.log('Ошибка! '+this.error_msg);
        return;
    }
    
    console.log(this.path);
    console.log(json['name']);// Mick
    console.log(json['level']);// 7
});

Storage.get('id2', function(status, json) {
    console.log('--------------------');
    
    if (status == 'error') {
        console.log('Ошибка! '+this.error_msg);
        return;
    }
    
    console.log(this.path);
    console.log(json['name']);// Jonni
    console.log(json['level']);// 6
});

/*--------------------------------------------------------------------------------------------------
|
| -> Del
|
|-------------------------------------------------------------------------------------------------*/
/*
Storage.del('id2', function(status) {
    console.log('--------------------');
    
    if (status == 'error') {
        console.log('Ошибка! '+this.error_msg);
        return;
    }
    
    console.log('Файл "'+this.path+'" удален!');
});
*/
//--------------------------------------------------------------------------------------------------
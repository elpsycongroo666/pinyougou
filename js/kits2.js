let kits = {};
kits.getArray = function(key){
    let jsStr = localStorage.getItem(key);
    let arr;
    if(jsStr === null){
        arr = [];
    }else{
        arr = JSON.parse(jsStr);
    }
    return arr;
}
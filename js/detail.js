$(() => {
    // 先获取地址栏的id
    // 获取出来的id是字符串形式 转换成int
    let id = parseInt(location.search.substring(4));

    // 当id对应的时候 要将页面中的图片和价格等东西变成对应的
    // 有一个方法 可以直接获得find(function(e,i){条件});
    // 查找满足条件的元素
    // console.log(123);
    let obj = phoneData.find(e => {
        return e.pID === id;
    });
    console.log(obj);
    // 修改图片
    $('.preview-img img').attr('src', obj.imgSrc);
    // 修改文字描述
    $('.sku-name').text(obj.name);
    // 修改价格
    $('.summary-price em').text('￥' + obj.price);

    // debugger
    // 获取文本域内容
    let text = $('.choose-number');
    // 获取减号
    let reduceBtn = $('.reduce')
    // 获取加号
    let addBtn = $('.add');
    // 点击+号
    addBtn.on('click', function () {
        let old = parseInt(text.val());
        old++;
        text.val(old);
        if (old > 1) {
            reduceBtn.removeClass('disabled');
        }
    })

    // 点击-号
    reduceBtn.on('click', function () {
        let old = text.val();
        if (old = 1) {
            return;
        }
        old--;
        if (old <= 1) {
            reduceBtn.addClass('disabled');
        }
        text.val(old);
    })



    
})

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
    // console.log(obj);
    // 修改图片
    $('.preview-img img').attr('src', obj.imgSrc);
    // 修改文字描述
    $('.sku-name').text(obj.name);
    // 修改价格
    $('.summary-price em').text('￥' + obj.price);


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


    // 点击实现添加进入购物车
    $('.addshopcar').on('click', function () {
        // 要将对应id的图片 名字 单价 数量 存入本地中
        // 因为不知道会加入多少个商品 所以 我们要用一个数组存起来
        // 获取商品数量 就是获取文本域内容 并且转换成数字类型
        let number = parseInt($('.choose-number').val());
        // let arr = [];//这里不能这样设置 不然每次点击的时候 都会把原来数组的内容都变成空数组
        // 要先把本地的内容读取出来
        let jsonStr = localStorage.getItem('shopCartData');
        let arr;
        if (jsonStr === null) {
            arr = [];
        } else {
            arr = JSON.parse(jsonStr);
        }
        // 为了不让相同商品在购物车中创建多次
        // 我们就要把他没次点的相同的商品变成数量叠加起来
        // 使用find方法， 该方法如果找到了该元素就会返回该元素 没有找到就会返回undefined
        let isExit = arr.find(e => {
            return e.pID === id;
        })
        if (isExit !== undefined) {//如果没有返回undefined那就代表本地中有相同商品 叠加数量
            isExit.number += number;
        } else {//否则 就将创建一个新的商品对象
            let goods = {
                pID: obj.pID,
                img: obj.imgSrc,
                name: obj.name,
                price: obj.price,
                number: number
            }
            arr.push(goods);    
        }
        // 转换成json字符串
        jsonStr = JSON.stringify(arr);//记得这里不用再次声明jsonstr
        localStorage.setItem('shopCartData', jsonStr);
        // 点击之后跳转到购物车页面进行结算
        location.href = 'cart.html';
    })
})

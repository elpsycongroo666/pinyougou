/*
我们在做项目的时候 会积累一些 公共的代码 会写到一些公共的js里面
*/



// 计算购物车里面的商品总数就属于在多个页面都用的代码 - 提取到一个新的js里面

$(() => {
    // 先从本地获取数据
    let arr = kits.getArray('shopCartData');
    // 把arr遍历
    let totalCount = 0;
    arr.forEach(e => {
        totalCount += e.number;
    });
    // 获取元素
    $('.count').text(totalCount);
})
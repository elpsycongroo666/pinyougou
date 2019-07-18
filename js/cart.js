$(() => {
  // 把购物车中的数据从本地存储里读取出来
  let jsonStr = localStorage.getItem('shopCartData');
  // 判断jsonStr是否为null如果是null就没有数据，如果不是null的话就是有数据，并且把数据添加到页面中，需要生成商品列表
  let arr;
  if (jsonStr !== null) {
    arr = JSON.parse(jsonStr);
    let html = '';
    // 遍历数组
    arr.forEach(e => { //这里加个data-id 自定义属性 为了判断选中的物品 是不是对应 本地存储的
      html += `<div class="item" data-id="${e.pID}"> 
      <div class="row">
        <div class="cell col-1 row">
          <div class="cell col-1">
            <input type="checkbox" class="item-ck" checked="">
          </div>
          <div class="cell col-4">
            <img src="${e.img}" alt="">
          </div>
        </div>
        <div class="cell col-4 row">
          <div class="item-name">${e.name}</div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="price">${e.price}</em>
        </div>
        <div class="cell col-1 tc lh70">
          <div class="item-count">
            <a href="javascript:void(0);" class="reduce fl">-</a>
            <input autocomplete="off" type="text" class="number fl" value="${e.number}">
            <a href="javascript:void(0);" class="add fl">+</a>
          </div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="computed">${e.price * e.number}</em>
        </div>
        <div class="cell col-1">
          <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
        </div>
      </div>
    </div>`
    });
    // 把html格式的字符串，放到div里面
    $('.item-list').html(html);
    // 把空空如也隐藏
    $('.empty-tip').hide();
    // 把表头+总价显示
    $('.cart-header').removeClass('hidden');
    $('.total-of').removeClass('hidden');
  }

  // 计算总价和数量
  // 考虑到我们删除的时候也要用到id  所以我们就用 包含着 多选框 和 删除按钮 的父元素 设置了一个自定义id
  let totalCount = 0;
  let totalMoney = 0;
  // 当我们选中物品的时候 就计算 没选中的时候 就不算   
  // input[type="checkbox"] 多选 : ckecked选中的情况下
  $('.item-list input[type=checkbox]:checked').each((i, e) => { //获取回来的是一个伪数组 
    // console.log(e);
    let id = parseInt($(e).parents('.item').attr('data-id'));
    // console.log(id);
    arr.forEach(e => { 
      if (e.pID === id) {
        totalCount += e.number;
        totalMoney += e.number * e.price;
      }
    })
  }); //=>这里获取回来的是字符串形式
  // 判断这个id与我们获取本地的是否一致 一致的话就计算

  // 修改数量和总价
  $('.selected').text(totalCount);
  $('.total-money').text(totalMoney);





})
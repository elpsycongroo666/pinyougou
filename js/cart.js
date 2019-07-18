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
  function getMoneyAndCount() {
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
  }



  // 实现全选和全不选 其实应该使用事件委托来做 因为 这些都是动态生成的 如果不用的话 我们到时候 从服务器传来的数据 就会出错
  $('.pick-all').on('click', function () {
    // 获取当前按钮的状态
    let status = $(this).prop('checked');
    // 将状态赋予其他子按钮
    $('.item-ck').prop('checked', status);
    // 还要结算的全选也带上
    $('.pick-all').prop('checked', status);
    // 每次点击完都要计算当前页面中的价格 所以我们把计算总价和总数的过程封装成函数 在调用
    getMoneyAndCount();
  })


  // 实现单选按钮
  $('.item-ck').on('click', function () {
    // 在jq中checked有个属性 可以获得当前选中多少个按钮 以length的形式获得
    let isAll = $('.item-ck:checked').length === $('.item-ck').length; //返回的是true 或者false
    // 将这个状态赋给全选按钮就可以了
    $('.pick-all').prop('checked', isAll);
    // 每次点击完都要计算当前页面中的价格 所以我们把计算总价和总数的过程封装成函数 在调用
    getMoneyAndCount();
  })

})
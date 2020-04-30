//取消小数点后末尾的零
const formatPrice = price => {
  const arr = price.toString().split(".");
  let num = parseInt(arr[1]);
  if (isNaN(num) || num === 0) {
    return arr[0];
  }
  return parseInt(arr[0]) + num / 100;
};

//阻止冒泡
const stopPropagation = (e, List) => {
  e = e || window.event;
  e.stopPropagation();
  const goodsId = parseInt(e.target.dataset.goodsId);
  let goods, key;
  List.forEach((item, index) => {
    for (let key in item) {
      if (item[key] === goodsId) {
        goods = item;
      }
    }
    key = index;
  });
  return { goods, key };
};

export { formatPrice, stopPropagation };

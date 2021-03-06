import { config } from "@/config/config";
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

// 格式化日期
function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}

const validate = function(data, validateObject) {
  for (let key in data) {
    if (Reflect.has(validateObject, key)) {
      const res = validateObject[key](data[key], data.password);
      if (res.error !== 0) {
        return res;
      }
    }
  }
  return { error: 0 };
};

const getOrderStatus = function(status) {
  const statusOptions = getConfig("order.status");
  return statusOptions[status] || "";
};

const getConfig = function(name, arr = config) {
  if (name.includes(".")) {
    const k1 = name.slice(0, name.indexOf("."));
    const s1 = name.slice(name.indexOf(".") + 1);
    return getConfig(s1, arr[k1]);
  } else {
    return arr[name];
  }
};

export {
  getConfig,
  formatPrice,
  stopPropagation,
  dateFormat,
  validate,
  getOrderStatus
};

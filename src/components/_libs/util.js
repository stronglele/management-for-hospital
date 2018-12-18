// 获取cookie、
export function getCookie (name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (document.cookie.match(reg)) {
    return document.cookie.match(reg)[2]
  } else {
    return null
  }
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie (Cname, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = Cname + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 删除cookie
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

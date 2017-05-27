'use strict';

angular.module('xbertsApp')
  .filter('decode', function () {
    return function (items, code) {
      var item = "";
      if (code) {
        code = Number(code);
        for (var i = 0; i < items.length; i++) {
          if (Number(items[i].id) === code) {
            item = items[i].name;
          }
        }
      }
      return item
    };
  })
  .filter('decode_', function () {
    return function (code, dicts,_default) {
      var name = _default || '';
      if (code) {
        for (var i = 0; i < dicts.length; i++) {
          if (dicts[i].code === code) {
            name = dicts[i].name;
          }
        }
      }
      return name
    };
  })
  .filter('url', function () {
    var n_link;
    return function (link) {
      if (link) {
        var r = new RegExp("^http");

        if (r.test(link)) {
          n_link = link;
        } else {
          n_link = "https://" + link;
        }
      } else {
        n_link = link;
      }

      return n_link
    };
  }).
  filter('isLink', function () {
    return function checkeURL(URL){
      var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
      "?(([0-9a-z_!~*'().&= $%-] : )?[0-9a-z_!~*'().&= $%-] @)?" //ftp的user@
      "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      "|" // 允许IP和DOMAIN（域名）
      "([0-9a-z_!~*'()-] \.)*" // 域名- www.
      "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
      "[a-z]{2,6})" // first level domain- .com or .museum
      "(:[0-9]{1,4})?" // 端口- :80
      "((/?)|" // a slash isn't required if there is no file name
      "(/[0-9a-z_!~*'().;?:@&= $,%#-] ) /?)$";
      var re=new RegExp(strRegex);
      //re.test()
      if (re.test(URL)){
        return (true);
      }else{
        return (false);
      }
    };
  })
  .filter('doubleDigit', function () {
    return function (number) {
      if (number < 10) {
        return '0' + number.toString();
      }
      return number
    };
  })
  .filter('percentage', function () {
    return function (number) {
       var v= Number(number);
      return isNaN(v) ? 0 : Math.round(number * 100);
    };
  })
  .filter('reduceSentence', function () {
    var _str;
    return function (str,length) {
      _str = str.length < length? str : str.substr(0,length);
      return _str;
    };
  });

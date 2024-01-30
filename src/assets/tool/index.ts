const baseURL = "http://localhost:80"
// const baseURL="http://43.136.79.191:3000"

const baseImg = baseURL + "/api/upload/"

// const imgdefault=`${baseURL}/assets/images/1.jpg`
// const newimg=`${baseURL}/assets/images/id.jpg`
// const imgnull =`${baseURL}/assets/images/null.png`
const imgdefault = `/assets/images/1.jpg`
const newimg = `/assets/images/id.jpg`
const imgnull = `/assets/images/null.png`
const random = Math.floor(Math.random() * 10);

const bgList = [
  '#bc99c4',
  '#5961F9',
  '#ff9a9e',
  '#4C83FF',
  '#32CCBC',
  '#00EAFF',
  '#9F44D3',
  '#0396FF',
  '#F067B4',
  '#FA742B'
]
const rgbaList = [
  {
    color: "#2997f7",
    bg: 'rgba(41, 151, 247, 0.1)'
  },
  {
    color: "#ff6f06",
    bg: 'rgba(255, 111, 6, 0.1)'
  },
  {
    color: "#18a52a",
    bg: 'rgba(18, 185, 40, 0.1)'
  },
]
const randomColor = bgList[random]

const DateFormatPipe = (date: Date, type: String) => {
  if (date) {
    let year, month, day, HH, mm, ss;
    let time = new Date(date);
    let timeDate;
    year = time.getFullYear(); // 年
    month = time.getMonth() + 1; // 月
    day = time.getDate(); // 日
    HH = time.getHours(); // 时
    mm = time.getMinutes(); // 分
    ss = time.getSeconds(); // 秒

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    HH = HH < 10 ? '0' + HH : HH; // 时
    mm = mm < 10 ? '0' + mm : mm; // 分
    ss = ss < 10 ? '0' + ss : ss; // 秒

    switch (type) {
      case 'yyyy':
        timeDate = String(year);
        break;
      case 'yyyy-MM':
        timeDate = year + '-' + month;
        break;
      case 'yyyy-MM-dd':
        timeDate = year + '-' + month + '-' + day;
        break;
      case 'yyyy/MM/dd':
        timeDate = year + '/' + month + '/' + day;
        break;
      case 'yyyy-MM-dd HH:mm:ss':
        timeDate = year + '-' + month + '-' + day + ' ' + HH + ':' + mm + ':' + ss;
        break;
      case 'yyyy年MM月dd日HH:mm:ss':
        timeDate = year + '年' + month + '月' + day +'日'+ ' ' + HH + ':' + mm + ':' + ss;
        break;
      case 'HH:mm:ss':
        timeDate = HH + ':' + mm + ':' + ss;
        break;
      case 'MM':
        timeDate = String(month);
        break;
      default:
        timeDate = year + '-' + month + '-' + day;
        break;
    }
    return timeDate;
  } else {
    return '';
  }
};



function lodinimg(event: any) {
  event.target.src = `${baseURL}/uploads/id.jpg`
}




function diaplayTime(data: any) {
  //将字符串转换成时间格式
  let timePublish: any = new Date(data);
  let timeNow: any = new Date();
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let month = day * 30;
  let year = month * 12;
  let diffValue: any = timeNow - timePublish;
  let diffMonth: any = diffValue / month;
  let diffWeek: any = diffValue / (7 * day);
  let diffDay: any = diffValue / day;
  let diffHour: any = diffValue / hour;
  let diffMinute: any = diffValue / minute;
  let diffYear: any = diffValue / year;
  let result
  if (diffValue < minute) {
    result = "刚刚发表";
  } else if (diffYear > 1) {
    result = parseInt(diffYear) + "年前";
  } else if (diffMonth > 1) {
    result = parseInt(diffMonth) + "月前";
  } else if (diffWeek > 1) {
    result = parseInt(diffWeek) + "周前";
  } else if (diffDay > 1) {
    result = parseInt(diffDay) + "天前";
  } else if (diffHour > 1) {
    result = parseInt(diffHour) + "小时前";
  } else if (diffMinute > 1) {
    result = parseInt(diffMinute) + "分钟前";
  } else {
    result = "刚刚发表";
  }
  return result;
};


//获取操作系统
let getUserOsInfo = function () {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Windows NT 10.0") !== -1) return "Windows 10";
  if (userAgent.indexOf("Windows NT 6.2") !== -1) return "Windows 8";
  if (userAgent.indexOf("Windows NT 6.1") !== -1) return "Windows 7";
  if (userAgent.indexOf("Windows NT 6.0") !== -1) return "Windows Vista";
  if (userAgent.indexOf("Windows NT 5.1") !== -1) return "Windows XP";
  if (userAgent.indexOf("Windows NT 5.0") !== -1) return "Windows 2000";
  if (userAgent.indexOf("Mac") !== -1) return "Mac/iOS";
  if (userAgent.indexOf("X11") !== -1) return "UNIX";
  if (userAgent.indexOf("Linux") !== -1) return "Linux";
  return "Other";
}





//获取浏览器信息
let getBrowserType = function () {
  let ua = navigator.userAgent.toLocaleLowerCase()
  let browserType = null
  if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    browserType = 'IE'
  } else if (ua.match(/firefox/) != null) {
    browserType = 'firefox'
  } else if (ua.match(/ucbrowser/) != null) {
    browserType = 'UC'
  } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
    browserType = 'opera'
  } else if (ua.match(/bidubrowser/) != null) {
    browserType = 'baidu'
  } else if (ua.match(/metasr/) != null) {
    browserType = 'sougou'
  } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
    browserType = 'QQ'
  } else if (ua.match(/maxthon/) != null) {
    browserType = 'maxthon'
  } else if (ua.match(/edg/) != null) {
    return browserType = 'Microsoft Edge'
  } else if (ua.match(/chrome/) != null) {

    return browserType = 'Chrome'

  } else if (ua.match(/safari/) != null) {
    return browserType = 'Safari'
  } else {
    browserType = 'others'
  }
  return browserType
}



export default {
  baseURL,
  imgdefault,
  imgnull,
  newimg,
  DateFormatPipe,
  diaplayTime,
  lodinimg,
  baseImg,
  bgList,
  random,
  randomColor,
  rgbaList,
  getBrowserType,
  getUserOsInfo
}


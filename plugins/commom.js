import Vue from 'vue';

var comsys = {
    install(Vue){
        Vue.prototype.comsys = {
            //计算时间差
            timeFn: function(date){
                //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
                var dateBegin = new Date(date.replace(/-/g, "/"));//将-转化为/，使用new Date
                var dateEnd = new Date();//获取当前时间
                var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
                var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
                var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
                var hours=Math.floor(leave1/(3600*1000))//计算出小时数
                //计算相差分钟数
                var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
                //计算相差秒数
                var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                var seconds=Math.round(leave3/1000)
                // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
                // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
                //     ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
                return dayDiff+"天 "+hours+"小时 "+minutes+"分钟 "+seconds+"秒";
            },
            //格式化时间
            formatDate: function(date, fmt){
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
                }
                let o = {
                    'M+': date.getMonth() + 1,
                    'd+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds()
                }
                for (let k in o) {
                    if (new RegExp(`(${k})`).test(fmt)) {
                        let str = o[k] + ''
                        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
                    }
                }
                return fmt;
            },
            //回到顶部
            backToTop: function(){
                //获得当前高度
                let start = document.documentElement.scrollTop || document.body.scrollTop;
                let i = 0
                var interval = setInterval(() => {
                    const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
                    if (next <= 0) {
                        window.scrollTo(0, 0)
                        clearInterval(interval)
                    } else {
                        window.scrollTo(0, next)
                    }
                    i++
                }, 16.7);
            },
            //计算回到顶部距离
            easeInOutQuad: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b
                return -c / 2 * (--t * (t - 2) - 1) + b
            }
        }
    }
};

Vue.use(comsys);
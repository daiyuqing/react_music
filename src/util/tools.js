/**
 * 判断参数是否为空
 * @author dyq
 * @param {[type]} keys [description]
 */
var IsEmpty = function(keys){
    if (typeof(keys) === "string") {
        if (keys != undefined) {
            keys = keys.replace(/(^\s*)|(\s*$)/g, "");
        }else{
            keys == "";
        }
        if (keys == "" || keys == null || keys == 'null' || keys == undefined || keys == 'undefined') {
            return true
        } else {
            return false
        }
    } else if (typeof(keys) === 'undefined') {
        return true;
    } else {
        if (typeof(keys) == "object") {
            let has_true = false;
            for(let i in keys){
                return false;
            }
            return true;
        }
    }
};
/**
 * 将歌曲长度转化为分秒
 * @author dyq
 * @param {[type]} keys [description]
 */
var formatTime=function(length){
	if (typeof length==='number') {
		let minute=parseInt(length/60);
		let second=parseInt(length%60);
		if (minute<10) {
			minute='0'+minute;
		}
		if (second<10) {
			second='0'+second;
		}
		return minute+':'+second;
	}else{
		return '00:00';
	}
}
/**
 * 将歌曲分秒转化为长度
 * @author dyq
 * @param {[type]} keys [description]
 */
var formatLength=function(str){
	if (typeof str==='string') {
		let arr=str.split(':');
		return arr[0]*60+arr[1];
	}else{
		return 0;
	}
}
export {IsEmpty,formatTime,formatLength};
/*
 * @Name: 处理时间方法
 * @Author: LiRunLiang
 * @Date: 2019-07-04 11:23:59
 * @Last Modified by: LiRunLiang
 * @Last Modified time: 2019-07-04 17:16:14
 */
let DateMethods = {};
DateMethods.install = function (Vue, option) {
	/**
	 * 按照给定的日期返回指定的格式进行格式化后的时间
	 * @param {*} date 需要进行格式化的时间
	 * @param {*} format 需要进行格式化的时间格式
	 * @returns { String } 格式化后的时间
	 */
	function format_date (date, format = 'YY-MM-DD h:m:s') {
		if (!date) return;
		let value = date_object(date);
		let dateStr = format.replace(/YY/g, value.year);
		dateStr = dateStr.replace(/MM/g, value.month);
		dateStr = dateStr.replace(/DD/g, value.day);
		dateStr = dateStr.replace(/h/g, value.hour);
		dateStr = dateStr.replace(/m/g, value.minute);
		dateStr = dateStr.replace(/s/g, value.second);
		return dateStr;
	};

	/**
	 * 将秒数转换为日期格式 90050 -> 01天 01小时00分钟50秒
	 * 主要用于倒计时使用，设置计时器，循环调用
	 * @param { Number } second 进行转换的秒数(不是毫秒)
	 * @param { String } format 转换格式
	 */
	function second_mturn_date (second, format = 'DD天 h小时m分钟s秒') {
		if (!second) return false;
		let sDate = date_second();
		let value = {
			day: parseInt(second / sDate.day),
			hour: parseInt((second % sDate.day) / sDate.h),
			minute: parseInt((second % sDate.h) / sDate.m),
			second: second % sDate.m
		};

		let arrList = Object.keys(value);
		for (let i = 0; i < arrList.length; i++) {
			value[arrList[i]] = auto_append_zero(value[arrList[i]]);
		}
		let dateStr = format.replace(/DD/g, value.day);
		dateStr = dateStr.replace(/h/g, value.hour);
		dateStr = dateStr.replace(/m/g, value.minute);
		dateStr = dateStr.replace(/s/g, value.second);
		return dateStr;
	}

	/**
	 * 获取年月日 时分秒所占的秒数
	 */
	function date_second () {
		let year = new Date().getFullYear();
		let isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
		let dateObj = {
			year: (isLeapYear ? 366 : 365) * 86400,
			month: get_month_day_num() * 86400,
			day: 86400,
			h: 3600,
			m: 60
		};
		return dateObj;
	}

	/**
	 * 获取某个日期中的月份的天数
	 * @param { Date } date 需要获取月份的日期
	 */
	function get_month_day_num (date = new Date()) {
		let curDate = new Date(date);
		var curMonth = curDate.getMonth();
		curDate.setMonth(curMonth + 1);
		curDate.setDate(0);
		return curDate.getDate();
	}

	/**
	 * 获取时间各项的数值
	 * @param { date } date 需要进行转换格式的时间，格式只要是能转换为时间的数据值就行了
	 * @return { Object }  转换后的时间
	 */
	function date_object (date = new Date()) {
		let getDate = new Date(date);
		let dateObj = {
			year: getDate.getFullYear(),
			month: getDate.getMonth() + 1,
			day: getDate.getDate(),
			hour: getDate.getHours(),
			minute: getDate.getMinutes(),
			second: getDate.getSeconds(),
			week: get_week(getDate.getDay())
		};

		let arrList = Object.keys(dateObj);
		for (let i = 0; i < arrList.length; i++) {
			dateObj[arrList[i]] = auto_append_zero(dateObj[arrList[i]]);
		}
		return dateObj;
	}

	/**
	 *
	 * @param { Date } originDate 自己的时间
	 * @param { Date } targetDate 需要对比的时间()
	 * @param { Object } value 		时间差返回的对象
	 */
	function time_diff (originDate, targetDate, format = 'DD天 h小时m分钟s秒') {
		let time_diffNumber = new Date(targetDate).getTime() - new Date(originDate).getTime();
		let flag = !!(time_diffNumber > 0);
		if (!flag) {
			time_diffNumber = Math.abs(time_diffNumber);
		}

		let value = {
			dateString: second_mturn_date(time_diffNumber / 1000, format),
			isOld: flag
		};
		return value;
	}

	/**
	 * 小于10自动补0
	 * @param { Number } num 需要进行补0的值
	 */
	function auto_append_zero (num) {
		if (num < 10) return `0${num}`;
		return num;
	}

	/**
	 * 获取星期几
	 * @param { Number } weekNum 从日期格式化取出来的值
	 */
	function get_week (weekNum, format = '周') {
		let week = '';
		if (weekNum == 0) week = `${format}日`;
		if (weekNum == 1) week = `${format}一`;
		if (weekNum == 2) week = `${format}二`;
		if (weekNum == 3) week = `${format}三`;
		if (weekNum == 4) week = `${format}四`;
		if (weekNum == 5) week = `${format}五`;
		if (weekNum == 6) week = `${format}六`;
		return week;
	}

	Vue.prototype.format_date = format_date;						// 给定日期跟日期格式，返回按照格式格式化之后的日期
	Vue.prototype.date_object = date_object;			// 给定一个日期或者不给，返回传进去的日期处理后的日期对象，对象包含日期的年月日等等
	Vue.prototype.time_diff = time_diff;								// 获取两个日期的时间差
	Vue.prototype.date_second = date_second;			// 获取年月日时分秒所占的秒数
	Vue.prototype.second_mturn_date = second_mturn_date;	// 将秒数转为指定的时间格式
};

export default DateMethods;

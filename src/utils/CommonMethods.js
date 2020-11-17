/*
 * @Name: 公共方法
 * @Author: LiRunLiang
 * @Date: 2019-06-11 18:20:00
 * @Last Modified by: LiRunLiang
 * @Last Modified time: 2019-10-12 16:34:43
 */
import axios from 'axios';

let CommonMethods = {};
CommonMethods.install = function (Vue, options) {

	/**
	 * 上传图片到OSS，返回图片线上地址
	 * @param { FormData }  params { file: file } 一个FormData的文件对象
	 */
	function upload_picture (params) {
		return axios.post(
			'//dev.yatiku.com/admin/academicAffairs/uploadTeachingPlanPicture',
			params,
			{
				method: 'post',
				headers: { 'Content-Type': 'multipart/form-data' }
			}
		);
	}

	/**
	 * 获取文件的后缀名称
	 * @param { String } fileName 文件全名 'xxxxx.jpg'
	 * @return { String } 处理完的文件后缀 '.jpg'
	 */
	function get_suffix (fileName) {
		let pos = fileName.lastIndexOf('.');
		let suffix = '';
		if (pos != -1) {
			suffix = fileName.substring(pos);
		}
		return suffix;
	}

	/**
	 * 随机字符串(可用作文件名)
	 * @param {*} len 文件名长度, 10 那个会拼接一个长度为10的文件名称
	 * @return { String } 生成指定长度的随机字符串
	 */
	function random_string (len) {
		len = len || 32;
		var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var maxPos = chars.length;
		var pwd = '';
		for (let i = 0; i < len; i++) {
			pwd += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	}

	/**
	 * 验证表单数据是否填写了
	 * @param {*} formObj 				// 需要进行验证的数据对象
	 * @param {*} invalidArrList  // 验证规则
	 *
	 * demo:
	 * let dataObj = {
	 * 	a: '',
	 * 	b: '100',
	 * 	c: ''
	 * }
	 *
	 * let arrList = [
	 * 	{ arrName: 'a', errorTips: 'a没有填写!' },
	 * 	{ arrName: 'b', errorTips: 'b没有填写!' },
	 * 	{ arrName: 'c', errorTips: 'c没有填写!' }
	 * ]
	 *
	 * this.isInvalidForm(dataObj, arrList)
	 * -> 返回 { flag: false, errorTips: 'a没有填写' }
	 */
	function invalid_form (formObj, invalidArrList) {
		for (let i = 0; i < invalidArrList.length; i++) {
			if (formObj[invalidArrList[i]['arrName']] === '') {
				return {
					flag: false,
					errorTips: invalidArrList[i]['errorTips']
				};
			}
		}
	}

	Vue.prototype.invalid_form = invalid_form;
	Vue.prototype.get_suffix = get_suffix;
	Vue.prototype.upload_picture = upload_picture;
	Vue.prototype.random_string = random_string;
};
export default CommonMethods;

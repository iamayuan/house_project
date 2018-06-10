let baseUrl = ''; 


if (process.env.NODE_ENV == 'development') {
	baseUrl = '/api';
}else{
	baseUrl = 'http://www.yingjiakanfang.com';
}

export {
	baseUrl
}
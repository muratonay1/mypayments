function isObject(params) {
	return (Object.prototype.toString.call(params) === "[object Object]");
}

function isString(params) {
	return (Object.prototype.toString.call(params) === "[object String]");
}

function isNumber(params) {
	return (Object.prototype.toString.call(params) === "[object Number]");
}

function isUndefined(params) {
	return (Object.prototype.toString.call(params) === "[object Undefined]");
}

function isBoolean(params) {
	return (Object.prototype.toString.call(params) === "[object Boolean]");
}

function isFunction(params) {
	return (Object.prototype.toString.call(params) === "[object Function]");
}

function isNull(params) {
	return (Object.prototype.toString.call(params) === "[object Null]");
}
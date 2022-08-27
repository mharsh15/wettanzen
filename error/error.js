module.exports = function CatchAsync(fn) {
	return function (req, rep, next) {
		fn(req, rep, next).catch(next)
	}
}
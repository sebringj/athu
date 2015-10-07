
module.exports = function(passport) {
	require('./google')(passport);
	require('./facebook')(passport);
});

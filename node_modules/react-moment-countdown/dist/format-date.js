'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDate;
exports.getDelta = getDelta;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatDate(toDate, targetFormatMask, sourceFormatMask) {
  var countdownMillisecond = getDelta(toDate, sourceFormatMask);
  var duration = _moment2.default.duration(countdownMillisecond);
  var finalTargetFormatMask = editTargetFormatMask(duration, targetFormatMask);
  var countdownString = (0, _moment2.default)(duration._data).format(finalTargetFormatMask);

  return [countdownMillisecond, countdownString];
}

function getDelta(toDate, sourceFormatMask) {
  if (!_moment2.default.isMoment(toDate)) {
    var convert = _moment2.default.isDate(toDate) ? (0, _moment2.default)(toDate) : (0, _moment2.default)(toDate, sourceFormatMask);
    return convert.diff((0, _moment2.default)());
  } else return toDate.diff((0, _moment2.default)());
}

function editTargetFormatMask(duration, targetFormatMask) {
  var changeDate = [];
  if (duration.months() === 0) changeDate.push('M');
  if (duration.days() === 0) changeDate.push('D');
  return changeDate.reduce(function (acc, char) {
    var charCount = acc.split('').filter(function (tfm) {
      return tfm === char;
    }).length;
    var charBefore = generateString(char, charCount);
    var charAfter = '[' + generateString('0', charCount) + ']';
    return acc.replace(charBefore, charAfter);
  }, targetFormatMask);
}

function generateString(character, count) {
  return Array(count).fill(character).join('');
}
const express = require('express');
const router = express.Router();

String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

const parseReq = function (req) {
  console.log(req.data);
  const _fn = req.data.split('0000');
  const _ln = _fn[1].split('000');
  const _cid = _ln[1].splice(3, 0, '-');
  return {
    data: {
      firstName: _fn[0],
      lastName: _ln[0],
      clientId: _cid
    }
  }
}
router.get('/', function (req, res, next) {
  res.render('index', { request: '/api/v2/parse' });
});
router.post('/parse', function (req, res, next) {
  const parseddata = parseReq(req.body);
  res.send(200, { data: parseddata });
});

module.exports = router;

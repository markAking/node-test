const express = require('express');
const router = express.Router();

const parseReq = function(req) {
    const _fn = req.data.substring(0, req.data.lastIndexOf('0000') + 4);
    const _ln = req.data.substring(req.data.lastIndexOf('0000') + 4, req.data.lastIndexOf('000') + 3);
    const _cid = req.data.substring(req.data.lastIndexOf('000') + 3, req.data.length)
    return {
        data: {
            firstName: _fn,
            lastName: _ln,
            clientId: _cid
        }
    }
}

router.get('/', function (req, res, next) {
    res.render('index', { request: '/api/v1/parse' });
});
router.post('/parse', function (req, res, next) {
    const parseddata = parseReq(req.body);
    res.send(200, { data: parseddata});
});


module.exports = router;
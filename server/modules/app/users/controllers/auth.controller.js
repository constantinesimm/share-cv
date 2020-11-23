const router = require('express').Router();
const { HttpError } = require('../../../../utils');

const AuthService = require('../services/auth.service');

router.post('/login', (req, res, next) => {
    AuthService.login(req.body)
        .then(data => res.json(data))
        .catch(error => next(new HttpError(error.status, error.message)))
});

router.post('/logout', (req, res, next) => {
    AuthService.logout(req.body)
        .then(data => res.json(data))
        .catch(error => next(new HttpError(error.status, error.message)))
});

router.post('/register', (req, res, next) => {
    AuthService.registerInit(req.body)
        .then(data => res.json(data))
        .catch(error => next(new HttpError(error.status, error.message)))
});

router.post('/register/confirm', (req, res, next) => {
    AuthService.registerConfirm(req.body)
        .then(data => res.json(data))
        .catch(error => next(new HttpError(error.status, error.message)))
})

router.post('/password/reset', (req, res, next) => {
    AuthService.secretResetInit(req.body)
        .then(data => res.json(data))
        .catch(error => next(new HttpError(error.status, error.message)))
});

router.post('/password/confirm', (req, res, next) => {
    AuthService.secretResetConfirm(req.body)
        .then(data => res.json(data))
        .catch(error => next(new HttpError(error.status, error.message)))
});

router.post('/token/verification', (req, res, next) => {
    AuthService.jwtVerification(req.body)
        .then(data => res.json(data))
        .catch(error => next(new HttpError(400, error.message)))
});

module.exports = router;

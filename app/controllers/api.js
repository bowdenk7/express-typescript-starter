'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const graph = require("fbgraph");
const twilio = require("twilio");
const Twilio = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
    res.render('api/index', {
        title: 'API Examples'
    });
};
/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = (req, res, next) => {
    const token = req.user.tokens.find(token => token.kind === 'facebook');
    graph.setAccessToken(token.accessToken);
    graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, results) => {
        if (err) {
            return next(err);
        }
        res.render('api/facebook', {
            title: 'Facebook API',
            profile: results
        });
    });
};
/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = (req, res, next) => {
    const github = new GitHub();
    github.repos.get({ owner: 'sahat', repo: 'hackathon-starter' }, (err, repo) => {
        if (err) {
            return next(err);
        }
        res.render('api/github', {
            title: 'GitHub API',
            repo
        });
    });
};
/**
 * GET /api/twilio
 * Twilio API example.
 */
exports.getTwilio = (req, res) => {
    res.render('api/twilio', {
        title: 'Twilio API'
    });
};
/**
 * POST /api/twilio
 * Send a text message using Twilio.
 */
exports.postTwilio = (req, res, next) => {
    req.assert('number', 'Phone number is required.').notEmpty();
    req.assert('message', 'Message cannot be blank.').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/api/twilio');
    }
    const message = {
        to: req.body.number,
        from: '+13472235148',
        body: req.body.message
    };
    Twilio.sendMessage(message, (err, responseData) => {
        if (err) {
            return next(err.message);
        }
        req.flash('success', { msg: `Text sent to ${responseData.to}.` });
        res.redirect('/api/twilio');
    });
};

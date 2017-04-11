"use strict";
exports.__esModule = true;
var graph = require("fbgraph");
var twilio = require("twilio");
var Twilio = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
/**
 * GET /api
 * List of API examples.
 */
exports.getApi = function (req, res) {
    res.render("api/index", {
        title: "API Examples"
    });
};
/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = function (req, res, next) {
    var token = req.user.tokens.find(function (token) { return token.kind === "facebook"; });
    graph.setAccessToken(token.accessToken);
    graph.get(req.user.facebook + "?fields=id,name,email,first_name,last_name,gender,link,locale,timezone", function (err, results) {
        if (err) {
            return next(err);
        }
        res.render("api/facebook", {
            title: "Facebook API",
            profile: results
        });
    });
};
/**
 * GET /api/twilio
 * Twilio API example.
 */
exports.getTwilio = function (req, res) {
    res.render("api/twilio", {
        title: "Twilio API"
    });
};
/**
 * POST /api/twilio
 * Send a text message using Twilio.
 */
exports.postTwilio = function (req, res, next) {
    req.assert("number", "Phone number is required.").notEmpty();
    req.assert("message", "Message cannot be blank.").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors);
        return res.redirect("/api/twilio");
    }
    var message = {
        to: req.body.number,
        from: "+13472235148",
        body: req.body.message
    };
    Twilio.sendMessage(message, function (err, responseData) {
        if (err) {
            return next(err.message);
        }
        req.flash("success", { msg: "Text sent to " + responseData.to + "." });
        res.redirect("/api/twilio");
    });
};

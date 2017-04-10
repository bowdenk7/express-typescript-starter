"use strict";

import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import * as twilio from "twilio";
import {Response, Request, NextFunction} from "express";


const Twilio = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  res.render("api/index", {
    title: "API Examples"
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
export let getFacebook = (req: Request, res: Response, next: NextFunction) => {
  const token = req.user.tokens.find((token: any) => token.kind === "facebook");
  graph.setAccessToken(token.accessToken);
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
    if (err) { return next(err); }
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
export let getTwilio = (req: Request, res: Response) => {
  res.render("api/twilio", {
    title: "Twilio API"
  });
};

/**
 * POST /api/twilio
 * Send a text message using Twilio.
 */
export let postTwilio = (req: Request, res: Response, next: NextFunction) => {
  req.assert("number", "Phone number is required.").notEmpty();
  req.assert("message", "Message cannot be blank.").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/api/twilio");
  }

  const message = {
    to: req.body.number,
    from: "+13472235148",
    body: req.body.message
  };
  Twilio.sendMessage(message, (err, responseData) => {
    if (err) { return next(err.message); }
    req.flash("success", { msg: `Text sent to ${responseData.to}.` });
    res.redirect("/api/twilio");
  });
};


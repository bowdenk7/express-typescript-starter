"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportFacebook = require("passport-facebook");
//import { User, UserType } from '../models/User';
const User_1 = require("../models/User");
const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User_1.default.findById(id, (err, user) => {
        done(err, user);
    });
});
/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User_1.default.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, { message: 'Invalid email or password.' });
        });
    });
}));
/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */
/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    if (req.user) {
        User_1.default.findOne({ facebook: profile.id }, (err, existingUser) => {
            if (err) {
                return done(err);
            }
            if (existingUser) {
                req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                done(err);
            }
            else {
                User_1.default.findById(req.user.id, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    user.facebook = profile.id;
                    user.tokens.push({ kind: 'facebook', accessToken });
                    user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
                    user.profile.gender = user.profile.gender || profile._json.gender;
                    user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
                    user.save((err) => {
                        req.flash('info', { msg: 'Facebook account has been linked.' });
                        done(err, user);
                    });
                });
            }
        });
    }
    else {
        User_1.default.findOne({ facebook: profile.id }, (err, existingUser) => {
            if (err) {
                return done(err);
            }
            if (existingUser) {
                return done(null, existingUser);
            }
            User_1.default.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
                if (err) {
                    return done(err);
                }
                if (existingEmailUser) {
                    req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
                    done(err);
                }
                else {
                    const user = new User_1.default();
                    user.email = profile._json.email;
                    user.facebook = profile.id;
                    user.tokens.push({ kind: 'facebook', accessToken });
                    user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
                    user.profile.gender = profile._json.gender;
                    user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
                    user.profile.location = (profile._json.location) ? profile._json.location.name : '';
                    user.save((err) => {
                        done(err, user);
                    });
                }
            });
        });
    }
}));
/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];
    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    }
    else {
        res.redirect(`/auth/${provider}`);
    }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,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YSxFQUFFLElBQWtCO0lBQzNFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1EsUUFBQSxZQUFZLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQ3hFLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbmZpZy9wYXNzcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xyXG5pbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xyXG5pbXBvcnQgKiBhcyBwYXNzcG9ydExvY2FsIGZyb20gJ3Bhc3Nwb3J0LWxvY2FsJztcclxuaW1wb3J0ICogYXMgcGFzc3BvcnRGYWNlYm9vayBmcm9tICdwYXNzcG9ydC1mYWNlYm9vayc7XHJcblxyXG4vL2ltcG9ydCB7IFVzZXIsIFVzZXJUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL1VzZXInO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIFVzZXIgfSBmcm9tICcuLi9tb2RlbHMvVXNlcic7XHJcbmltcG9ydCB7UmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbn0gZnJvbSBcImV4cHJlc3NcIjtcclxuXHJcbmNvbnN0IExvY2FsU3RyYXRlZ3kgPSBwYXNzcG9ydExvY2FsLlN0cmF0ZWd5O1xyXG5jb25zdCBGYWNlYm9va1N0cmF0ZWd5ID0gcGFzc3BvcnRGYWNlYm9vay5TdHJhdGVneTtcclxuXHJcbnBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXI8YW55LGFueT4oKHVzZXIsIGRvbmUpID0+IHtcclxuICBkb25lKG51bGwsIHVzZXIuaWQpO1xyXG59KTtcclxuXHJcbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcigoaWQsIGRvbmUpID0+IHtcclxuICBVc2VyLmZpbmRCeUlkKGlkLCAoZXJyLCB1c2VyKSA9PiB7XHJcbiAgICBkb25lKGVyciwgdXNlcik7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTaWduIGluIHVzaW5nIEVtYWlsIGFuZCBQYXNzd29yZC5cclxuICovXHJcbnBhc3Nwb3J0LnVzZShuZXcgTG9jYWxTdHJhdGVneSh7IHVzZXJuYW1lRmllbGQ6ICdlbWFpbCcgfSwgKGVtYWlsLCBwYXNzd29yZCwgZG9uZSkgPT4ge1xyXG4gIFVzZXIuZmluZE9uZSh7IGVtYWlsOiBlbWFpbC50b0xvd2VyQ2FzZSgpIH0sIChlcnIsIHVzZXI6IGFueSkgPT4ge1xyXG4gICAgaWYgKGVycikgeyByZXR1cm4gZG9uZShlcnIpOyB9XHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHsgbWVzc2FnZTogYEVtYWlsICR7ZW1haWx9IG5vdCBmb3VuZC5gIH0pO1xyXG4gICAgfVxyXG4gICAgdXNlci5jb21wYXJlUGFzc3dvcmQocGFzc3dvcmQsIChlcnI6IEVycm9yLCBpc01hdGNoOiBib29sZWFuKSA9PiB7XHJcbiAgICAgIGlmIChlcnIpIHsgcmV0dXJuIGRvbmUoZXJyKTsgfVxyXG4gICAgICBpZiAoaXNNYXRjaCkge1xyXG4gICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7IG1lc3NhZ2U6ICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkLicgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSkpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBPQXV0aCBTdHJhdGVneSBPdmVydmlld1xyXG4gKlxyXG4gKiAtIFVzZXIgaXMgYWxyZWFkeSBsb2dnZWQgaW4uXHJcbiAqICAgLSBDaGVjayBpZiB0aGVyZSBpcyBhbiBleGlzdGluZyBhY2NvdW50IHdpdGggYSBwcm92aWRlciBpZC5cclxuICogICAgIC0gSWYgdGhlcmUgaXMsIHJldHVybiBhbiBlcnJvciBtZXNzYWdlLiAoQWNjb3VudCBtZXJnaW5nIG5vdCBzdXBwb3J0ZWQpXHJcbiAqICAgICAtIEVsc2UgbGluayBuZXcgT0F1dGggYWNjb3VudCB3aXRoIGN1cnJlbnRseSBsb2dnZWQtaW4gdXNlci5cclxuICogLSBVc2VyIGlzIG5vdCBsb2dnZWQgaW4uXHJcbiAqICAgLSBDaGVjayBpZiBpdCdzIGEgcmV0dXJuaW5nIHVzZXIuXHJcbiAqICAgICAtIElmIHJldHVybmluZyB1c2VyLCBzaWduIGluIGFuZCB3ZSBhcmUgZG9uZS5cclxuICogICAgIC0gRWxzZSBjaGVjayBpZiB0aGVyZSBpcyBhbiBleGlzdGluZyBhY2NvdW50IHdpdGggdXNlcidzIGVtYWlsLlxyXG4gKiAgICAgICAtIElmIHRoZXJlIGlzLCByZXR1cm4gYW4gZXJyb3IgbWVzc2FnZS5cclxuICogICAgICAgLSBFbHNlIGNyZWF0ZSBhIG5ldyBhY2NvdW50LlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogU2lnbiBpbiB3aXRoIEZhY2Vib29rLlxyXG4gKi9cclxucGFzc3BvcnQudXNlKG5ldyBGYWNlYm9va1N0cmF0ZWd5KHtcclxuICBjbGllbnRJRDogcHJvY2Vzcy5lbnYuRkFDRUJPT0tfSUQsXHJcbiAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5GQUNFQk9PS19TRUNSRVQsXHJcbiAgY2FsbGJhY2tVUkw6ICcvYXV0aC9mYWNlYm9vay9jYWxsYmFjaycsXHJcbiAgcHJvZmlsZUZpZWxkczogWyduYW1lJywgJ2VtYWlsJywgJ2xpbmsnLCAnbG9jYWxlJywgJ3RpbWV6b25lJ10sXHJcbiAgcGFzc1JlcVRvQ2FsbGJhY2s6IHRydWVcclxufSwgKHJlcTogYW55LCBhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuLCBwcm9maWxlLCBkb25lKSA9PiB7XHJcbiAgaWYgKHJlcS51c2VyKSB7XHJcbiAgICBVc2VyLmZpbmRPbmUoeyBmYWNlYm9vazogcHJvZmlsZS5pZCB9LCAoZXJyLCBleGlzdGluZ1VzZXIpID0+IHtcclxuICAgICAgaWYgKGVycikgeyByZXR1cm4gZG9uZShlcnIpOyB9XHJcbiAgICAgIGlmIChleGlzdGluZ1VzZXIpIHtcclxuICAgICAgICByZXEuZmxhc2goJ2Vycm9ycycsIHsgbXNnOiAnVGhlcmUgaXMgYWxyZWFkeSBhIEZhY2Vib29rIGFjY291bnQgdGhhdCBiZWxvbmdzIHRvIHlvdS4gU2lnbiBpbiB3aXRoIHRoYXQgYWNjb3VudCBvciBkZWxldGUgaXQsIHRoZW4gbGluayBpdCB3aXRoIHlvdXIgY3VycmVudCBhY2NvdW50LicgfSk7XHJcbiAgICAgICAgZG9uZShlcnIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIFVzZXIuZmluZEJ5SWQocmVxLnVzZXIuaWQsIChlcnIsIHVzZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGVycikgeyByZXR1cm4gZG9uZShlcnIpOyB9XHJcbiAgICAgICAgICB1c2VyLmZhY2Vib29rID0gcHJvZmlsZS5pZDtcclxuICAgICAgICAgIHVzZXIudG9rZW5zLnB1c2goeyBraW5kOiAnZmFjZWJvb2snLCBhY2Nlc3NUb2tlbiB9KTtcclxuICAgICAgICAgIHVzZXIucHJvZmlsZS5uYW1lID0gdXNlci5wcm9maWxlLm5hbWUgfHwgYCR7cHJvZmlsZS5uYW1lLmdpdmVuTmFtZX0gJHtwcm9maWxlLm5hbWUuZmFtaWx5TmFtZX1gO1xyXG4gICAgICAgICAgdXNlci5wcm9maWxlLmdlbmRlciA9IHVzZXIucHJvZmlsZS5nZW5kZXIgfHwgcHJvZmlsZS5fanNvbi5nZW5kZXI7XHJcbiAgICAgICAgICB1c2VyLnByb2ZpbGUucGljdHVyZSA9IHVzZXIucHJvZmlsZS5waWN0dXJlIHx8IGBodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8ke3Byb2ZpbGUuaWR9L3BpY3R1cmU/dHlwZT1sYXJnZWA7XHJcbiAgICAgICAgICB1c2VyLnNhdmUoKGVycjogRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgcmVxLmZsYXNoKCdpbmZvJywgeyBtc2c6ICdGYWNlYm9vayBhY2NvdW50IGhhcyBiZWVuIGxpbmtlZC4nIH0pO1xyXG4gICAgICAgICAgICBkb25lKGVyciwgdXNlcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIFVzZXIuZmluZE9uZSh7IGZhY2Vib29rOiBwcm9maWxlLmlkIH0sIChlcnIsIGV4aXN0aW5nVXNlcikgPT4ge1xyXG4gICAgICBpZiAoZXJyKSB7IHJldHVybiBkb25lKGVycik7IH1cclxuICAgICAgaWYgKGV4aXN0aW5nVXNlcikge1xyXG4gICAgICAgIHJldHVybiBkb25lKG51bGwsIGV4aXN0aW5nVXNlcik7XHJcbiAgICAgIH1cclxuICAgICAgVXNlci5maW5kT25lKHsgZW1haWw6IHByb2ZpbGUuX2pzb24uZW1haWwgfSwgKGVyciwgZXhpc3RpbmdFbWFpbFVzZXIpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7IHJldHVybiBkb25lKGVycik7IH1cclxuICAgICAgICBpZiAoZXhpc3RpbmdFbWFpbFVzZXIpIHtcclxuICAgICAgICAgIHJlcS5mbGFzaCgnZXJyb3JzJywgeyBtc2c6ICdUaGVyZSBpcyBhbHJlYWR5IGFuIGFjY291bnQgdXNpbmcgdGhpcyBlbWFpbCBhZGRyZXNzLiBTaWduIGluIHRvIHRoYXQgYWNjb3VudCBhbmQgbGluayBpdCB3aXRoIEZhY2Vib29rIG1hbnVhbGx5IGZyb20gQWNjb3VudCBTZXR0aW5ncy4nIH0pO1xyXG4gICAgICAgICAgZG9uZShlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCB1c2VyOiBhbnkgPSBuZXcgVXNlcigpO1xyXG4gICAgICAgICAgdXNlci5lbWFpbCA9IHByb2ZpbGUuX2pzb24uZW1haWw7XHJcbiAgICAgICAgICB1c2VyLmZhY2Vib29rID0gcHJvZmlsZS5pZDtcclxuICAgICAgICAgIHVzZXIudG9rZW5zLnB1c2goeyBraW5kOiAnZmFjZWJvb2snLCBhY2Nlc3NUb2tlbiB9KTtcclxuICAgICAgICAgIHVzZXIucHJvZmlsZS5uYW1lID0gYCR7cHJvZmlsZS5uYW1lLmdpdmVuTmFtZX0gJHtwcm9maWxlLm5hbWUuZmFtaWx5TmFtZX1gO1xyXG4gICAgICAgICAgdXNlci5wcm9maWxlLmdlbmRlciA9IHByb2ZpbGUuX2pzb24uZ2VuZGVyO1xyXG4gICAgICAgICAgdXNlci5wcm9maWxlLnBpY3R1cmUgPSBgaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vJHtwcm9maWxlLmlkfS9waWN0dXJlP3R5cGU9bGFyZ2VgO1xyXG4gICAgICAgICAgdXNlci5wcm9maWxlLmxvY2F0aW9uID0gKHByb2ZpbGUuX2pzb24ubG9jYXRpb24pID8gcHJvZmlsZS5fanNvbi5sb2NhdGlvbi5uYW1lIDogJyc7XHJcbiAgICAgICAgICB1c2VyLnNhdmUoKGVycjogRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgZG9uZShlcnIsIHVzZXIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSkpO1xyXG5cclxuLyoqXHJcbiAqIExvZ2luIFJlcXVpcmVkIG1pZGRsZXdhcmUuXHJcbiAqL1xyXG5leHBvcnQgbGV0IGlzQXV0aGVudGljYXRlZCA9IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gIGlmIChyZXEuaXNBdXRoZW50aWNhdGVkKCkpIHtcclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfVxyXG4gIHJlcy5yZWRpcmVjdCgnL2xvZ2luJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQXV0aG9yaXphdGlvbiBSZXF1aXJlZCBtaWRkbGV3YXJlLlxyXG4gKi9cclxuZXhwb3J0IGxldCBpc0F1dGhvcml6ZWQgPSAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICBjb25zdCBwcm92aWRlciA9IHJlcS5wYXRoLnNwbGl0KCcvJykuc2xpY2UoLTEpWzBdO1xyXG5cclxuICBpZiAoXy5maW5kKHJlcS51c2VyLnRva2VucywgeyBraW5kOiBwcm92aWRlciB9KSkge1xyXG4gICAgbmV4dCgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXMucmVkaXJlY3QoYC9hdXRoLyR7cHJvdmlkZXJ9YCk7XHJcbiAgfVxyXG59O1xyXG4iXX0=

function SessionManager() {
  this.appVersion = '0.2.0';
};

SessionManager.prototype.getViewData = function(req) {
  return {
    loggedIn: req.session.loggedIn,
    version: this.appVersion
  };
};

module.exports = new SessionManager();
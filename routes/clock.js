var moment = require('moment');

function Clock() {}

Clock.prototype.setRoutes = function(app) {
  app.get('/', this.index.bind(this) );
};

Clock.prototype.setModules = function(modules) {
  this.Themes = modules.Themes;
  this.Schedules = modules.Schedules;
  this.Marquee = modules.Marquee;
  this.Notices = modules.Notices;
  this.Periods = modules.Periods;
};

Clock.prototype.index = function(req, res) {
  var self = this;

  self.Schedules.getActive(getPeriods);

  function getPeriods(err, schedule) {
    self.Periods.getAllByScheduleID(schedule._id, parsePeriods);
  }

  function parsePeriods(err, periods) {
    for (var i = 0; i < periods.length; i++) {
      periods[i].start = self.Periods.normalizeTime(periods[i].start);
      periods[i].finish = self.Periods.normalizeTime(periods[i].finish);
    }
    renderClock(periods);
  }

  function renderClock(periods) {
    res.render('clock', {
      periods: periods
    });
  }
};

module.exports = new Clock();

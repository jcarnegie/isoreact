var r        = require("ramda");
var config   = null;

if (!config) {
    var common = require("../config/common.json");
    var config = require("$envConfig");
    var local  = require("../config/local.json");
    config     = r.mixin(common, config, local);
}

module.exports = config;
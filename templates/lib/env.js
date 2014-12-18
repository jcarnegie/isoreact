var r  = require("ramda");

module.exports = {
    /**
     * Is the current environment on the server?
     */
    isServer: function() { return (typeof global === "object"); },

    /**
     * Is the current environment on the client?
     */
    isClient: function() { return (typeof window === "object"); },

    /**
     * The current environment.
     *
     * @return the current environment (development, staging, production, etc).
     */
    env: function() { return process.env.NODE_ENV; },

    /**
     * The config for the current environment.
     */
    config: function() { 
        var env = this.env();
        var common = require("../config/common.json");
        var config = require("$envConfig");
        var local  = require("../config/local.json");

        return r.mixin(common, config, local);
    }
}
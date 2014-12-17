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
    env: function() { return process.env.NODE_ENV; }
}
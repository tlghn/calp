/**
 * Created by tolgahan on 04.11.2016.
 */
const tupl = require('tupl');
const MAP = new Map();

module.exports = function (callback, target, ns) {
    
    if(typeof callback !== 'function'){
        throw new SyntaxError('callback is not function');
    }

    let key = tupl.create(ns)(target, callback);

    if(MAP.has(key)){
        return MAP.get(key);
    }

    var proxy = new Proxy({},{
        get: function (callback, that, prop) {
            return callback.bind(this, prop);
        }.bind(target, callback)
    });

    MAP.set(key, proxy);

    key.on('destroy', key => MAP.delete(key));

    return proxy;
};
/**
 * Created by tolgahan on 04.11.2016.
 */
const tuple = require('tupl');
const MAP = new Map();

module.exports = function (callback, target) {
    if(typeof callback !== 'function'){
        throw new SyntaxError('callback is not function');
    }
    
    let key = tuple(target, callback);

    if(MAP.has(key)){
        return MAP.get(key);
    }

    var proxy = new Proxy({},{
        get: function (callback, that, prop) {
            return callback.bind(this, prop);
        }.bind(target, callback)
    });

    MAP.set(key, proxy);

    return proxy;
};
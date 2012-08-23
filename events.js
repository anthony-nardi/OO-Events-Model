var events = (function (window, document, undefined) {

    var returnObject = {},
        list = [];

    var on = function (name, callback) {
        
        if (typeof list[name] === "undefined" || !list[name].length) {
        
            window.addEventListener(name, fire);
            list[name] = [];
            list[name].push([this, callback]);
        
        } else { list[name].push([this, callback]); }

    };

    var off = function (name, callback, opt) {

        var event = list[name],
            l = event.length,
            i = 0;

        if (opt) { window.removeEventListener(name, fire); }

        for (i; i < l; i += 1) {
            if (event[i][0] === this && event[i][1] === callback) {
                event.splice(i, 1);
                return this;
            }
        }

    };

    var fire = function (e) {

        var event = undefined,
            data = undefined,
            i = 0, l = 0,
            current = [];

        if (typeof e !== "string") {

            name = e.type;
        
        } else {
        
            name = e;
            data = arguments[1];
        
        }

        event = list[name];

        if (event && event.length) {
           
            l = event.length;

            for (i; i < l; i += 1) {
                current = event[i];
                current[1].apply(current[0], [data]);
            }
        }

    };

    returnObject = function(name, callback) { return on(name, callback) };
    
    returnObject.list = list;

    return returnObject;

}(window, document));

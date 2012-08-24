var events = (function (window, document, undefined) {

    var returnObject = {},
        list = [];

    var on = function (name, callback) {
        
        if (typeof list[name] === "undefined" || !list[name].length) {
        
            window.addEventListener(name, fire);
            list.push(name);
            list[name] = [];
            list[name].push([this, callback]);
        
        } else { list[name].push([this, callback]); }

        console.log(list.length)
        return this;
    };

    var off = function (name, callback, opt) {

        var event = list[name],
            events = event.length,
            i = 0;

        if (!events) { return this; }

        if (opt) { window.removeEventListener(name, fire); }

        for (i; i < events; i += 1) {
            if (event[i][0] === this && event[i][1] === callback) {
                event.splice(i, 1);
            }
        }

        return this;

    };

    var fire = function (e) {

        var event = undefined,
            data = undefined,
            events = undefined,
            current = undefined,
            i = 0;

        if (typeof e === "string") {

            name = e;
            data = arguments[1];
        
        } else {
            
            name = e.type;
       
        }

        event = list[name];

        if (event && event.length) {
           
            events = event.length;

            for (i; i < events; i += 1) {

                current = event[i];
                current[1].apply(current[0], [data]);
           
            }
        }

        return this;

    };

    returnObject = function(name, callback) { return on(name, callback) };
    
    returnObject.list = list;
    returnObject.on = on;
    returnObject.off = off;
    returnObject.fire = fire;

    return returnObject;

}(window, document));

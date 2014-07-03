'use strict';

var events = (function () {

  var list = [];

  function isElement (object) {
    return object instanceof Node || object instanceof HTMLElement;
  }

  function on (name, callback) {

    if (!list[name]) {

      if (isElement(this)) {
        this.addEventListener(name, fire);
      } else {
        window.addEventListener(name, fire);
      }

      list[name] = [];
      list[name].push([this, callback]);

    } else {
      list[name].push([this, callback]);
    }

    return this;

  }

  function off (name, callback, opt) {

    var event = list[name];

    if (opt) {
      if (isElement(this)) {
        this.removeEventListener(name, fire);
       } else {
        window.removeEventListener(name, fire);
       }
    }

    if (event.length) {

      for (var i = 0; i < event.length; i += 1) {
        if (event[i][0] === this && event[i][1] === callback) {
          event.splice(i, 1);
          i -= 1;
        }
      }

    }

    return this;

  }


  function fire (event) {

    var type      = typeof event === 'string' ? event : event.type,
        data      = typeof event === 'string' ? arguments[1] : event,
        listeners = list[type],
        listener;

    if (listeners.length) {
      for (var i = 0; i < listeners.length; i += 1) {
        listener = listeners[i];
        listener[1].call(listener[0], data);
      }
    }

    return this;

  }

  return {
    'on'  : on,
    'off' : off,
    'fire': fire
  };

}());
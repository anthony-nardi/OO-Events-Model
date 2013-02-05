# API
***
### events.on(name, callback);
### events.off(name, callback, [bool]);
### events.fire(name, [object]);

# Examples
***
### Console.log keycode of key when key is pressed.

```
events.on.call(window, "keydown", function(event){console.log(event.which)});
```
to trigger the keydown event manually...
```
events.fire("keydown", {"which":"make up your own event data object"});
```
turning off an event requires using non-anonymous function definitions
```
var callback = function(event){console.log(event.which)});

events.on.call(window, "keydown", callback);

events.off.call(window, "keydown", callback);
```
# Syntactic Sugar
***
If you prefer to invoke these functions as methods instead of using the function.call syntax, simply add the following code to the page.
```
if (Object.prototype.on === undefined) {
  Object.prototype.on = events.on;
}

if (Object.prototype.off === undefined) {
  Object.prototype.off = events.off;
}

if (Object.prototype.fire === undefined) {
  Object.prototype.fire = events.fire;
}
```

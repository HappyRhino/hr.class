hr.class [![Build Status](https://travis-ci.org/HappyRhino/hr.class.png?branch=master)](https://travis-ci.org/HappyRhino/hr.class)
=============================

> Base class and events manager for HappyRhino

## Installation

```
$ npm install hr.class
```

## Documentation

Create a new class by extending the default `Class`:

```js
var Class = require("hr.class");

var MyClass = Class.extend({
    // Default options
    defaults: {

    },

    // Constructor
    initialize: function() {

    }
});
```

#### Events

Class instances can emit events:

```js
obj.trigger("myevent");
// obj.emit("myevent") is equivalent

// Sub-events
obj.trigger("myevent:subevent")

// With event property
obj.trigger("myevent", {
    myproperty: 1
});
```

Listening to event using `.on`:

```js
obj.on("myevent", function(e) {
    // Will be called for "myevent" and "myevent:subevent"
});
```

`listenTo` can also be used to avoid memeory leaks in events listeners when an object is listening to another object:

```js
obj1.listenTo(obj2, "myevent", function() {
    // this == obj1
});
```

#### Mixins

Class can be extended using mixins.

```js
var MyMixin = Class.Mixin({
    myMethod: function() {
        ...
    }
});

var ChildClass = MyClass.mixim(
    MyMixin,
    AnotherMixin
)
.extend({

});
```

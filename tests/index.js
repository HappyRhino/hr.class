var Class = require("../");

describe('Class', function() {
    describe('Events', function() {
        it('should trigger simple event', function(done) {
            var o = new Class();

            o.on("test", function() {
                done();
            });

            o.trigger("test:test2");
        });

        it('should trigger parent event', function(done) {
            var o = new Class();

            o.on("test", function() {
                done();
            });

            o.trigger("test:test2");
        });

        it('should trigger parent event (second level)', function(done) {
            var o = new Class();

            o.on("test", function() {
                done();
            });

            o.trigger("test:test1:test2");
        });
    });
});


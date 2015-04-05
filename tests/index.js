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

    describe('Inheritance', function() {
        it('should corrtly inherit multiple classes', function() {
            var C1 = Class.extend({
                f0: function() {
                    return 0;
                },
                f1: function() {
                    return 1;
                }
            });
            var C2 = Class.extend({
                f1: function() {
                    return 2;
                },
                f2: function() {
                    return 2;
                },
                f3: function() {
                    return 3;
                }
            });

            var C3 = C1.inherit([C2]);
            var c = new C3();

            expect(c.f0()).to.equal(0);
            expect(c.f1()).to.equal(2);
            expect(c.f2()).to.equal(2);
            expect(c.f3()).to.equal(3);
        });
    });
});


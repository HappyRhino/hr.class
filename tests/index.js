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

    describe('Mixins', function() {
        it('should correctly inherit from multiple mixins', function() {
            var C1 = Class.extend({
                f0: function() {
                    return 0;
                },
                f1: function() {
                    return 1;
                }
            });
            var M1 = Class.Mixin({
                f1: function() {
                    return 2;
                }
            });
            var M2 = Class.Mixin({
                f2: function() {
                    return 2;
                },
                f3: function() {
                    return 3;
                }
            });

            var C3 = C1.mixin(M1, M2).extend({
                f3: function() {
                    return C3.__super__.f3.apply(this, arguments) + this.f2();
                }
            });


            var c = new C3();

            expect(c.f0()).to.equal(0);
            expect(c.f1()).to.equal(2);
            expect(c.f2()).to.equal(2);
            expect(c.f3()).to.equal(5);
            expect(c).to.be.an.instanceof(C3);
            expect(c).to.be.an.instanceof(C1);
        });

        it('should correctly inherit static properties', function() {
            var C1 = Class.extend({}, {
                f1: function() {
                    return 1;
                },
                f0: function() {
                    return 0;
                }
            });
            var M1 = Class.Mixin({}, {
                f1: function() {
                    return 2;
                }
            });

            var C2 = C1.mixin(M1);

            expect(M1.f1()).to.equal(2);
            expect(C2.f0()).to.equal(0);
            expect(C2.f1()).to.equal(2);
        });

        it('should correctly handle inheritance', function() {
            var C1 = Class.extend({
                f1: function() {
                    return 1;
                }
            });
            var M1 = Class.Mixin(function(C) {
                return {
                    f1: function() {
                        return C.f1.call(this) + 2;
                    }
                }
            });

            var C2 = C1.mixin(M1);

            var c = new C2();

            expect(c.f1()).to.equal(3);
        });

        it('should correctly handle inheritance (2)', function() {
            var C1 = Class.extend({
                f1: function() {
                    return "Hello";
                }
            });
            var M1 = Class.Mixin(function(C) {
                return {
                    f1: function() {
                        return C.f1.call(this) + " ";
                    }
                }
            });
            var M2 = Class.Mixin(function(C) {
                return {
                    f1: function() {
                        return C.f1.call(this) + "World";
                    }
                }
            });

            var C2 = C1.mixin(M1, M2);

            var c = new C2();

            expect(c.f1()).to.equal("Hello World");
        });
    });
});


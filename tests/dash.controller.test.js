describe('DashCtrl', function() {
    var controller, scope, q;

    beforeEach(module('ui.router'));
    beforeEach(module('angularMoment'));
    beforeEach(module('app.dash'));

    beforeEach(inject(function($q) {
        q = $q;
    }));
    
    beforeEach(inject(function($rootScope, _$controller_, _$q_, _$httpBackend_) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;

        UserMock = {
          auth: function() {
            var deferred = q.defer();
            deferred.resolve([{token_session: "1234"}]);
            return deferred.promise;
          }            
        }

        BandwidthMock = {
          loadData: function() {
            var deferred = q.defer();
            deferred.resolve([{
                x: 1517524843837,
                p2p: new Date(),
                cdn: new Date(),
            }]);
            return deferred.promise;
          }            
        }

        AudienceMock = {
          loadData: function() {
            var deferred = q.defer();
            deferred.resolve([{
                x: 1517524843837,
                viewers: new Date(),
            }]);
            return deferred.promise;
          }            
        }

        DashChartsFactoryMock = function() {
            return {
                moment: function() {
                    return new Date();
                },
                getGbps: 999,
            }
        }

        momentMock = {
            subtract: function() {
                return new Date();
            }
        }

        controller = $controller('DashCtrl', {
            $scope:$scope,
            User: UserMock,
            Bandwidth: BandwidthMock,
            Audience: AudienceMock,
            DashChartsFactory: DashChartsFactoryMock,
            moment: function() {
                return {
                    toDate: function() {
                        return new Date('2017-12-12');
                    },
                    subtract: function() {
                        return {
                            toDate: function() {
                                return new Date('2017-12-12');
                            }
                        }
                    }
                }
            },
            $q: q,
        });
    }));

    it('should have a DashCtrl', function() {
        expect(controller).toBeDefined();
    });

    it('should have DashCtrl params', function() {
        expect(controller.dateOptions).toBeDefined();
        expect(controller.format).toBeDefined();
        expect(controller.fromDatePickerOpened).toBeDefined();
        expect(controller.toDatePickerOpened).toBeDefined();
        expect(controller.fromDate).toBeDefined();
        expect(controller.toDate).toBeDefined();
    });

    it('should open datepicker', function() {
        controller.openFromDatePicker();
        expect(controller.fromDatePickerOpened).toEqual(true);
        controller.openToDatePicker();
        expect(controller.toDatePickerOpened).toEqual(true);
    });

    it('should fill dates', function() {
        controller.changeDatesAndLoadData();
        expect(controller.toDate).not.toBe(null);
        expect(controller.fromDate).not.toBe(null);
    });
});
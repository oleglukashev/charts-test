describe('tests Bandwidth service', function() {
    var $httpBackend, Bandwidth, _$window_,
        response = { data: 'success' };
    beforeEach(module('angularMoment'));
    beforeEach(module('app.constants'));
    beforeEach(module('app.services'));

    beforeEach(inject(function ($httpBackend, _Bandwidth_, _AppConstants_, _$window_) {
        Bandwidth = _Bandwidth_;
        AppConstants = _AppConstants_;
        httpBackend = $httpBackend;
        $window = _$window_;

        httpBackend.when('POST', `${AppConstants.serverDomain}/bandwidth`, {
            session_token: 'test',
            from: new Date().getTime(),
            to: new Date().getTime(),
         }).respond(200, response);
    }));

    it('should get the sales data', function () {
      // given
      $window.localStorage.setItem('session_token', 'test');

      var result = {};
      httpBackend.expectPOST(`${AppConstants.serverDomain}/bandwidth`).respond(200, response);

      // when
      Bandwidth.loadData(new Date().getTime(), new Date().getTime()).then(function (responseData) {
        result = responseData.data;
      });
      
      httpBackend.flush();

      // // then
      expect(result).toEqual(response);
    });
});
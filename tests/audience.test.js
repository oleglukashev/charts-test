describe('tests Auidience service', function() {
    var $httpBackend, Audience, _$window_,
        response = { data: 'success' };
    beforeEach(module('angularMoment'));
    beforeEach(module('app.constants'));
    beforeEach(module('app.services'));

    beforeEach(inject(function ($httpBackend, _Audience_, _AppConstants_, _$window_) {
        Audience = _Audience_;
        AppConstants = _AppConstants_;
        httpBackend = $httpBackend;
        $window = _$window_;

        httpBackend.when('POST', `${AppConstants.serverDomain}/audience`, {
            session_token: 'test',
            from: new Date().getTime(),
            to: new Date().getTime(),
         }).respond(200, response);
    }));

    it('should get the sales data', function () {
      // given
      $window.localStorage.setItem('session_token', 'test');

      var result = {};
      httpBackend.expectPOST(`${AppConstants.serverDomain}/audience`).respond(200, response);

      // when
      Audience.loadData(new Date().getTime(), new Date().getTime()).then(function (responseData) {
        result = responseData.data;
      });
      
      httpBackend.flush();

      // // then
      expect(result).toEqual(response);
    });
});
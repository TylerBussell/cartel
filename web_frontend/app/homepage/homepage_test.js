'use strict';

describe('myApp.homepage module', function() {

  beforeEach(module('myApp.homepage'));

  describe('homepage controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var HomepageCtrl = $controller('HomepageCtrl');
      expect(HomepageCtrl).toBeDefined();
    }));

  });
});
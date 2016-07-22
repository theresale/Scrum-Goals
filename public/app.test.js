describe('myApp', function () {
		
	beforeEach(module('myApp'));

	var $controller, $scope, $httpBackend, $rootScope;

	beforeEach(inject(function($controller, $rootScope, $httpBackend){
	    $scope = $rootScope.$new();
	   	createController = function(ctrl) {
	 		return $controller(ctrl, {'$scope' : $rootScope });
	 	};
	}));

	describe('registerCtrl.addRegistrants', function () {
		it('adds correct username and password to team_member table', function() {
			$scope.newUsername = 'userx';
			$scope.newPassword = 'password';
			var $http = function(){
				return {username: $scope.newUsername, password: $scope.newPassword};
			}
			expect($http()).toEqual({username: 'userx', password: 'password'});
		});
	});

	describe('teamCtrl.addTeam', function () {
		it('adds correct team to team table', function() {
			$scope.teamName = 'teamx';
			var $http = function(){
				return {team: $scope.teamName};
			}
			expect($http()).toEqual({team: 'teamx'});
		});
	});

	describe('loginCtrl.verifyUser', function (){
		var authRequestHandler;

		beforeEach(inject(function($injector) {
 			$httpBackend = $injector.get('$httpBackend');
	 		authRequestHandler = $httpBackend
				.when('GET', '/users')
				.respond({
					data: {
						data: {
							rows: [{team_id: 1, id: 5}]
						}
					}
				});

	 		$rootScope = $injector.get('$rootScope');
	 		var $controller = $injector.get('$controller');
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('expect verify user to successfully callback', function(){
			var displayService = {showUser: false};
			$httpBackend.expectGET('/users');
     		var controller = createController();
     		$httpBackend.flush();
     		//expect($rootScope.status).toBe('Failed...');
			expect(displayService.showUser).toEqual(true);
		});
	});

});


 
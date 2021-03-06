'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', '$window', 'Authentication',
	function($scope, $http, $location, $window, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;


                // take them to the dashboard
                // refresh the window to adjust the header link
                switch($scope.authentication.user.role){
                    case 'student':
                        $location.path('/student-dashboard');
                        location.reload();
                        break;
                    case 'teacher':
                        $location.path('/teacher-dashboard');
                        location.reload();
                        break;
                    case 'admin':
                        $location.path('/admin-dashboard');
                        location.reload();
                        break;
                    default:
                        $location.path('/');
                }

			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

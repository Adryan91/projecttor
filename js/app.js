'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('projectorApp', []);

angular.module('app', [
	'Authentication',
	'projectorApp',
	'proControllers',
	'ngRoute',
	'ngCookies'
])
.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'pages/login.html',
				controller: 'LoginController'
			})
			.when('/help', { templateUrl: 'pages/help.html' })
			.when('/forgot-password', { templateUrl: 'pages/forgotpassword.html' })
			.when('/dashboard', { templateUrl: 'pages/dashboard.html' })
			.when('/users', {
				templateUrl: 'pages/users/users.html',
				controller: 'usersController'
			})
			.when('/users/create', {
				templateUrl: 'pages/users/adduser.html',
				controller: 'usersController'
			})
			.when('/users/edit/:userId', {
				templateUrl: 'pages/users/edituser.html',
				controller: 'usersController'
			})
			.when('/projects', {
				templateUrl: 'pages/projects/projects.html',
				controller: 'projectsController'
			})
			.when('/projects/create', {
				templateUrl: 'pages/projects/addproject.html',
				controller: 'projectsController'
			})
			.when('/projects/edit/:projectId', {
				templateUrl: 'pages/projects/editproject.html',
				controller: 'projectsController'
			})
			.when('/features/:projSlug', {
				templateUrl: 'pages/features/features.html',
				controller: 'featuresController'
			})
			.when('/features/add/:projSlug', {
				templateUrl: 'pages/features/addfeatures.html',
				controller: 'addfeaturesController'
			})
			.when('/features/edit/:featSlug', {
				templateUrl: 'pages/features/editfeature.html',
				controller: 'editfeaturesController'
			})
			.otherwise({ redirectTo: '/' });
	}
])
.run(['$rootScope', '$location', '$cookieStore', '$http', 
	function($rootScope, $location, $cookieStore, $http) {
		$rootScope.globals = $cookieStore.get('globals') || {};
		if($rootScope.globals.currentUser) {
			$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
			if (($location.path() !== '/') && ($location.path() != '/forgot-password') && ($location.path() != '/help')) {
            	if(!$rootScope.globals.currentUser) { $location.path('/'); }
			}
        });
	}
]);
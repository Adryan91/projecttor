'use strict';
// ------------------------- Auth Controllers ---------------------- //
	angular.module('Authentication')
	.controller('LoginController', 
	    ['$scope', '$rootScope', '$location', 'AuthenticationService', 
		function ($scope, $rootScope, $location, AuthenticationService) {
	        // reset login status
	        // AuthenticationService.ClearCredentials();
	        $scope.login = function () {
	            $scope.dataLoading = true;
	            AuthenticationService.Login($scope.username, $scope.password, function(response) {
	                if(response.success) {
	                    AuthenticationService.SetCredentials($scope.username, $scope.password);
	                    $location.path('/dashboard');
	                } else {
	                    $scope.error = response.message;
	                    $scope.dataLoading = false;
	                }
	            });
	        };

	        $scope.logout = function () {
	        	AuthenticationService.Login($scope.username, $scope.password, function(response) {
	        		AuthenticationService.Logout();
					$location.path('/');
	            });
	        }
	    }
	]);
// ------------------------- Auth Controllers ---------------------- //

var projectorApp = angular.module('projectorApp');
var proControllers = angular.module('proControllers', []);
// ------------------------ Users Controllers ---------------------- //
	proControllers.controller('usersController', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
		if($location.path() == '/users') {
			$scope.PageHead = 'Users';
			$http.get('http://localhost:8080/api/users').success(function(data) {
				// console.log(data);
				delete data.Error;
				delete data.Message;
				$scope.Users = data.Users;
			});
		} else if($location.path() == '/users/create') {
			$scope.PageHead = 'Create User';
			$scope.SubmitBtn = 'Save User';
			$scope.User = {};
			$scope.User.ROLE = '0';
			$scope.adduser = function() {
				var UserData = $scope.User;
				// console.log(UserData);
				$scope.SubmitBtn = 'Saving...';
				var url = 'http://localhost:8080/api/users/create';
				var request = $http({
					method: "post",
					url: url,
					data: UserData
				});

				request.success(function(resp) {
					// console.log(resp);
					$scope.SubmitBtn = 'Save User';
					var NotiClass = 'stickyNote-success';
					if(resp.Error) { NotiClass = 'stickyNote-important'; }
					$scope.NotiClass = NotiClass;
					$scope.NotificationMsg = resp.Message;
					$('.stickyNote').show().fadeOut(10000);
				});
			}
		} else {
			$scope.PageHead = 'Edit User';
			var UserId = $routeParams.userId;
			$http.get('http://localhost:8080/api/users/edit/'+ UserId).success(function(data) {
				console.log(data);
				var UserData = data.User[0];
				if(data.User.length != 0) {
					$scope.ID = UserData.ID;
					$scope.USER_FULLNAME = UserData.FIRSTNAME +' '+ UserData.LASTNAME;
					$scope.User = UserData;
				} else { $location.path('/users'); }
			});

			$scope.SaveChangesBtn = 'Save Changes';
			$scope.editUserDetails = function() {
				$scope.SaveChangesBtn = 'Saving ...';
				var UserDetails = $scope.User;
				var url = 'http://localhost:8080/api/users/edit';
				var request = $http({
					method: "put",
					url: url,
					data: UserDetails
				});

				request.success(function(resp) {
					$('.stickyNote').hide();
					// console.log(resp);
					$scope.SaveChangesBtn = 'Save Changes';
					var NotiClass = 'stickyNote-success';
					if(resp.Error) { NotiClass = 'stickyNote-important'; }
					else { $scope.USER_FULLNAME = UserDetails.FIRSTNAME +' '+ UserDetails.LASTNAME; }
					$scope.NotiClass = NotiClass;
					$scope.NotificationMsg = resp.Message;
					$('.stickyNote').show().fadeOut(10000);
				});
			}
		}

		$scope.removeUser = function(UserId) {
			var url = 'http://localhost:8080/api/users/remove';
			var User = {'ID': UserId};
			var request = $http({
				method: "put",
				url: url,
				data: User
			});
			request.success(function(resp) {
				$('#'+UserId).remove();
				$('.stickyNote').hide();
				console.log(resp);
				var NotiClass = 'stickyNote-success';
				if(resp.Error) { NotiClass = 'stickyNote-important'; }

				$scope.NotiClass = NotiClass;
				$scope.NotificationMsg = resp.Message;
				$('.stickyNote').show().fadeOut(10000);
			});
		}

		$scope.dismissNoti = function() { $('.stickyNote').hide(); }
	}]);
// ------------------------ Users Controllers ---------------------- //

// ---------------------- Projects Controllers --------------------- //
	projectorApp.directive('projtooltip', function() {
		return function(scope, element, attrs) {
			var ContentHtml = '<p style="font-family: Courier New; margin-bottom: 0px;">'+scope.prj.DESCRIPTION+'</p>';
			$(element).tooltipster({
				content: $(ContentHtml),
				position: 'right',
				interactive: true
			});
		}
	});

	projectorApp.directive('projSlug', function() {
		return function(scope, element, attrs) {
			var PSLUG = '#/features/'+(scope.prj.TITLE).replace(/ /g, '-') +'-'+ scope.prj.ID;
			element.attr('href', PSLUG);
		}
	});

	proControllers.controller('projectsController', ['$scope', '$routeParams', '$http', '$location', '$filter', function($scope, $routeParams, $http, $location, $filter) {
		if($location.path() == '/projects') {
			var pagehead = 'Projects';
			var url = 'http://localhost:8080/api/projects';
			// console.log(url);
			var request = $http({
				method: 'get',
				url: url
			});
			request.success(function(resp) {
				// console.log(resp.Projects);
				$scope.Projects = resp.Projects;
			});
		} else if ($location.path() == '/projects/create') {
			$scope.Proj = {};
			var pagehead = 'Create Project';
			var request = $http({
				method: 'get',
				url: 'http://localhost:8080/api/users'
			});

			request.success(function(resp) {
				// console.log(resp);
				$scope.UsersLeads = resp.Users;
			});

			$scope.SaveProject = 'Save Project';
			$scope.Proj.LEAD = '0';
			$scope.STATUS = "";

			$scope.saveProject = function() {
				$('.stickyNote').hide();
				var ProjData = $scope.Proj;
				console.log(ProjData);
				$scope.SaveProject = 'Saving...';
				var request = $http({
					method: 'post',
					url: 'http://localhost:8080/api/project/create',
					data: ProjData
				});

				request.success(function(resp) {
					// console.log(resp);
					$scope.SaveProject = 'Save Project';
					var NotiClass = 'stickyNote-success';
					if(resp.Error) { NotiClass = 'stickyNote-important'; }
					$scope.NotiClass = NotiClass;
					$scope.NotificationMsg = resp.Message;
					$('.stickyNote').show().fadeOut(10000);
				});
			}
		} else {
			var pagehead = 'Edit Project';
			$scope.SaveProject = 'Save Changes';

			// Get Users
				var request = $http({ method: 'get', url: 'http://localhost:8080/api/users' });
				request.success(function(resp) { $scope.UsersLeads = resp.Users; });

			// get Project
				var ProjId = $routeParams.projectId;
				var url = 'http://localhost:8080/api/project/'+ ProjId;
				var request = $http({ method: 'get', url: url });
				request.success(function(data) {
					// console.log(data);
					data.Project.START_DATE = $filter('date')(data.Project.START_DATE, "dd-MM-yyyy");
					data.Project.END_DATE = $filter('date')(data.Project.END_DATE, "dd-MM-yyyy");
					$scope.Proj = data.Project;
					$scope.Proj.LEAD = data.Project.LEAD.toString();
				});

			var ProjDetails = $scope.Proj;

			$scope.editProject = function() {
				$('.stickyNote').hide();
				$scope.SaveProject = 'Saving...';
				var ProjectDetails = $scope.Proj;
				var url = 'http://localhost:8080/api/project/edit';
				var request = $http({
					method: 'put',
					url: url,
					data: ProjectDetails
				});

				request.success(function(resp) {
					var NotiClass = 'stickyNote-success';
					if(resp.Error) { NotiClass = 'stickyNote-important'; }
					$scope.NotiClass = NotiClass;
					$scope.NotificationMsg = resp.Message;
					$('.stickyNote').show().fadeOut(10000);
					$scope.SaveProject = 'Save Changes';
				});
			}
		}

		$scope.removeProject = function(ProjId) {
			var Proj = {"ID": ProjId};
			var url = 'http://localhost:8080/api/project/remove';
			var request = $http({
				method: 'put',
				url: url,
				data: Proj
			});
			request.success(function(resp) {
				$('#Proj-'+ProjId).remove();
				var NotiClass = 'stickyNote-success';
				if(resp.Error) { NotiClass = 'stickyNote-important'; }
				$scope.NotiClass = NotiClass;
				$scope.NotificationMsg = resp.Message;
				$('.stickyNote').show().fadeOut(10000);
			});
		}

		$scope.PageHead = pagehead;
		$scope.dismissNoti = function() { $('.stickyNote').hide(); }
	}]);
// ---------------------- Projects Controllers --------------------- //

// ---------------------- Features Controllers --------------------- //
	proControllers.service('FeatureServices', function() {
		return {
			parseSlug: function(Slug, Scope, MODE) {
				SplitSlug = Slug.split('-');
				LstInd = SplitSlug.length - 1;
				if(MODE != 'EDIT') {
					Scope.ProjSlug = Slug;
					Scope.ProjID = SplitSlug[LstInd];
					delete SplitSlug[LstInd];
					Scope.ProjTITLE = SplitSlug.join(' ');
				}
				else {
					Scope.FeatSlug = Slug;
					Scope.FeatID = SplitSlug[LstInd];
					delete SplitSlug[LstInd];
					Scope.Feature.TITLE = SplitSlug.join(' ');
				}
			}
		}
	});

	proControllers.directive('featureslug', function() {
		return function(scope, element, attrs) {
			var ID = attrs.featid;
			var TITLE = attrs.feattitle.replace(/ /g, '-');
			var FeatSlug = TITLE +'-'+ ID;
			scope.FeatSlug = FeatSlug;
		}
	});

	proControllers.directive('statusClean', function() {
		return function(scope, element, attrs) {
			scope.feat.STATUS = scope.feat.STATUS.replace(/_/g, ' ').toLowerCase();
		}
	});

	proControllers.controller('featuresController', ['$scope', '$http', '$routeParams', 'FeatureServices', function($scope, $http, $routeParams, FeatureServices) {
		$scope.PageHead = 'Features';
		FeatureServices.parseSlug($routeParams.projSlug, $scope);

		// get Features for this project
			var URL = 'http://localhost:8080/api/features/'+ $scope.ProjID;
			var req = $http({ method: 'get', url: URL });
			req.success(function(resp) {
				$scope.Features = resp.Features;
			});
	}]);

	proControllers.controller('addfeaturesController', ['$scope', '$http', '$routeParams', 'FeatureServices', function($scope, $http, $routeParams, FeatureServices) {
		$scope.PageHead = 'Add a Feature';
		FeatureServices.parseSlug($routeParams.projSlug, $scope);

		// get Features for this project
			var URL = 'http://localhost:8080/api/usersByRoles/DEVELOPER';
			var req = $http({ method: 'get', url: URL });
			req.success(function(resp) { $scope.Users = resp.Users; });
			$scope.Feature = {};
			$scope.Feature.PROJECT_ID = $scope.ProjID;
			$scope.Feature.DEVELOPER_ID = '0';
			$scope.Feature.STATUS = 'OPEN';
			$scope.Feature.REQUESTED_BY = 'Gaz';

		$scope.addFeature = function() {
			$scope.SaveBtn = 'Saving...';
			var Feature = $scope.Feature;
			var URL = 'http://localhost:8080/api/features/add';
			var request = $http({ method: 'post', url: URL, data: Feature });
			request.success(function(resp) {
				$scope.SaveBtn = 'Save Feature';
				var NotiClass = 'stickyNote-success';
				if(resp.Error) { NotiClass = 'stickyNote-important'; }
				$scope.NotiClass = NotiClass;
				$scope.NotificationMsg = resp.Message;
				$('.stickyNote').show().fadeOut(10000);
			});
		}

		$scope.SaveBtn = 'Save Feature';
		$scope.dismissNoti = function() { $('.stickyNote').hide(); }
	}]);

	proControllers.controller('editfeaturesController', ['$scope', '$http', '$routeParams', '$filter', 'FeatureServices', function($scope, $http, $routeParams, $filter, FeatureServices) {
		$scope.PageHead = 'Edit Feature';
		$scope.Feature = {};
		FeatureServices.parseSlug($routeParams.featSlug, $scope, 'EDIT');

		// get developers
			var URL = 'http://localhost:8080/api/usersByRoles/DEVELOPER';
			var req = $http({ method: 'get', url: URL });
			req.success(function(resp) { $scope.Users = resp.Users; });

		// get Feature
			var URL = 'http://localhost:8080/api/feature/'+ $scope.FeatID;
			var req = $http({ method: 'get', url: URL });
			req.success(function(resp) {
				console.log(resp);
				resp.Feature.START_DATE = $filter('date')(resp.Feature.START_DATE, "dd-MM-yyyy");
				resp.Feature.ETA = parseFloat(resp.Feature.ETA);
				resp.Feature.DEVELOPER_ID = resp.Feature.DEVELOPER_ID.toString();
				resp.Feature.STATUS = resp.Feature.STATUS.toString();
				resp.Feature.REQUESTED_BY = resp.Feature.REQUESTED_BY.toString();
				$scope.Feature = resp.Feature;
				$scope.ProjSlug = resp.Feature.PROJECT_TITLE.replace(/ /g, '-') +'-'+ resp.Feature.PROJECT_ID;
			});

		$scope.editFeature = function() {
			$scope.SaveBtn = 'Saving...';
			var Feature = $scope.Feature;
			var URL = 'http://localhost:8080/api/features/edit';
			var request = $http({ method: 'put', url: URL, data: Feature });
			request.success(function(resp) {
				$scope.SaveBtn = 'Save Feature';
				var NotiClass = 'stickyNote-success';
				if(resp.Error) { NotiClass = 'stickyNote-important'; }
				$scope.NotiClass = NotiClass;
				$scope.NotificationMsg = resp.Message;
				$('.stickyNote').show().fadeOut(10000);
			});
		}

		$scope.SaveBtn = 'Save Feature';
		$scope.dismissNoti = function() { $('.stickyNote').hide(); }
	}]);
// ---------------------- Features Controllers --------------------- //

// ---------------------- COMMON FUNCTiONS --------------------- //
	// Datepicker
	proControllers.directive('datePicker', function() {
		return function(scope, element, attrs) {
			var modelName = attrs['ngModel'];
			var SpitModelName = modelName.split('.');
			var MainModel = SpitModelName[0];
			var SubModel = SpitModelName[1];
			$(element).datepicker().on('changeDate', function() {
				scope[MainModel][SubModel] = $(element).val();
			});
		}
	});
// ---------------------- COMMON FUNCTiONS --------------------- //
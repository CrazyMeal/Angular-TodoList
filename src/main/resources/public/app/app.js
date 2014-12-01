var app = angular.module('todolist-app', ['ngRoute','ngResource']);

app.factory('TodoFactory', ['$resource', function($resource) {
	return $resource('/todo', {});
}]);

app.config(function($routeProvider, $locationProvider) {
	  
	$routeProvider
	   .when('/', {
		   templateUrl: 'todolist.html',
		   controller: 'TodoTaskController'
	   });
});

app.controller('TodoTaskController', function($scope, $routeParams, TodoFactory) {
    $scope.params = $routeParams;

    $scope.todolist = TodoFactory.query();
    console.log($scope.todolist);
});
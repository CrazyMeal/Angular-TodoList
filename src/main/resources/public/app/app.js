var app = angular.module('todolist-app', ['ui.bootstrap','ngRoute','ngResource']);

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
    
    $scope.getProgressType = function(state){
    	if(state == "notFinished")
    		return 'danger';
    	if(state == "finished")
    		return 'success';
    	if(state == "inProgress")
    		return 'warning';
    	else return 'info';
    };
    $scope.getProgressValue = function(state){
    	if(state == "notFinished")
    		return 10;
    	if(state == "finished")
    		return 100;
    	if(state == "inProgress")
    		return 50;
    	else return 50;
    };
});
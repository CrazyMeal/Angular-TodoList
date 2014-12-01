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
    $scope.creatingNewTodo = true;
    $scope.newTodo = {
    	title: "Titre",
    	description: "Description"
    };
    $scope.todolist = TodoFactory.query();
    
    $scope.remove = function(event, id){
    	event.stopPropagation();
    };
    
    $scope.turnToEditMode = function(event, task){
    	event.stopPropagation();
    	
    	if(task.editMode){
    		$scope.validateModifications(task);
    	} else {
    		task.editMode = true;
    		task.collapse = true;
    	}
    }
    
    $scope.validateModifications = function(task){
    	task.editMode = false;
    };
    
    $scope.getProgressType = function(state){
    	if(state == "notFinished")
    		return 'danger';
    	if(state == "finished")
    		return 'success';
    	if(state == "inProgress")
    		return 'warning';
    	else return 'info';
    };
    
    $scope.postnew = function(){
    	$scope.todoTaskPost = new TodoFactory();
    	$scope.todoTaskPost.title = "Un titre de ouf";
    	$scope.todoTaskPost.description = "Description de malade";
    	//$scope.createTodoTask = function(){
    		
    		$scope.todoTaskPost.$save();
    		
    	//};
    };
});

app.controller('CreateTodoTaskController', function($scope, $routeParams, TodoFactory) {
	
});
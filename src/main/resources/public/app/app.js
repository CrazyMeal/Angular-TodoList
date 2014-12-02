var app = angular.module('todolist-app', ['ui.bootstrap','ngRoute','ngResource']);

app.factory('TodoFactory', ['$resource', function($resource) {
    return $resource('/todo', {}, {
    	'update': { method: 'PUT'},
    	'save':   { method: 'POST'},
    	'remove': { method:'DELETE'}
    });
}]);
app.config(function($routeProvider, $locationProvider) {
	  
	$routeProvider
	   .when('/', {
		   templateUrl: 'todolist.html',
		   controller: 'TodoTaskController'
	   });
});

app.controller('TodoTaskController', function($scope, $routeParams, TodoFactory, $timeout) {
    $scope.params = $routeParams;
    $scope.creatingNewTodo = true;
    $scope.newTodo = {
    	title: "",
    	description: ""
    };
    
    $scope.init = function(){
    	var tmp = TodoFactory.query();
    	var refresh = function(){
    		angular.forEach(tmp, function(task){
    			task.collapse = false;
    		});
    		$scope.todolist = tmp;
    	}
    	$timeout(refresh, 100);
    	
    	
    };
    
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
    
    $scope.updateTask = function(task){
    	task.editMode = false;
    	$scope.todoTaskPost = new TodoFactory();
    	$scope.todoTaskPost.id = task.id;
    	$scope.todoTaskPost.title = task.title;
    	$scope.todoTaskPost.description = task.description;
    	$scope.todoTaskPost.collapse = task.collapse;
    	
    	$scope.todoTaskPost.$update();
    	var refresh = function(){
    		$scope.todolist = TodoFactory.query();
    		task.collapse = true;
    		console.log($scope.todolist);
    		$scope.$apply();
    	}
    	$timeout(refresh, 500);
    	
    };
    
    $scope.postnew = function(){
    	$scope.todoTaskPost = new TodoFactory();
    	$scope.todoTaskPost.title = $scope.newTodo.title;
    	$scope.todoTaskPost.description = $scope.newTodo.description;
    		
    	$scope.todoTaskPost.$save();
    	$scope.creatingNewTodo = true;
    	var refresh = function(){
    		$scope.todolist = TodoFactory.query();
    	}
    	$timeout(refresh, 300); 

    	$scope.newTodo = {
    	    	title: "",
    	    	description: ""
    	};
    };
});

app.controller('CreateTodoTaskController', function($scope, $routeParams, TodoFactory) {
	
});
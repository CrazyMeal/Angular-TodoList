var app = angular.module('todolist-app', ['ui.bootstrap','ngRoute','ngResource']);

app.factory('TodoFactory', ['$resource', function($resource) {
    return $resource('/todo/:id', {id: "@id"}, {
    	'update': { method: 'PUT'},
    	'save':   { method: 'POST'}
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
    	$scope.notFinishedCount = 0;
    	$scope.finishedCount = 0;
    	$scope.totalTask = 0;
    	var tmp = TodoFactory.query();
    	tmp.$promise.then(function(result){
    		angular.forEach(result, function(task){
    			task.collapse = false;
    			if(!task.state)
    				$scope.notFinishedCount++;
    			else
    				$scope.finishedCount++;
    		});
    		$scope.todolist = result;
    		$scope.totalTask = $scope.notFinishedCount + $scope.finishedCount;
    	});
    	
    };
    
    $scope.getFinishedPercent = function(){
    	return ($scope.finishedCount * 100) / $scope.totalTask;
    };
    
    
    $scope.turnToEditMode = function(event, task){
    	event.stopPropagation();
    	
    	if(task.editMode){
    		$scope.updateTask(task);
    	} else {
    		task.editMode = true;
    		task.collapse = true;
    	}
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
    		task.collapse = true;
    		$scope.todolist = TodoFactory.query();
    	}
    	$timeout(refresh, 200);
    };
    
    $scope.postnew = function(){
    	$scope.todoTaskPost = new TodoFactory();
    	$scope.todoTaskPost.title = $scope.newTodo.title;
    	$scope.todoTaskPost.description = $scope.newTodo.description;
    	$scope.todoTaskPost.finished = false;
    	$scope.recalculateBalance($scope.todoTaskPost,true);
    	
    	$scope.todoTaskPost.$save();
    	$scope.creatingNewTodo = true;
    	
    	var refresh = function(){
    		$scope.todolist = TodoFactory.query();
    	}
    	$timeout(refresh, 200);
    	$scope.newTodo = {
    	    	title: "",
    	    	description: ""
    	};
    };
    
    $scope.remove = function(event, task){
    	//var t = new TodoFactory({id:task.id});
    	task.$delete();
    	
    	//$scope.todoTaskPost = new TodoFactory();
    	//$scope.todoTaskPost.id = -task.id;
    	$scope.recalculateBalance(task,false);
    	
    	//$scope.todoTaskPost.$save();
    	event.stopPropagation();
    	
    	var refresh = function(){
    		$scope.todolist = TodoFactory.query();
    	}
    	$timeout(refresh, 200);
    	
    };
    
    $scope.recalculateBalance = function(task, addition){
    	if(addition){
    		if(task.finished){
    			$scope.finishedCount++;
    		} else {
    			$scope.notFinishedCount++;
    		}
    		$scope.totalTask++;
    	} else {
    		if(task.finished){
    			$scope.finishedCount--;
    		} else {
    			$scope.notFinishedCount--;
    		}
    		$scope.totalTask--;
    	}
    };
});
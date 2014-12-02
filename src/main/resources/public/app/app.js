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
    			if(!task.finished)
    				$scope.notFinishedCount++;
    			else
    				$scope.finishedCount++;
    		});
    		$scope.todolist = result;
    		$scope.totalTask = $scope.notFinishedCount + $scope.finishedCount;
    		console.log($scope.todolist);
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
    	}
    };
    $scope.validateTask = function(task){
    	task.finished = true;
    	$scope.finishedCount++;
    	$scope.updateTask(task);
    };
    $scope.updateTask = function(task){
    	delete task['editMode'];
    	console.log(task);
    	task.$update();
    };
    
    $scope.postnew = function(){
    	$scope.todoTaskPost = new TodoFactory();
    	$scope.todoTaskPost.title = $scope.newTodo.title;
    	$scope.todoTaskPost.finished = false;
    	
    	$scope.recalculateBalance($scope.todoTaskPost,true);
    	
    	$scope.todoTaskPost.$save();
    	$scope.creatingNewTodo = true;
    	
    	$scope.todolist.unshift($scope.todoTaskPost);
    	$scope.newTodo = {
    	    	title: "",
    	    	description: ""
    	};
    };
    
    $scope.remove = function(event, task){
    	task.$delete();
    	$scope.recalculateBalance(task,false);
    	event.stopPropagation();
    	
    	$scope.todolist.splice($scope.todolist.indexOf(task),1);
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
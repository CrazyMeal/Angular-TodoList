var app = angular.module('todolist-app', ['ui.bootstrap','ngRoute','ngResource']);

app.factory('TodoFactory', ['$resource', function($resource) {
    return $resource('/todo/:id', {id: "@id"}, {
    	'update': { method: 'PUT'},
    	'save':   { method: 'POST'}
    });
}]);

app.controller('TodoController', function($scope, $routeParams, TodoFactory, $timeout) {
    $scope.params = $routeParams;
    $scope.creatingNewTodo = true;
    $scope.newTodo = {
    	title: "",
    	description: ""
    };
    
    $scope.init = function(){
    	$scope.counters = [
							{
								   type: 'finished',
								   count: 0
							},
    	                   {
    	                	   type: 'notFinished',
    	                	   count: 0
    	                   }];
    	$scope.totalTask = 0;
    	var tmp = TodoFactory.query();
    	tmp.$promise.then(function(result){
    		angular.forEach(result, function(task){
    			if(!task.finished){
    				$scope.counters[1].count++;
    			}
    			else{
    				$scope.counters[0].count++;
    			}
    		});
    		$scope.todolist = result;
    		$scope.totalTask = $scope.counters[0].count + $scope.counters[1].count;
    		
    	});	
    };
    
    $scope.getPercent = function(count){
    	return (count * 100) / $scope.totalTask;
    };
    $scope.getBarType = function(type){
    	if(type == 'finished')
    		return 'success';
    	else
    		return 'danger';
    };
    $scope.getDoneClass = function(finished){
    	if(finished)
    		return 'done';
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
    	$scope.counters[0].count++;
    	$scope.counters[1].count--;
    	$scope.updateTask(task);
    };
    $scope.updateTask = function(task){
    	delete task['editMode'];
    	task.$update();
    };
    
    $scope.postnew = function(){
    	if($scope.newTodo.title != ""){
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
    	}
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
    			$scope.counters[0].count++;
    		} else {
    			$scope.counters[1].count++;
    		}
    		$scope.totalTask++;
    	} else {
    		if(task.finished){
    			$scope.counters[0].count--;
    		} else {
    			$scope.counters[1].count--;
    		}
    		$scope.totalTask--;
    	}
    };
});
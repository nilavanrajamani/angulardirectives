
var app = angular.module('app',[]);

app.controller('mainCtrl', function($scope){
    $scope.user = {
        name: "Luke Skywalker",
        address: 'Hi'
    }
});

app.directive('userInfoCard', function(){
    return {
        restrict: 'E',  
        templateUrl: 'userInfoCard.html',
        replace: true
    }
});
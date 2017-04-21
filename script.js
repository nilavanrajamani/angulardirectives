
var app = angular.module('app',[]);

app.controller('mainCtrl', function($scope){

});

app.directive('userInfoCard', function(){
    return {
        restrict: 'E',  
        template: "User Info Card"
    }
});
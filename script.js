// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function ($scope) {
  $scope.user1 = {
    name: 'Luke Skywalker',
    address: {
      street: 'PO Box 123',
      city: 'Secret Rebel Base',
      planet: 'Yavin 4'
    },
    friends: [
      'Han',
      'Leia',
      'Chewbacca'
    ]
  };
  $scope.user2 = {
    name: 'Nilavan',
    address: {
      street: 'Street Cheyyar',
      city: 'City Cheyyar',
      planet: 'Planet Cheyyar'
    },
    friends: [
      '1',
      '2',
      '4'
    ]
  }
  console.log($scope);
});

angular.module('app').directive('userInfoCard', function () {
  return {
    templateUrl: "userInfoCard.html",
    restrict: "E",
    scope: {
      user: '=',
      initialCollapsed: '@collapsed'
    },
    controller: function ($scope) {
      //$scope.collapsed = false;
      $scope.collapsed = ($scope.initialCollapsed === 'true');
      $scope.knightMe = function (user) {
        user.rank = "knight";
      }
      $scope.collapse = function () {
        $scope.collapsed = !$scope.collapsed;
      }
      $scope.removeFriend = function (friend) {
        var idx = $scope.user.friends.indexOf(friend);
        if (idx > -1) {
          $scope.user.friends.splice(idx, 1);
        }
      };
      console.log('userInfoCard scope');
      console.log($scope);
    }
  }
});

angular.module('app').directive('removeFriend', function () {
  return {
    restrict: 'E',
    templateUrl: 'removeFriend.html',
    scope: {
      notifyParent: '&method'
    },
    controller: function ($scope) {
      console.log('removeFriend scope');
      console.log($scope);
      $scope.removing = false;
      $scope.startRemove = function () {
        $scope.removing = true;
      };
      $scope.cancelRemove = function () {
        $scope.removing = false;
      };
      $scope.confirmRemove = function(){
        $scope.notifyParent();
      }
    }
  }
});

angular.module('app').directive('address', function () {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'address.html',
    controller: function ($scope) {
      $scope.collapsed = false;
      console.log('Address scope');
      console.log($scope);
      $scope.collapseAddress = function () {
        $scope.collapsed = true;
      }
      $scope.expandAddress = function () {
        $scope.collapsed = false;
      }
    }
  }
});















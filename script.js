// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function ($scope) {
    $scope.person1 = {
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
        ],
        level: 0
    };
    $scope.person2 = {
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
        ],
        level: 1
    }
    console.log("Main controller scope ", $scope);

    $scope.messages = [];
    $scope.handlePause = function () {
        $scope.messages.push({ text: 'paused!' });
        console.log('paused!');
    }

    /*Recreating ngClick*/
    $scope.data = { message: "I have not been clicked!" }

    $scope.clickHandler = function (p) {
        p.message = "I had been clicked!!";
    };

    /*Business specific directive*/
    $scope.user1 = {
        name: 'Luke',
        selected: false
    }

    $scope.size = 150;

    /*Transclusion */
    $scope.message = 'Hello Transclusion';
    $scope.answers = { baseLocation: 'Miami' };


    /*Reusing HTML with Transclusion */
    $scope.droid1 = {
        name: 'R4-D5',
        specifications: {
            manufacturer: 'Onida',
            type: 'Walker',
            productLine: 'R3'
        },
        level: 1
    }

});

/*Recreating ngClick*/
angular.module('app').directive('myClick', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var fn = $parse(attrs['myClick']);
            element.on('click', function () {
                scope.$apply(function () {
                    fn(scope);
                });
            });
        }
    }
});
/*Recreating ngClick*/

/*Business specific directive*/
angular.module('app').directive('userTile', function () {
    return {
        restrict: 'E',
        scope: {
            user: '='
        },
        templateUrl: 'userTile.html'
    }
});

angular.module('app').directive('userClickSelect', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                scope.$apply(function () {
                    scope.user.selected = !scope.user.selected;
                });
            });
        }
    }
});
/*Business specific directive*/

/*Manually Creating watches*/
angular.module('app').directive('fontScale', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs['fontScale'], function (newValue, oldValue) {
                element.css('font-size', newValue + "%");
            });
        }
    }
});
/*Manually Creating watches*/

angular.module('app').directive('stateDisplay', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var params = attrs['stateDisplay'].split(' ');
            var classes = params.slice(1);
            scope.$watch(params[0], function (newValue) {
                console.log(newValue);
                //element.css('background-color', params[newValue + 1]);
                element.removeClass(classes.join(' '));
                element.addClass(classes[newValue]);
            });
        }
    }
});

angular.module('app').directive('personInfoCard', function () {
    return {
        templateUrl: "personInfoCard.html",
        restrict: "E",
        scope: {
            person: '=',
            initialCollapsed: '@collapsed'
        },
        controller: function ($scope) {
            //$scope.collapsed = false;

            $scope.knightMe = function (person) {
                person.rank = "knight";
            }

            $scope.removeFriend = function (friend) {
                var idx = $scope.person.friends.indexOf(friend);
                if (idx > -1) {
                    $scope.person.friends.splice(idx, 1);
                }
            };
            console.log('personInfoCard scope');
            console.log($scope);
        }
    }
});


angular.module('app').directive('droidInfoCard', function () {
    return {
        templateUrl: "droidInfoCard.html",
        restrict: "E",
        scope: {
            droid: '=',
            initialCollapsed: '@collapsed'
        },
        controller: function ($scope) {
            //$scope.collapsed = false;
            console.log('droidInfoCard scope');
            console.log($scope);
        }
    }
});

angular.module('app').directive('userPanel', function () {
    return {
        templateUrl: "userPanel.html",
        restrict: "E",
        scope: {
            name: "@",
            level: "=",
            initialCollapsed: '@collapsed'
        },
        transclude: true,
        controller: function ($scope) {
            //$scope.collapsed = false;
            $scope.nextState = function () {
                $scope.droid.level++;
                $scope.droid.level = $scope.droid.level % 4;
            }

            $scope.collapsed = ($scope.initialCollapsed === 'true');

            $scope.collapse = function () {
                $scope.collapsed = !$scope.collapsed;
            }

            $scope.nextState = function (evt) {
                console.log('scope.nextState in userPanel', evt);
                evt.stopPropogation();
                evt.preventDefault();
                $scope.level++;
                $scope.level = $scope.level % 4;
            }


            console.log('userPanel scope');
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
            $scope.confirmRemove = function () {
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

angular.module('app').directive('eventPause', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var fn = $parse(attrs['eventPause']);
            element.on('pause', function (event) {
                scope.$apply(function () {
                    fn(scope);
                });
            });
        }
    }
});

angular.module('app').directive('spacebarSupport', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $('body').on('keypress', function (evt) {
                var vidEl = element[0];
                if (evt.keyCode == 32) {
                    if (vidEl.paused) {
                        vidEl.play();
                    } else {
                        vidEl.pause();
                    }
                }
            });
        }
    };
});

// Transclusion
angular.module('app').directive('displayBox', function () {
    return {
        restrict: 'E',
        templateUrl: 'displayBox.html',
        controller: function ($scope) {
            $scope.hidden = false;
            $scope.close = function () {
                $scope.hidden = true;
            };
            console.log('Directive Scope ', $scope);
            $scope.message = 'Hi from directive scope message'
        },
        transclude: true,
        scope: true
    }
});

angular.module('app').controller('innerCtrl', function ($scope) {
    console.log('Transcluded Items scope ', $scope);
});

/*Questionnaire directive */
angular.module('app').directive('myQuestion', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'myQuestion.html',
        scope: {
            questionText: '@q'
        }
    }
});













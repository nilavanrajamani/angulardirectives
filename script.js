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

    /*Advanced Transclusion */
    $scope.items = [1, 3, 5, 7];

    /*Recreating ng-repeat */
    $scope.bountyHunters = [{ name: 'Nilavan', age: 45 }, { name: 'Surya', age: 50 }, { name: 'Thamarai', age: 23 }];

    $scope.add = function () {
        $scope.bountyHunters.push({ name: 'Sakthi', age: 19 });
    };

    $scope.remove = function () {
        $scope.bountyHunters.length--;
    };
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

function userInfoCardCtrl($scope) {
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
        controller: userInfoCardCtrl
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

angular.module('app').directive('myTransclude', function () {
    return {
        restrict: 'A',
        //transclude: true,
        transclude: 'element',
        link: function (scope, element, attrs, ctrl, transclude) {
            transclude(scope, function (clone) {
                element.after(clone);
            });
        }
    }
});

angular.module('app').directive('myLazyRender', function () {
    return {
        restrict: 'A',
        transclude: 'element',
        priority: 1200,
        link: function (scope, element, attrs, ctrl, transclude) {
            var unwatchit = scope.$watch(attrs.myLazyRender, function (value) {
                if (value) {
                    transclude(scope, function (clone) {
                        element.after(clone);
                    });
                    unwatchit();
                }
            });
        }
    }
});

angular.module('app').directive('userList', function ($compile) {
    return {
        restrict: 'A',
        transclude: 'element',
        link: function (scope, element, attrs, ctrl, transclude) {
            var pieces = attrs.userList.split(' ');
            var itemString = pieces[0];
            var collectionName = pieces[2];
            var elements = [];

            scope.$watchCollection(collectionName, function (collection) {

                if (elements.length > 0) {
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].el.remove();
                        elements[i].scope.$destroy();
                    }
                    elements = [];
                }

                for (var i = 0; i < collection.length; i++) {
                    var childScope = scope.$new();
                    childScope[itemString] = collection[i];
                    transclude(childScope, function (clone) {
                        //var wrapper = angular.element('<div class="well"></div>');
                        var template = $compile('<div class="panel panel-primary"><div class="panel-heading">{{' + itemString + '.name}}</div><div class="panel-body"></div>"');
                        var wrapper = template(childScope);
                        console.log("cloned element", clone);
                        wrapper.find(".panel-body").append(clone);
                        element.before(wrapper);

                        var item = {};
                        item.el = wrapper;
                        item.scope = childScope;
                        elements.push(item);
                    });
                }
            });
        }
    }
});


/*PreLink and PostLink functions*/
angular.module('app').directive('emperor', function () {
    var name = 'The Emperor';
    return {
        restrict: 'E',
        scope: true,
        controller: function($scope){
            this.name = name;
        },
        link: {
            post: function (scope, element, attrs) {
                element.data('name', 'The Emperor');
                scope.master = 'The Emperor';
            }
        }
    }
});

angular.module('app').directive('vader', function () {
    var name = 'The Vader';
    return {
        restrict: 'E',
        scope: true,
        require: '^emperor',
        controller: function($scope){
            this.name = name;
        },
        link: {
            post: function (scope, element, attrs, emperorCtrlr) {
                element.data('name', 'Vader');
                console.log('Master', scope.master);
                console.log('Value from emperor controller', emperorCtrlr.name)
            }
        }
    }
});

angular.module('app').directive('starkiller', function () {
    return {
        restrict: 'E',
        scope: true,
        require: ['^vader','^emperor'],
        link: {
            post: function (scope, element, attrs, controllers) {
                console.log(controllers[0].name);
                console.log(controllers[1].name);
                element.data('name', 'Starkiller');
                console.log('Master', scope.master);
            }
        }
    }
});


angular.module('app').directive('swTabstrip', function(){
    return{
        restrict: 'E',
        transclude: true,
        templateUrl: 'swTabstrip.html',
        controller: function($scope){
            $scope.panes = [];
            $scope.select = function(pane){
                pane.selected = true;
                $scope.panes.forEach(function(curPane){
                    if(curPane != pane){
                        curPane.selected = false;
                    }
                });
            }

            this.addPane = function(pane){
                $scope.panes.push(pane);
                if($scope.panes.length === 1){
                    pane.selected = true;
                }
            }
        }
    }
});

angular.module('app').directive('swPane', function(){
    return{
        restrict: 'E',
        transclude: true,
        scope:{
            title:"@"
        },
        require: '^swTabstrip',
        link: function(scope, element, attrs, tabstripCtrl){
            tabstripCtrl.addPane(scope);
        },
        templateUrl: 'swPane.html'
    }
});









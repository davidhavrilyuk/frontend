var bookmarksApp = angular.module("bookmarksApp", ["ngRoute"])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add',
            {
                templateUrl: 'views/addForm.html',
                controller: 'addBCtrl'
            }
        );

        $routeProvider.when('/list',
            {
                templateUrl: 'views/bookmarksList.html',
                controller: 'deleteBCtrl'
            }
        );

        $routeProvider.when('/home',
            {
                templateUrl: 'views/index.html',
                controller: 'StyleCtrl'
            }
        );

        $routeProvider.otherwise({redirectTo:"/home"});
    }]);


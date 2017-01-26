bookmarksApp.controller("StyleCtrl", function ($scope, $http) {
    $scope.hoverIn = function() {
        this.hover = true;
    };

    $scope.hoverOut = function() {
        this.hover = false;
    };

    $scope.hovIn = function() {
        this.cls = true;
    };

    $scope.hovOut = function() {
        this.cls = false;
    };

 ////  $http.get("model.json").success(function (data) {
 ////      $scope.list = data;
 ////  }); не видет эту модель, не знаю почему

    $scope.list = model;
});
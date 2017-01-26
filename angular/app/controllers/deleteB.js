bookmarksApp.controller("deleteBCtrl", function ($scope, $http) {
    $scope.deleteBookmarks = function (id) {
        for ( var i in $scope.list.bookmarks ) {
            if ($scope.list.bookmarks[i].id == id) {
                $scope.list.bookmarks.splice(i, 1);
            }
        }
    };
});
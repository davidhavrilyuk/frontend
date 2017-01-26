bookmarksApp.controller("addBCtrl", function ($scope, $http) {
    $scope.addBookmarks = function (name, url, desc) {
        $scope.list.bookmarks.push({
            id: $scope.list.bookmarks.length + 1,
            name: name,
            url: url,
            desc: desc
        });
    };

});
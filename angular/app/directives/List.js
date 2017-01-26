bookmarksApp.directive("customList", function () {
    return function (scope, element, attr) {
        var ul = angular.element("<ul>");
        element.append(ul);

        for(var i = 0; scope.list.bookmarks.length; i++) {
            var li = angular.element("<li>");
            li.text(scope.list.bookmarks[i].name);
            ul.append(li);
        }
    }
});
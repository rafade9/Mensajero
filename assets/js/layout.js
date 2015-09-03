(function () {
    var app = angular.module('msgApp', ['mainApp']);
    app.directive('index', function () {
        return {
            restrict: 'E',
            templateUrl: '/html/index.html'
        }
    });
})();

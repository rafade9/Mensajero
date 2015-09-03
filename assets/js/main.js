(function () {
    var mainApp = angular.module('mainApp', []);
    mainApp.controller('MainController', function ($scope, $http) {

        $scope.init = function () {
            console.log("En init");
            io.socket.get('/api/mensaje/subscribe', function (res) {
                console.info("res:::::  ", res)

            });
        }

        $scope.users = [{
            user: 'Rafa'
        }, {
            user: 'Robocop'
        }, {
            user: 'Ironman'
        }]

        $scope.msgs = [{
            id: 1,
            createdAt: '2015 - 09 - 02 T19: 05: 00.902 Z',
            user: 'Rafa',
            tipo: 1,
            msg: 'Se ha conectado'
        }, {
            id: 2,
            createdAt: '2015 - 09 - 02 T19: 06: 00.902 Z',
            user: 'Robocop',
            tipo: 2,
            createdAt: '2015 - 09 - 02 T19: 07: 00.902 Z',
            msg: 'Hola, Rafa'
        }, {
            id: 3,
            createdAt: '2015 - 09 - 02 T19: 08: 00.902 Z',
            user: 'Rafa',
            tipo: 2,
            msg: 'Hola, Robocop'
        }, {
            id: 4,
            createdAt: '2015 - 09 - 02 T19: 09: 00.902 Z',
            user: 'Ironman',
            tipo: 3,
            msg: 'Se ha ido'
        }]

        $scope.subscribe = function (username) {
            $scope.subscribed = true;

            io.socket.get('/api/mensaje/subscribe', function (res) {
                console.info("res:::::  ", res)

            });

            $scope.msgs.push({
                id: 5,
                createdAt: '2015 - 09 - 02 T19: 11: 00.902 Z',
                user: username,
                tipo: 1,
                msg: 'Se ha conectado'
            });
        }
    });
})();

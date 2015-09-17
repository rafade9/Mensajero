(function () {
    var mainApp = angular.module('mainApp', []);
    mainApp.controller('MainController', function ($scope, $http) {

        $scope.users = [];
        $scope.msgs = [];
        $scope.msgGral = "";

        $scope.subscribe = function (username) {
            $scope.subscribed = true;
            $scope.username = '';
            io.socket.post('/mensaje/subscribe', {
                username: username
            }, function (res) {
                console.info("res:::::  ", res)
                $scope.users = res.users;
                $scope.$digest();
                io.socket.on('updatedUsers', function (obj) {
                    console.log(angular.toJson(obj));
                    $scope.users = obj;
                    $scope.$digest();
                });
                io.socket.on('mensajes', function (m) {
                    $scope.msgs.push(m);
                    $scope.$digest();
                });
                io.socket.on('privateMesage', function (m) {
                    alert(m.msgP);
                    //console.log(m.msgP);
                });
            });
        };

        $scope.generalMsg = function (msg) {
            $scope.msgGral = "";
            io.socket.post('/mensaje/generalMsg', {
                msg: msg
            }, function (res) {
                console.log(angular.toJson(res));
            });
        }

        $scope.privateMsg = function (user) {
            console.log("Se va a enviar un mensaje privado a: " + user.username);
            io.socket.post('/mensaje/privateMsg', {
                msg: 'Hola',
                uid: user.uid
            }, function (res) {});
        };

        $scope.leaveChat = function () {
            io.socket.get('/mensaje/leave', function (res) {
                $scope.subscribed = false;
                $scope.$digest();
                alert("Ha dejado la sala");
            });
        };
    });
})();

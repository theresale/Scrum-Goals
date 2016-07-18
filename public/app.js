"use strict";

var app = angular.module('myApp', []);
app.controller('toBuyCtrl', function($scope, $http, sendData) {
    $scope.toBuyList = [];
    $scope.toBuyItems = [];

    $scope.toBuyAdd = function() {
        $scope.toBuyList.push({toBuyText:$scope.toBuyInput, done:false});
        $scope.toBuyItems.push($scope.toBuyInput);
        $scope.toBuyInput = "";
    };

    $scope.remove = function() {
        var oldList = $scope.toBuyList;
        $scope.toBuyList = [];
        $scope.toBuyItems = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) {
                $scope.toBuyItems.push(x.toBuyText);
                $scope.toBuyList.push(x);
            }
        });
    };

    $scope.$on('shoppingListReceived', function() {
        var array = sendData.userList;
        for(var i=0; i<array.length; i++){
        $scope.toBuyList.push({toBuyText:array[i], done:false});
        $scope.toBuyItems.push(array[i]);
        }
    });

    $scope.saveList = function() {
        $http({
            method: "PUT",
            url: "/users",
            data: {item: $scope.toBuyItems, id: sendData.userID}
        }).then(function successCallback(data) {
            console.log("");
        },
        function errorCallback(error) {
            console.log(error);
        });
    };
});

app.controller('registerCtrl', function($scope, $http) {
    $scope.addRegistrants = function() {
        $http({
            method: "POST",
            url: "/users",
            data: {username: $scope.newUsername, password: $scope.newPassword}
        }).then(function successCallback(data) {
            return true;
        },
        function errorCallback(error) {
            return false;
        });
    };
});

app.controller('loginCtrl', function($scope, $http, sendData, $rootScope) {
    $scope.verifyUser = function() {
        $http({
            method: "GET",
            url: "/users",
            params: {username: $scope.username, password: $scope.password}
        }).then(function successCallback(data) {
             sendData.userID = data.data.rows[0].profile_id;
             sendData.userList = data.data.rows[0].item;
             console.log(sendData.userID);
             $rootScope.$broadcast('shoppingListReceived');
        },
        function errorCallback(error) {
            console.log(error);
        });
    };
});

app.service('sendData', function(){
    this.userID = 0;
    this.userList = [];

});



"use strict";

var app = angular.module('myApp', []);

app.controller('registerCtrl', function($scope, $http, sendData) {
    $scope.addRegistrants = function() {
        $http({
            method: "POST",
            url: "/users",
            data: {username: $scope.newUsername, password: $scope.newPassword, team: null}
        }).then(function successCallback(data) {
            sendData.userID = data.data.rows[0].id;
            alert("Thank you for registering, please login!");
        },
        function errorCallback(error) {
            return false;
        });
    };
});

app.controller('teamCtrl', function($scope, $http){
    $scope.addTeam = function() {
        $http({
             method: "POST",
             url: "/teams",
             data: {team: $scope.team_name}
        }).then(function successCallback(data){
            console.log(data);
        },
        function errorCallback(error) {
            console.log(error);
        });
    };
});

app.controller('teamListCtrl', function($scope, $http, sendData){
    $scope.chosenTeam = "";

    $scope.getTeams = function() {
        $scope.teamArray = [];
        $http({
            method: "GET",
            url: "/teams",
        }).then(function successCallback(data){
            for(var i=0; i<data.data.rows.length; i++) {
                $scope.teamArray.push(data.data.rows[i]);
            };
        },
        function errorCallback(error) {
            console.log(error);
        });
    };

    $scope.joinTeam = function(){
        $http({
            method: "PUT",
            url: "/users",
            data: {team_id: $scope.chosenTeam, id: sendData.userID}
        }).then(function successCallback(data){
            console.log(data);
        },
        function errorCallback(error) {
            console.log(error);
        });
    };
});

app.controller('loginCtrl', function($scope, $http) {
    $scope.verifyUser = function() {
        $http({
            method: "GET",
            url: "/users",
            params: {username: $scope.username, password: $scope.password}
        }).then(function successCallback(data) {
            //sendData.userID = data.data.rows[0].team_member_id;
            //sendData.userList = data.data.rows[0].item;
             // console.log(sendData.userID);
             // $rootScope.$broadcast('shoppingListReceived');
        },
        function errorCallback(error) {
            console.log(error);
        });
    };
});

app.service('sendData', function(){
    this.userID = 0;
    this.chosenTeam;
});

// app.controller('taskCtrl', function($scope, $http, sendData) {
//     $scope.todoList = [];
//     $scope.todoItems = [];

//     $scope.toBuyAdd = function() {
//         $scope.todoList.push({todoText:$scope.todoInput, done:false});
//         $scope.todoItems.push($scope.todoInput);
//         $scope.todoInput = "";
//     };

//     $scope.remove = function() {
//         var oldList = $scope.todoList;
//         $scope.todoList = [];
//         $scope.todoItems = [];
//         angular.forEach(oldList, function(x) {
//             if (!x.done) {
//                 $scope.todoItems.push(x.todoText);
//                 $scope.todoList.push(x);
//             }
//         });
//     };

//     $scope.$on('shoppingListReceived', function() {
//         var array = sendData.userList;
//         for(var i=0; i<array.length; i++){
//         $scope.todoList.push({toBuyText:array[i], done:false});
//         $scope.todoItems.push(array[i]);
//         }
//     });

//     $scope.saveList = function() {
//         $http({
//             method: "PUT",
//             url: "/users",
//             data: {item: $scope.todoItems, id: sendData.userID}
//         }).then(function successCallback(data) {
//             console.log("");
//         },
//         function errorCallback(error) {
//             console.log(error);
//         });
//     };
// });


// app.service('sendData', function(){
//     this.userID = 0;
//     this.userList = [];
// };


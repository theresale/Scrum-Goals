"use strict";

var app = angular.module('myApp', []);

app.controller('registerCtrl', function($scope, $http) {

    $scope.addRegistrants = function() {
        $http({
            method: "POST",
            url: "/users",
            data: {team_name: $scope.newTeamname, password: $scope.newPassword, admin: $scope.admin}
        }).then(function successCallback(data) {
            alert("Thank you for registering your team, please login!");
        },
        function errorCallback(error) {
            return false;
        });
    };
});

app.controller('loginCtrl', function($scope, $http) {
    $scope.verifyUser = function() {
        $http({
            method: "GET",
            url: "/users",
            params: {team_name: $scope.teamname, password: $scope.password}
        }).then(function successCallback(data) {
            console.log(data);
             // sendData.userID = data.data.rows[0].profile_id;
             // sendData.userList = data.data.rows[0].item;
             // console.log(sendData.userID);
             // $rootScope.$broadcast('shoppingListReceived');
        },
        function errorCallback(error) {
            console.log(error);
        });
    };
});

app.controller('memberCtrl', function($scope, $http){
    $scope.addMember = function() {
        $http({
            method: "PUT",
            url: "/users",
            data: {team_member: $scope.teammember}
        }).then(function successCallback(data){
        },
        function errorCallback(error) {
            console.log(error);
        });
    };
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


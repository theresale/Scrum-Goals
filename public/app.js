"use strict";

var app = angular.module('myApp', []);

app.controller('registerCtrl', function($scope, $http, sendData, displayService) {
    $scope.showRegister = function(){
        return displayService.showRegister;
    };

    $scope.addRegistrants = function() {
        $http({
            method: "POST",
            url: "/users",
            data: {username: $scope.newUsername, password: $scope.newPassword, team: null}
        }).then(function successCallback(data) {
            sendData.userID = data.data.rows[0].id;
            alert("Thank you for registering, now you may join a team!");
            displayService.showRegister = false;
            displayService.showCreateTeam = true;
            displayService.showTeams = true;
            displayService.showLogin = false;
        },
        function errorCallback(error) {
            return false;
        });
    };
});

app.controller('teamCtrl', function($scope, $http, displayService){
    $scope.showCreateTeam = function(){
        return displayService.showCreateTeam;
    };

    $scope.addTeam = function() {
        $http({
             method: "POST",
             url: "/teams",
             data: {team: $scope.team_name}
        }).then(function successCallback(data){
            alert("You have successfully added a new team, please refresh teams to join.");
        },
        function errorCallback(error) {
            console.log(error);
        });
    };
});

app.controller('teamListCtrl', function($scope, $http, sendData, displayService){
    $scope.chosenTeam = "";
    $scope.showTeams = function(){
        return displayService.showTeams;
    };

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
            console.log("Successfully Joined Team");
            displayService.showCreateTeam = false;
            displayService.showTeams = false;
            displayService.showLogin = true;
        },
        function errorCallback(error) {
            console.log(error);
        });
    };
});

app.controller('loginCtrl', function($scope, $http, sendData, displayService) {
    $scope.showLogin = function(){
        return displayService.showLogin;
    };

    $scope.verifyUser = function() {
        $http({
            method: "GET",
            url: "/users",
            params: {username: $scope.username, password: $scope.password}
        }).then(function successCallback(data) {
            displayService.showLogin = false;
            displayService.showUser = true;
            displayService.showRegister = false;
            displayService.showTeamButton = true;
            sendData.userTeamId = data.data.rows[0].team_id;
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

app.controller('getUserTeamCtrl', function($scope, $http, sendData, displayService) {
    $scope.showUser = function() {
        $scope.getYourTeam;
        return displayService.showUser;
    };

    $scope.showTeamButton = function() {
        return displayService.showTeamButton;
    };
    
    $scope.showTeam = function() {
        return displayService.showTeam;
    };

    $scope.teamName = "Welcome to Your Homebase";
    $scope.teamMembers = [];

    $scope.getYourTeam = function() {
        $http({
            method: "GET",
            url: "/yourteam",
            params: {id: sendData.userTeamId}
        }).then(function successCallback(data){
            displayService.showTeam = true;
            displayService.showTeamButton = false;
            $scope.teamMembers = data.data.data[1].rows.map(function(obj){
                return {id: obj.id, username: obj.username};
            });
            $scope.teamName = data.data.data[0].rows[0].name;
        },
        function errorCallback(error) {
            console.log(error);
        }); 
    };
});



app.service('sendData', function(){
    this.userID = 0;
    this.chosenTeam;
    this.userTeamId;
    this.teamArray;
});

app.service('displayService', function(){
    this.showLogin = true;
    this.showRegister = true;
    this.showCreateTeam = false;
    this.showTeams = false;
    this.showUser = false;
    this.showTeamButton = false;
    this.showTeam = false;
});



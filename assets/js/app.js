//(function(){
 //   "use strict";
     var app = angular.module('mainApp', ['ngTagsInput','ngRoute','ngCookies','ngFileUpload','rzModule']);
     app
     .config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "login.html",
            controller: "loginController"
        })
        .when("/candidatelist/profile", {
            templateUrl : "profile.html",
            controller : "profileController"
        })
        .when("/candidatelist", {
            templateUrl : "candidatelist.html",
            controller : "mainController"
        })
        .when("/recruitmentmanagement", {
            templateUrl : "management.html",
            controller : "managementController"
        })
        .when("/jobs", {
            templateUrl : "jobs.html",
            controller : "jobsController"
        })
        .when("/shortlist", {
            templateUrl : "shortlist.html",
            controller : "shortlistController"
        })
        .when("/scheduling", {
            templateUrl : "screening.html",
            controller : "screeningController"
        })
        .when("/screening", {
            templateUrl : "scheduling.html",
            controller : "schedulingController"
        })
        .when("/rejected", {
            templateUrl : "rejected.html",
            controller : "rejectedController"
        })
        .when("/offered", {
            templateUrl : "offered.html",
            controller : "offeredController"
        })
        .when("/denied", {
            templateUrl : "denied.html",
            controller : "deniedController"
        })
        .when("/started", {
            templateUrl : "started.html",
            controller : "startedController"
        })
        .when("/selected", {
            templateUrl : "selected.html",
            controller : "selectedController"
        })
        .when("/onhold",{
            templateUrl : "onhold.html",
            controller : "onholdController"
        })
        .otherwise({
            redirectTo: "/"
        });
     }).service('navbarCheck',function(){
        this.checkPage = function(location){
            if(location === '/')
            {
                return false;   
            }
            else
            {
                return true;
            }
        }
     })
     .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        $rootScope.$on('$locationChangeStart', function(event, next, current){
            if($location.path() == '/' && $rootScope.globals.currentUser)
            {
                $location.path('/recruitmentmanagement');
                toastr.options.closeButton = true;
                toastr.options.timeOut = 1300;
                toastr.error('You can log out only with the logout button!');
                
                // toastr.clear();
                // alert("You can log out only with the logout button!");
            }
        })
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/' && !$rootScope.globals.currentUser) {
                $location.path('/');
            }
        });
   }]);



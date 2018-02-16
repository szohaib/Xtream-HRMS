(function () {
    "use strict";
    //var app= angular.module('mainApp', ["ngRoute"]);
    app.controller('shortlistController', function($scope, $http, $location,$route, $rootScope, AuthenticationService,$filter){

        console.log($rootScope.globals);
        $scope.current = $rootScope.globals.currentUser.username;

        $scope.globalDetails = [];
        $scope.initCall = function(){
            $http({
                method: "GET",
                url: "http://202.153.46.138:82/api/Resume/details",
                dataType: 'json',
                headers: {"Content-Type": "application/json"}
            }).then(
                function(response){
                    $scope.details = response.data;
                    // var remv = [];
                    for(var i=0;i<$scope.details.length;i++)
                    {
                            $scope.sample = 
                                {
                                    'Id': $scope.details[i].Id,
                                    'First_Name' : $scope.details[i].First_Name,
                                    'Last_Name' : $scope.details[i].Last_Name,
                                    'Exeperience' : $scope.details[i].Exeperience,
                                    'Email_Id' : $scope.details[i].Email_Id,
                                    'Expected_CTC' : $scope.details[i].Expected_CTC,
                                    'Skill_ids' : $scope.details[i].Skill_ids,
                                    'isChecked' : false
                                };
                                //console.log($scope.details[i].Id);
                               $scope.globalDetails.push($scope.sample); 
                    }

                    console.log($scope.globalDetails);


                    
                }
            );
        };
        $scope.viewAll = function(a){
            $scope.viewall = $filter('filter')($scope.details,{Id:a});
            // console.log($scope.viewall);
        };
        $http({
            method: "GET",
            url:"http://202.153.46.138:82/api/Job/GetShort",
            dataType: 'json',
            headers: {"Content-Type":"application/json"}
        }).then(function(response){
            $scope.shortlistData = response.data;
            console.log($scope.shortlistData);
        });
        $scope.var123 = [];
        $scope.callJobShortlist = function(a){
            //console.log(a);
            for(var i=0;i<$scope.var123.length;i++)
            {
                $filter('filter')($scope.globalDetails,{Id:$scope.var123[i]})[0].isChecked = false;
            }
            
            
            if(a == "Application Developer")
            {
                $scope.varData = 1005;
            }
            if(a == "programming")
            {
                $scope.varData = 1002;
            }
            if(a == "Project Management")
            {
                $scope.varData = 1006;
            }
            if(a == "Database Administration")
            {
                $scope.varData = 1008;
            }
            if(a == "Business Analyst")
            {
                $scope.varData = 1007;
            }
            if(a == "Web Development")
            {
                $scope.varData = 1003;
            }
            for(var i=0;i<$scope.shortlistData.length;i++)
            {
                if($scope.shortlistData[i].Skill_ids == $scope.varData)
                {
                    $scope.var123.push($filter('filter')($scope.globalDetails,{Id:$scope.shortlistData[i].Id})[0].Id);
                    $filter('filter')($scope.globalDetails,{Id:$scope.shortlistData[i].Id})[0].isChecked = true;
                    //console.log($scope.var123);

                }
            }
            var j=0;
            for(var i=0;i<$scope.globalDetails.length;i++)
            {
                if($scope.globalDetails[i].isChecked == true)
                {
                    var temp = $scope.globalDetails[i];
                    $scope.globalDetails[i] = $scope.globalDetails[j];
                    $scope.globalDetails[j] = temp;
                    j++;
                }
            }
            //console.log($scope.globalDetails);
        };
        $scope.ResetJob = function(){
            $scope.search.Skill_ids = '';
            $scope.all = '';
        };
        $scope.check = [];
        $scope.projectCheck=[];
        $scope.jobName =[];
        $scope.unique = [];
        $http({
            method: "GET",
            url:"http://202.153.46.138:82/api/Job/getJobs",
            dataType: 'json',
            headers: {"Content-Type":"application/json"}
        }).then(function(response){
            //console.log(response.data);
            for(var i=0;i<response.data.length;i++)
            {
                $scope.check[i] = response.data[i].isVacancyClosed;
                $scope.projectCheck[i] = response.data[i].Project_Vacancy;
                $scope.jobName[i] = response.data[i].Name;
            }
            for(var i =0;i<response.data.length;i++)
            {
                if(($scope.check[i]!=true) && ($scope.unique.indexOf($scope.jobName[i]) == -1) )
                {
                    $scope.unique.push($scope.jobName[i]);
                }

            }


        });
        
        $scope.shortlistCall = function(c,b){
            var found = $filter('filter')($scope.globalDetails,{Id:b});
            //$scope.temp = [];
            //console.log(a);
            //var c = false;
            var jobT;
            
            if($scope.search.Skill_ids == "Application Developer")
            {
                jobT = 1005;
            }
            if($scope.search.Skill_ids == "programming")
            {
                jobT = 1002;
            }
            if($scope.search.Skill_ids == "Project Management")
            {
                jobT = 1006;
            }
            if($scope.search.Skill_ids == "Database Administration")
            {
                jobT = 1008;
            }
            if($scope.search.Skill_ids == "Business Analyst")
            {
                jobT = 1007;
            }
            if($scope.search.Skill_ids == "Web Development")
            {
                jobT = 1003;
            }
            if(c == true)
            {
                var temp123 = {
                    "Id": b,
                    "Skill_ids": jobT
                };
                $scope.shortlistData.push(temp123);
            }
            else if(c == false)
            {
                //alert("Hello");
                for(var i=0; i< $scope.shortlistData.length; i++)
                {
                    if($scope.shortlistData[i].Id == b)
                    {

                        $scope.shortlistData.splice(i, 1);
                    }
                }
                //alert("Hello");
            }

            //console.log($scope.shortlistData);
        };

        // $http({
        //     method: "GET",
        //     url: "http://202.153.46.138:82/api/Job/getScheduled",
        //     dataType: 'json',
        //     headers: {"Content-Type": "application/json"}
        // }).then(
        //     function(response){
        //         console.log($scope);
        //         for(var i=0;i<response.data.length;i++)
        //         {
        //             $scope.shortlistData.push(response.data[i]);
                    
        //         }
        //         //console.log($scope.shortlistData);
        //     }
        // );
        //console.log($scope.search.Skill_ids);
        $scope.finalCall = function(){
            //alert("Hello");

            $http({
                method: "POST",
                url: "http://202.153.46.138:82/api/Job/PostShort",
                dataType: 'json',
                headers: {"Content-Type": "application/json"},
                data: $scope.shortlistData
            }).then(
                function(response){
                    alert("Success!");
                    $route.reload();
                }
            );
        }
    });
}());
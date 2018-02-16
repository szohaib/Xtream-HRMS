(function () {
    "use strict";
    //var app= angular.module('mainApp', {"ngRoute"]);
    app.controller('selectedController', function($scope, $http, $location, $rootScope,$route, AuthenticationService){
        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
        console.log($rootScope.globals);
        $scope.current = $rootScope.globals.currentUser.username;
        $scope.updateSelected = function(){
            $scope.screenData = {
                "Candidate_Name": document.getElementById('name2').value,
                "Phone": document.getElementById('phone2').value,
                "Email_Id": document.getElementById('email2').value,
                "Interview_Dt": document.getElementById('date2').value,
                "Interview_Time": document.getElementById('time2').value,
                "Round1": document.getElementById('r1_2').value,
                "Round1Type":document.getElementById('r1t_2').value,
                "Round1_Comments": document.getElementById('r1c_2').value,
                "Round2": document.getElementById('r2_2').value,
                "Round2Type": document.getElementById('r2t_2').value,
                "Round2_Comments": document.getElementById('r2c_2').value,
                "Round3": document.getElementById('r3_2').value,
                "Round3Type": document.getElementById('r3t_2').value,
                "Round3_Comments": document.getElementById('r3c_2').value,
                "Final_Status_Id": document.getElementById('status').value,
                "Status_Reason": document.getElementById('reason').value,
                "Modified_By": 1,
                "Modified_DT": "2018-01-04T15:15:42.68"
            };
            var temp = document.getElementById('Id2').value;
            //console.log(temp);
            $http({
                'method': 'POST',
                'url': 'http://202.153.46.138:82/api/Job/updateScreening/' + temp,
                'headers': {
                  'Content-Type': 'application/json',
                },
                'data': $scope.screenData
              }).then(
                  function(response){
                    alert("Success!");
                    //$scope.dismiss();
                    $route.reload();
                    
            });
            
        };
    });
    
}());
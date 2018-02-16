(function () {
    "use strict";
    //var app= angular.module('mainApp', ["ngRoute"]);
    app.controller('jobsController', function($scope, $http, $route, $location ,$rootScope, AuthenticationService){

        //console.log(Number("100000").toLocaleString('en-IN'));
        console.log($rootScope.globals);
        $scope.current = $rootScope.globals.currentUser.username;

        // $scope.indianCurrency = function(){
        //   $scope.someValue = Number($scope.minValue).toLocaleString('en-IN');
        //   console.log($scope.someValue);
        // };
        $scope.rangeValid = function(){
          if($scope.minValue> $scope.maxValue)
          {
            $scope.errorMessage = "This value should be greater than min range value!";
          }
          else
          {
            $scope.errorMessage = '';
          }
        };
        $scope.pullSkills=[];
        $http({
          'method' : 'GET',
          'url' : 'http://202.153.46.138:82/api/Resume/pullSkills',
          'headers' : {
              'Content-Type' : 'application/json',
              //'Authorization' : 'Basic YWRtaW46eHRyZWFtaXRAMTIz'
          }
        }).then(function(response){
          console.log(response.data);
          $scope.pullSkills = response.data;
        });
        $scope.passModal = function(v) {
          console.log(v);
          // $scope.jData = v;
          //console.log($scope.edit_Id);
          $scope.edit_Id = v.Id;
          var c=0;
          for(var i = 0; i<$scope.jobData.length;i++)
          {
            if($scope.jobData[i].Id == v.Id)
            {
              c=i;
            }
          }
          var aa = $scope.jobData[c].Name;
          var bb = $scope.jobData[c].Project_Vacancy;
          var cc = $scope.jobData[c].Created;
          var dd = $scope.jobData[c].Created_DT;
          var ee = $scope.jobData[c].Experience;
          var ff = $scope.jobData[c].Vacancy_Comments;
          var gg = Number($scope.jobData[c].StartRange);
          var hh = Number($scope.jobData[c].EndRange);

          $scope.job_title2 = aa;
          $scope.project2 = bb;
          $scope.created_by2 = cc;
          $scope.created_date2 = dd;
          $scope.experience2 = ee;
          $scope.comment2 = ff;
          $scope.minValue2 = gg;
          $scope.maxValue2 = hh;
      };
      $scope.activeCall = function(a){
       // console.log(a);
       // alert("Hello");
        $scope.activeDat = {
          "Id": 26,
          "isVacancyClosed": 0
        };
        $http({
          'method': 'POST',
          'url': 'http://202.153.46.138:82/api/Job/activeToggle',
          'headers': {
            'Content-Type': 'application/json',
          },
          'data': $scope.activeDat
        }).then(function(response){
          console.log(response);
          alert('Success');
        });
      };
      $scope.inActiveCall = function(){
        //alert("Bye");
        $scope.activeDat = {
          "Id": 26,
          "isVacancyClosed": 1
        };
        $http({
          'method': 'POST',
          'url': 'http://202.153.46.138:82/api/Job/activeToggle',
          'headers': {
            'Content-Type': 'application/json',
          },
          'data': $scope.activeDat
        }).then(function(response){
          console.log(response);
          alert('Success');
        });
      };
      
      $scope.callActive = function()
      {
        
        //console.log(aori);
        var elem = document.getElementById('active-tab');
        var elem2 = document.getElementById('inactive-tab');
        console.log(elem.classList);
        console.log(elem2.classList);
        if(elem.classList == "btn btn-default btn-on btn-xs active-status-button active")
        {
          $scope.bit = 1;
        }
        if(elem.classList == "btn btn-default btn-on btn-xs active-status-button" )
        {
          $scope.bit=0;
        }

      };
      $scope.submitUpdate = function(){
        //console.log(a);
        var c = $scope.current.trim();
        var cb;
        if(c == "admin")
        {
          cb = 1;
        }
        if(c == "interviewer")
        {
          cb = 11;
        }
        if(c == "senior_HR")
        {
          cb = 12;
        }
        if(c == "junior_HR")
        {
          cb = 13;
        }
        //alert($scope.bit);
        $scope.data123 = {
          "Name": document.getElementById('job_title2').value,
          "Project_Vacancy": document.getElementById('project2').value,
          "Created": document.getElementById('created_by2').value,
          "Created_DT": document.getElementById('created_date2').value,
          "StartRange" : document.getElementById('minValue2').value,
          "EndRange": document.getElementById('maxValue2').value,
          "Experience": document.getElementById('experience2').value,
          "Vacancy_Comments": document.getElementById('comment2').value,
          "isVacancyClosed" : $scope.bit,
          "Created_By": cb

        };
        console.log($scope.data123);
        var num = document.getElementById('editor-title123').value;
        $http({
          'method': 'POST',
          'url': 'http://202.153.46.138:82/api/Job/updateJobs/'+num,
          'headers': {
            'Content-Type': 'application/json',
          },
          'data': $scope.data123
        }).then(
          function(response){
            
            location.reload();
            alert("Success!");
          }
        );
      };
        var d = new Date();
        $scope.created_date = d;
        $scope.created_by = $scope.current;
        $http({
          'method' : 'GET',
          'url' : 'http://202.153.46.138:82/api/Job/getJobs',
          'headers' : {
              'Content-Type' : 'application/json',
              //'Authorization' : 'Basic YWRtaW46eHRyZWFtaXRAMTIz'
          },
        }).then(
          function(response){
            $scope.jobData = response.data;
          });
        $scope.jobSubmit = function(){
          var Date123 = $scope.created_date;
          var dd=Date123.getDate();//yeilds date
          var MM=Date123.getMonth();//yeilds month
          if(MM<10)
          {
              MM = MM+1;
              MM='0'+MM;
          }
          else
          {
              MM = MM+1;
          } 
          var yyyy=Date123.getFullYear(); //yeilds year 
          var HH=Date123.getHours();//yeilds hours
          if(HH<10)
          {
              HH = HH+1;
              HH='0'+HH;
          }
          else
          {
              HH = HH+1;
          }   

          var Time=yyyy+"-"+MM+"-"+dd+"T10:10:10.000";
          var cb;
          var c = $scope.current.trim();
          if(c == "admin")
          {
            cb = 1;
          }
          if(c == "interviewer")
          {
            cb = 11;
          }
          if(c == "senior_HR")
          {
            cb = 12;
          }
          if(c == "junior_HR")
          {
            cb = 13;
          }


          var jobData = {
            "Name": $scope.job_title,
            "Experience": $scope.experience,
            "Project_Vacancy": $scope.project,
            "Vacancy_Comments": $scope.comment,
            "isVacancyClosed": false,
            "Modified_By": null,
            "Modified_DT": null,
            "Created_By": cb,
            "Created_DT": Time,
            "StartRange": $scope.minValue,
            "EndRange": $scope.maxValue
          };
          $http({
            'method' : 'post',
            'url' : 'http://202.153.46.138:82/api/Job/addJobs',
            'headers' : {
                'Content-Type' : 'application/json',
                //'Authorization' : 'Basic YWRtaW46eHRyZWFtaXRAMTIz'
            },
            'data' : jobData
        })
        .then(function successCallback(response){
          //$location.path('/');
          location.reload();
          alert("Success!");
        },
        function errorCallback(response){
          console.log(response);
          alert("Operation unsuccesful, Please try again!");
      })
        };

    });
}());
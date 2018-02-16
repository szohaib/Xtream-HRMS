(function () {
    "use strict";
    //var app= angular.module('mainApp', ['ngTagsInput','ngRoute']);

    app.controller('profileController',['$scope', '$http', '$location', '$rootScope', 'AuthenticationService','Upload', '$timeout', function($scope, $http, $location, $rootScope, AuthenticationService, Upload, $timeout){
      $scope.current = $rootScope.globals.currentUser.username;
      $scope.countprev = 0;

      
      $scope.tags = [];

        $scope.emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        $scope.phoneNumbr = /^[0-9]{10}$/;   

        $scope.modalValues = [];
        $http({
            method: "GET",
            url: "http://202.153.46.138:82/api/Resume/pullSkills",
            dataType: 'json',
            headers: {"Content-Type": "application/json"}
        }).then(
            function(response){
                //$scope.modalValues = response.data;
                for(var i=0;i<response.data.length;i++)
                {
                    if(response.data[i].indexOf(' ') != -1)
                    {
                        var wordSplit = response.data[i].split(' ');
                        console.log(wordSplit);
                        $scope.modalValues.push({ data: response.data[i], id : wordSplit[0] });
                    }
                    else
                    {
                        $scope.modalValues.push({ data: response.data[i], id : response.data[i] });
                    }
                }
                console.log($scope.modalValues);
            }
        );

        $scope.setFile = function(element) {
            $scope.$apply(function($scope) {
                $scope.theFile = element.files[0];
                $scope.FileMessage = '';
                var filename = $scope.theFile.name;
                console.log(filename.length)
                var index = filename.lastIndexOf(".");
                var strsubstring = filename.substring(index, filename.length);
                if (strsubstring == '.pdf' || strsubstring == '.doc' || strsubstring == '.docx')
                {
                  console.log('File Uploaded sucessfully');
                  $scope.filename = filename;
                }
                else {
                    $scope.theFile = '';
                      $scope.FileMessage = 'please upload correct File Name, File extension should be .pdf or .doc';
                      $scope.filename = '';
                      var f = document.getElementById('browse');
                      f.value = '';  
                }
    
            });
        };

        var l,i,s;
  $scope.toggleSelection = function toggleSelection(event) {
    // how to check if checkbox is selected or not
    //alert(event.target.checked);
    //console.log(event.target.value);
    if(event.target.checked == true)
    {
      l= {text: event.target.value};
      $scope.tags.push(l);
    }
    else{
      s= event.target.value;
      s= s.trim();
      l= {text: s};
      //console.log(l);
      for(i=$scope.tags.length-1;i>=0;i--)
      {
        if($scope.tags[i].text == l.text)
        {
          // remove($scope.tags[i].text);
          console.log($scope.tags[i].text);
          $scope.tags.splice(i,1);
          // $scope.tags.pop($scope.tags[i].text);
        }
      }
      //console.log($scope.tags);
      //$scope.tags.pop(l);
      event.target.checked = false;
      //var p = document.getElementsByName(event.target.value).value;
      //alert(p);
    }
  };
  $scope.items = [{}];
  $scope.addPrev123 = function(){
    $scope.items.push({});
 }
 var filepath;
  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
        file.upload = Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {file: file}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                console.log(response);
                filepath = 'https://'+response.data.requestHeaders.Host+'/upload/'+response.data.result[0].name;
                console.log(filepath);

            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * 
                                     evt.loaded / evt.total));
        });
    }   
};
$scope.list = [];
$scope.sno = 0;
$scope.add_update = function()
{
  $scope.sno=$scope.sno+1;  
  $scope.list.push({ sno:$scope.sno , cname: $scope.prev_name, type: $scope.prev_type, service : $scope.prev_service, sal : $scope.prev_sal, add : $scope.prev_add, design : $scope.prev_designation });  
  $scope.sno = $scope.prev_name = $scope.prev_add = $scope.prev_type = $scope.prev_service = $scope.prev_add = $scope.prev_designation = $scope.prev_sal = '';  
  //document.forms['userForm'].reset();;
  //console.log($scope.list[0].cname);
};
$scope.deleteUpdate = function(val)
{
    $scope.sno=$scope.sno-1;  
  $scope.list.splice($scope.list.indexOf(val),1);

};
        $scope.addCandidate = function() {
            //alert("Hi");
            //event.preventDefault();
            console.log($scope.tags);
            var array123 = [];
            var prog = {text:"programming"};
            prog=prog.text.trim();
            console.log(prog);
            var app = {text:"Application Developer"};
            app=app.text.trim();
            var pm = {text:"Project Management"};
            pm=pm.text.trim();
            var database = {text:"Database Administration"};
            database = database.text.trim();
            var ba={text:"Business Analyst"};
            ba=ba.text.trim();
            var web = {text:"Web Development"};
            web=web.text.trim();
            var c = {text:"C"};
            c=c.text.trim();
            for(i=0;i<$scope.tags.length;i++)
            {
                $scope.tags[i].text = $scope.tags[i].text.trim();
                if($scope.tags[i].text == prog)
                {
                    array123.push('1002');
                    continue;
                }
                if($scope.tags[i].text == app)
                {
                    array123.push('1005');
                    continue;
                }
                if($scope.tags[i].text == pm)
                {
                    array123.push('1006');
                    continue;
                }
                if($scope.tags[i].text == database)
                {
                    array123.push('1008');
                    continue;
                }
                if($scope.tags[i].text == ba)
                {
                    array123.push('1004');
                    continue;
                }
                if($scope.tags[i].text == web)
                {
                    array123.push('1007');
                    continue;
                }
                if($scope.tags[i].text == c)
                {
                    array123.push('1003');
                    continue;
                }

            }
            var Date123 = $scope.dob;
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
            //var da = DateTime.ParseExact(Time, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
            //console.log("Date "+Date);
            //console.log("da "+da);
            //console.log(array123);
            //console.log($scope.list[0].cname);
            var cn = [];
            var jt = [];
            var ps = [];
            var ls = [];
            var cu = [];
            var des = [];
            for(var i=0;i<$scope.list.length;i++)
            {
                cn.push($scope.list[i].cname);
                jt.push($scope.list[i].type);
                ps.push($scope.list[i].service);
                ls.push($scope.list[i].sal);
                cu.push($scope.list[i].add);
                des.push($scope.list[i].design);
            }
            
            //console.log($scope.cn);
            var candidateData = {
                "Resume_Code": $scope.applying || "sql",
                "Salutation_Id": Number($scope.salutation),
                "First_Name": $scope.firstName,
                "Last_Name": $scope.lastName,
                "Email_Id": $scope.email,
                "Nationality": $scope.nationality,
                "Identityfication_Type_Id": Number($scope.identity_type),
                "Identityfication_Number": $scope.identity_number,
                "DOB": Time,
                "Age": Number($scope.age),
                "Gender_Id": Number($scope.gender),
                "Exeperience": Number($scope.experience) || 3,
                "Current_CTC": 0,
                "Expected_CTC": Number($scope.ctc) || 3,
                "IsNegotiable": Boolean($scope.negotiable) || false,
                "Resume_Source": Number($scope.source) || 1,
                "Refered_By": $scope.referee || 1,
                "Qualification": Number($scope.qualification) || 1,
                "Resume_Path": filepath,
                "IsOnHold": true,
                "isSelected": false,
                "Modified_By": 1,
                "Modified_Dt":"2017-11-14T17:21:39.157",
                "Notice_Period": "gg",
                "Phone_Number": Number($scope.phone) || null,
                "CompanyName":cn,
                "JobType": jt,
                "PreviousService": ps,
                "LeavingSalary": ls,
                "Company_URL":  cu,
                "Designation": des,
                "Skill_ids": array123
            };
            console.log(candidateData);
            $http({
                'method' : 'post',
                'url' : 'http://202.153.46.138:82/api/resume/AddApplicant',
                'headers' : {
                    'Content-Type' : 'application/json',
                    //'Authorization' : 'Basic YWRtaW46eHRyZWFtaXRAMTIz'
                },
                'data' : candidateData
            })
            .then(function successCallback(response){
                console.log(response);
                $location.path('/candidatelist');
                alert("Success");
            },
            function errorCallback(response){
                console.log(response);
                alert("Operation unsuccesful, Please try again!");
            })
        };


    }]);

    
}());
 


var noob;
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$window) {
  $scope.login = function(){
    console.log("test log");
    user =$scope.user.username;
    password= $scope.user.password;
    $http.post('/login/'+user+'/'+password)
        .success(function(cb) {
            console.log("Succesfully POST le cookie /");
                console.log(cb);
                if(cb=='OK')
                {
                    $window.location.href="/#/tab/Liste";
                }
            })
        .error(function(){
            console.log("Error");
        })
      }
  $scope.cree = function(){
    user =$scope.user.username;
    password= $scope.user.password;
    $http.post('/cree/'+user+'/'+password)
    .success(function(cb) {
        console.log(cb);
        })
    .error(function(){
        console.log("Error");
    })
}
})

  .controller('ListCtrl', function ($scope, $http) {
    $scope.laliste ={};
    $scope.lalistenom={};
    $http.get('/DiffListe/' + $scope.ListeName).success(function (data) {
      console.log("Sucess ListeUser ?");
      $scope.lalistenom = data;
      lalistenom=data;
      console.log(data);
      console.log($scope.lalistenom);
    })
      .error(function (data) {
        console.log('Error ListeUser : ' + data);
      });

    

    $scope.deleteList = function (listname) {
      console.log("test");
      $http.post('/DeleteList/' +listname)
        .success(function (data) {
          $scope.lalistenom = data;
          console.log(data);
          window.location.replace('/#/tab/Liste');
        })
        .error(function (data) {
          console.log('Error : ' + data);
        });
    }
    $scope.goToListe = function(listname){
      console.log("test goto");
      noob=listname;
      window.location.replace('/#/tab/ListeDetails');
    }

    $scope.createList = function(){
      console.log($scope.Liste.text);
      $http.post('/CreateList/',$scope.Liste)
      .success(function(data){
          $scope.Liste = {};
          $scope.lalistenom = data;
      })
      .error(function(data){
          console.log('Error : ' + data);
      })
  };
  })



  .controller('ListDetailsCtrl', function($scope, $http) {
    $scope.modifyData={};
    $http.get('/Listetache/' + noob)
      .success(function (data) {
        $scope.laliste = data;
        console.log(data);
      })
      .error(function (data) {
        console.log('Error ListeUser : ' + data);
      });
      console.log($scope.laliste);

    $scope.deleteTodo =function(id){
      $http.post('/Liste/delete/' + id+'/'+ noob)
            .success(function(data) {
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error : ' + data);
            });
    }
    $scope.createTodo = function() {
       $http.post('/ListeCreate/'+noob, $scope.formData)
           .success(function(data) {
               $scope.formData = {};
               $scope.laliste = data;
               console.log(data);
           })
           .error(function(data) {
               console.log('Error : ' + data);
           }); 
   };

   $scope.isChecked = function(id,done) {
    $http.put('/Liste/' +id+'/'+done+'/'+noob)
    .success(function(data) {
        $scope.laliste = data;
        console.log(data);
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  };

    $scope.modifier = function (index, x) {
      console.log(document.getElementById('modify-'+index).innerHTML)
      if (document.getElementById('modify-'+index).innerHTML=='Modifier') {
        for (pas = 0; pas < $scope.laliste.length; pas++) {
            document.getElementById('xtextmodify-'+pas).style.display = "none";
            document.getElementById('xtext-'+pas).style.display = "block";
            document.getElementById('modify-'+pas).innerHTML='Modifier';
        }
        $scope.modifyData.text = x.text;
        document.getElementById('xtextmodify-'+index).style.display = "block";
        document.getElementById('xtext-'+index).style.display = "none";
        document.getElementById('modify-'+index).innerHTML='Valider';
    }

    else {
        document.getElementById('xtextmodify-'+index).style.display = "none";
        document.getElementById('xtext-'+index).style.display = "block";
        document.getElementById('modify-'+index).innerHTML='Modifier';
        console.log($scope.modifyData.text);
        $http.post('/Liste/modify/'+x._id+'/'+$scope.modifyData.text+'/'+noob)
        .success(function(data){
            $scope.laliste = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error : ' + data);
        });
    };
    };
  
  })
  
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

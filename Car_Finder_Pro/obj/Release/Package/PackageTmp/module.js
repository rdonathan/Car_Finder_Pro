
//Creating a module
var myApp = angular.module("myModule", ['ui.bootstrap', 'trNgGrid']);

// creating a controller and registering it with the module
myApp.controller('myController', ['$http','$uibModal', function ($http, $uibModal) {

    var scope = this;
    scope.years = [];
    scope.makes = [];
    scope.models = [];
    scope.trims = [];
    scope.cars = [];
    scope.info1 = [];

    scope.options =
        {
            year: '',
            make: '',
            model: '',
            trim: ''
        }



//BUTTON/////////////////////////////////////////////////////////////////////////////////
    scope.id = {
        id:''
    };

    //scope.info1 = function (id) {
    //    scope.id.id = id;
       
    //    $http.get("http://RiaCar.azurewebsites.net/api/cars/GetInfo", { params: { id: scope.id.id } }).then(function (response) {
    //        scope.info1 = response.data;
    //    })
    //}

//YEAR//////////////////////////////////////////////////////////////////////////////////
    scope.getYears = function () {

        $http.get("http://RiaCar.azurewebsites.net/api/cars/GetYears").then(function (response) {
            scope.years = response.data;
        });
    }


//MAKE//////////////////////////////////////////////////////////////////////////////////
    scope.getMakes = function () {
        scope.options.make = ""
        scope.options.model = ""
        scope.options.trim = ""
        scope.cars = [];

        $http.get("http://RiaCar.azurewebsites.net/api/cars/GetMakes", {params:{year:scope.options.year}}).then(function (response) {
            scope.makes = response.data;
            scope.getCars();
        });
    }

//MODEL//////////////////////////////////////////////////////////////////////////////////
    scope.getModels = function () {
        scope.options.model = ""
        scope.options.trim = ""
        scope.cars = [];

        $http.get("http://RiaCar.azurewebsites.net/api/cars/GetModels", { params: { year: scope.options.year,make:scope.options.make } }).then(function (response) {
            scope.models = response.data;
            scope.getCars();
        });
    }

//TRIM//////////////////////////////////////////////////////////////////////////////////
    scope.getTrims = function () {
        scope.options.trim = ""
        scope.cars = [];

        $http.get("http://RiaCar.azurewebsites.net/api/cars/GetTrims", { params: { year: scope.options.year, make: scope.options.make, model:scope.options.model } }).then(function (response) {
            scope.trims = response.data;
            scope.getCars();
        });
    }
//GET CARS/////////////////////////////////////////////////////////////////////////////
    scope.getCars = function () {

        $http.get("http://RiaCar.azurewebsites.net/api/cars/GetCars",  { params: { year: scope.options.year, make: scope.options.make, model:scope.options.model,trim:scope.options.trim } }).then(function (response) {
            scope.cars = response.data;
        });
    }
   
     scope.getYears();


//FOR OPENING THE MODAL////////////////////////////////////////////////////////////////
    scope.open = function (id) {
        scope.id.id = id;
        var modalInstance = $uibModal.open({

            animation: true,
            templateUrl: 'carInfo.html',
            controller: 'infoController as cm',
            size: 'lg',
            resolve: {
                car: function () {
                    return $http.get("http://RiaCar.azurewebsites.net/api/cars/GetInfo", { params: { id: scope.id.id } });
                }
            }
        })
    }


}]);

//ANGULAR MODAL CONTROLLER/////////////////////////////////////////////////////////////
angular.module('myModule').controller('infoController', function ($uibModalInstance, car) {
    var self = this;
    self.car = car.data;

    self.ok = function () {
        $uibModalInstance.close();
    };

    self.cancel = function () {
        $uibModalInstance.dismiss();
    }
});
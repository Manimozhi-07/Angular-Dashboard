/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(
  0,
  window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1
);
var config = {
  host: window.location.hostname,
  prefix: prefix,
  port: window.location.port,
  isSecure: window.location.protocol === "https:",
};
require.config({
  baseUrl:
    (config.isSecure ? "https://" : "http://") +
    config.host +
    (config.port ? ":" + config.port : "") +
    config.prefix +
    "resources",
});

require(["js/qlik"], function (qlik) {
  qlik.on("error", function (error) {
    $("#popupText").append(error.message + "<br>");
    $("#popup").fadeIn(1000);
  });
  $("#closePopup").click(function () {
    $("#popup").hide();
  });

  var workforceMgmt = angular.module("workforceMgmtApp", ["ngRoute"]);
  workforceMgmt.config([
    "$routeProvider",
    "$locationProvider",
    function ($routeProvider, $locationProvider) {
      $locationProvider.hashPrefix("");
      $routeProvider
        .when("", {
          redirectTo: "/openOrders",
          controller: "mainCtrl",
        })
        .when("/dashboard", {
          templateUrl: "dashboard.html",
          controller: "mainCtrl",
        })
        .when("/openOrders", {
          templateUrl: "openOrders.html",
          controller: "mainCtrl",
        })
        .when("/employeeAnalysis", {
          templateUrl: "employeeAnalysis.html",
          controller: "mainCtrl",
        })
        .when("/routeOptimization", {
          templateUrl: "routeOptimization.html",
          controller: "mainCtrl",
        })
        .when("/shiftAnalysis", {
          templateUrl: "shiftAnalysis.html",
          controller: "mainCtrl",
        })

        .otherwise({
          redirectTo: "/openOrders",
          controller: "mainCtrl",
        });
    },
  ]);

  workforceMgmt.controller("mainCtrl", [
    "$scope",
    "$location",
    function ($scope, $location) {
      $scope.$on("$routeChangeStart", function () {
        $scope.mylocation = $location.path();
        console.log($scope.mylocation);
      });

      $scope.bgcolors = {
        "/dashboard": { backgroundColor: "#ff9600" },
        "/openOrders": { backgroundColor: "#00aeef" },
        "/employeeAnalysis": { backgroundColor: "#b1da80" },
        "/routeOptimization": { backgroundColor: " #92278f" },
        "/shiftAnalysis": { backgroundColor: "#464646 " },
      };
      $scope.btncolors = {
        "/dashboard": {
          backgroundColor: " #e28500",
          border: "1px solid  #c97600 ",
        },
        "/openOrders": {
          backgroundColor: "#0094cc",
          border: "1px solid  #0081b2 ",
        },
        "/employeeAnalysis": {
          backgroundColor: "#95b76c",
          border: "1px solid  #748e54",
        },
        "/routeOptimization": {
          backgroundColor: "  #7a2177",
          border: "1px solid  #601a5e",
        },
        "/shiftAnalysis": {
          backgroundColor: "#3a3a3a ",
          border: "1px solid  #2d2d2d ",
        },
      };
      $scope.getOption = function (type, option) {
        console.log(option);
        console.log(type);
        var value = "title_" + type;

        $scope.value = option;
      };
      $scope.tabs = [
        "dashboard",
        "openOrders",
        "employeeAnalysis",
        "routeOptimization",
        "shiftAnalysis",
      ];
      $scope.items = [
        "Emergency",
        "Internal Repair",
        "Meter Fault",
        "Meter Reading",
      ];

      $scope.depots = ["South", "North", "Central"];

      $scope.visibleDropdown = null;

      $scope.isVisible = function (type) {
        return $scope.visibleDropdown === type;
      };

      $scope.dropdown = function (type) {
        if ($scope.isVisible(type)) {
          $scope.visibleDropdown = null;
        } else {
          $scope.visibleDropdown = type;
        }
      };

      $scope.getDropdownStyle = function (type) {
        return $scope.isVisible(type)
          ? {
              display: "block",
              backgroundColor:
                $scope.btncolors[$scope.mylocation].backgroundColor,
            }
          : {
              display: "none",
              backgroundColor:
                $scope.btncolors[$scope.mylocation].backgroundColor,
            };
      };
    },
  ]);
  angular.bootstrap(document, ["workforceMgmtApp", "qlik-angular"]);
});

'use strict';

var chartData = [0,0,0];
var app = angular.module('gitSearchRepository', ['chart.js']);
app.controller('searchController', ['$scope', '$http', function($scope, $http) {
  var url = 'https://api.github.com/search/repositories?q=';
  $scope.search = function(searchKey) {
    $http.get(url + searchKey).then(function (response) {
      $scope.repositoriesData = response.data;
      console.log(response.data);
    });
  }
  var urlIssues = 'https://api.github.com/search/issues?q=repo:';
  $scope.generateStats = function(repo) {
    chartData = [repo.forks_count, repo.stargazers_count, repo.open_issues_count]
    $http.get(urlIssues + repo.full_name).then(function (response) {
      $scope.issuesData = response.data;
      console.log(response.data);
    });
  }
}]);

function getChartData() {
  return chartData;
}

app.controller("baseCtrl", function ($scope) {
  $scope.labels = ["Forks count", "Stargazers count", "Open issues count"];
  // $scope.data = getChartData();
  $scope.type = 'PolarArea';

  $scope.getChartData = function() {
    return getChartData();
  }

  $scope.toggle = function () {
    $scope.type = $scope.type === 'PolarArea' ?
      'Pie' : 'PolarArea';
  };
});

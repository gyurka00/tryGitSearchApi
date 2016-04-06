'use strict';

var app = angular.module('gitSearchRepository', ['chart.js', 'ui.router']);

app.service('searchService', function($http) {
  var url = 'https://api.github.com/search/repositories?q=';
  this.getRepositories = function(searchKey, callback) {
    $http.get(url + searchKey).then(function (response) {
      callback(response.data);
    });
  }
});

app.service('issuesService', function($http) {
  var url = 'https://api.github.com/search/issues?q=repo:';
  this.getIssues = function(repoName, callback) {
    $http.get(url + repoName).then(function (response) {
      callback(response.data);
    });
  }
});

app.controller('searchController', ['$scope', '$state', 'searchService', 'issuesService', function($scope, $state, searchService, issuesService) {
  $scope.search = function(searchKey) {
    searchService.getRepositories(searchKey, function(data) {
      $scope.repositoriesData = data;
    });
    $state.go('result');
  }
  $scope.generateStats = function(repo) {
    $scope.chartData = [repo.forks_count, repo.stargazers_count, repo.open_issues_count];
    issuesService.getIssues(repo.full_name, function(data) {
      $scope.issuesData = data;
      console.log($scope.issuesData);
    });
  }
}]);

app.controller("baseCtrl", function ($scope) {
  $scope.labels = ["Forks count", "Stargazers count", "Open issues count"];
  $scope.type = 'PolarArea';
  $scope.getChartData = function() {
    return $scope.chartData;
  }
  $scope.toggle = function () {
    $scope.type = $scope.type === 'PolarArea' ?
      'Pie' : 'PolarArea';
  };
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('frontpage', {
        url: '/',
        templateUrl: './templates/frontpage.html',
        controller: 'searchController',
        data: {
          pageTitle: 'Git Search Repository',
        },
      })
      .state('result', {
        url: '/result',
        templateUrl: './templates/result.html',
        data: {
          pageTitle: 'Git Search Repository',
        },
      })
  });

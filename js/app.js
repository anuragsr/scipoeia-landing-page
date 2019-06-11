var l = console.log.bind(window.console)
var app = angular.module('app', [])

app.controller('Ctrl', function($scope, utils){
  l("Ctrl")
  $scope.text = "Ctrl Works!"
})
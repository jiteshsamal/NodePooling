var app = angular.module('pushApp', []);
app.controller('mycntrl', function($scope, $http) {
    $scope.message = 'Hello world';
    $scope.vote = { osType: '', value: 1 };
    $scope.primaryUrl = 'http://localhost:3000/';
    $scope.categories = [];
    $scope.series = [];
    $scope.getVoteingData = function() {
            $http.get($scope.primaryUrl + 'GetVoteData')
                .then(function(config) {
                    config.data.map(function(data) {
                        $scope.categories.push(data.name);
                        $scope.series.push(data.vote);
                    });

                });
        }
        // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    $scope.PostVote = function() {
        console.log($scope.vote);
        $scope.categories = [];
        $scope.series = [];
        $http.post('http://localhost:3000/postVote', $scope.vote)
            .then(function(config) {})
    }

    var pusher = new Pusher('851333eb651b2537896c', {
        cluster: 'us2',
        encrypted: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('voted', function(config) {
        //setTimeout(function() {
        $scope.$apply(function() {
            var cat = [];
            var ser = [];
            config.voteData.map(function(data) {
                cat.push(data.name);
                ser.push(data.vote);
            })

            $scope.categories = cat;
            $scope.series = ser;

        });
        // })
    });

});

app.directive('chartDirective', function() {
    return {
        scope: {
            categories: '=',
            series: "="
        },
        restrict: "EA",
        link: function(scope, ele, attr) {
            var chart = {
                renderTo: 'container',
                type: 'column'
            };
            var title = {
                text: 'Vote for popular OS'
            };
            var subtitle = {
                text: 'samal.io'
            };
            var xAxis = {
                categories: []
            };
            var yAxis = {
                title: {
                    text: 'Popularity (number)',
                },
            };
            var tooltip = {
                valueSuffix: ''
            };

            var json = {};
            json.chart = chart;
            json.title = title;
            json.subtitle = subtitle;
            json.xAxis = {};
            json.xAxis.categories = scope.categories;
            json.yAxis = yAxis;
            json.series = [{
                name: 'Popular operating systems',
                data: scope.series
            }];
            // $('#container').highcharts(json);
            $(ele).highcharts(json)
        }
    }
});
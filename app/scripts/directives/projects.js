'use strict';

(function() {

    function controller(scope, element) {

        var diameter = element.parent().parent().width();

        var tree = d3.layout.tree()
            .size([360, diameter / 2 - 120])
            .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

        var diagonal = d3.svg.diagonal.radial()
            .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });


        scope.$watch('graphData', function() {
            if (!scope.graphData) {
                return;
            }

            $(element).find('svg').remove();
            var svg = d3.select(element[0]).append("svg")
                    .attr("width", diameter)
                    .attr("height", diameter)
                .append("g")
                    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");


            var nodes = tree.nodes(scope.graphData),
                links = tree.links(nodes);

            var link = svg.selectAll(".link")
                .data(links)
                .enter().append("path")
                .attr("class", "link")
                .attr("d", diagonal);

            var node = svg.selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

            node.append("circle")
                .attr("r", 4.5);

            node.append("text")
                .attr("dy", ".31em")
                .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
                .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
                .text(function(d) { return d.name; });

            d3.select(self.frameElement).style("height", diameter - 150 + "px");

        });
    }

    angular.module('dpcApp')
    .directive('projectsGraph', function () {
        return {
            template: '<div></div>',
            restrict: 'E',
            scope: {
                graphData: '='
            },
            replace: true,
            controller: ['$scope', '$element', controller]
        };
    });
}).call(null);

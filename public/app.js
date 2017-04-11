const app = angular.module('myApp', []);

const d3graph = (graph) => {

    const svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    svg.selectAll("*").remove();

    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .attr("fill", d => color(d.color))
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
        .text(d => d.id);

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

}

function getContinentColor(continent) {
    return ({"Europe": 1, "North America": 2, "South America": 3,
        "Asia": 4, "Africa": 5, "Oceania": 6})[continent];
}

app.controller('formCtrl', ($scope, $http) => {
    $scope.requestData = () => {
        const year = $scope.year || "0";
        console.info("requestData for year " + year);
        $http.get("http://localhost:3000/data/countries/" + year)
            .then((response) => {
                $scope.countries = response.data;
            })
            .then(() => $http.get("http://localhost:3000/data/links/" + year))
            .then((response) => {
                $scope.links = response.data;
            })
            .then(() => {
                const d3Data = {};
                d3Data.nodes = $scope.countries.map(c => ({ id: c.country, value: c.continent, color: getContinentColor(c.continent) }));
                d3Data.links = $scope.links.map(c => ({ id: c.id, source: c.source_country, target: c.target_country, value: c.value }));
                d3graph(d3Data);
            })
            .catch(err => {
                console.error(err);
                $scope.countries = [];
                $scope.links = [];
            });
    };
});
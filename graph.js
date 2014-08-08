var margin = {top: 20, right: 20, bottom: 30, left: 50},
w = 1500 - margin.left - margin.right,
h = 1500 - margin.top - margin.bottom;


var svg = d3.select("body").append("svg")
.attr("width", w + margin.left + margin.right)
.attr("height", h + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = [];
d3.json("graph.json",function(error, json){
	data = json;
	var force = d3.layout.force()
	.nodes(json[0].nodes)
	.links(json[1].links)
	.charge(-50)
	.linkDistance(50)
	.size([w,h])
	.start();

	var link = svg.selectAll(".link")
	.data(json[1].links)
	.enter()
	.append("line")
	.attr("class","link")

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.style("border", "1px solid #000")
	.style("border-radius", "3px")
	.style("background-color", "#333")
	.style("color","#fff")
	.style("font-size", "11px")
	.style("opacity","0.8")

	var node = svg.selectAll(".node")
	.data(json[0].nodes)
	.enter()
	.append("circle")
	.attr("class","node")
	.attr("fill","grey")
	.attr("r",function(d){
		return Math.sqrt(d.value);
	})
	.call(force.drag)
	.on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.ResolutionNumber);})
	.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});


	force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });
		node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	});


});
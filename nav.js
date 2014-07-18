(function(d3) {
	var diameter = 960,
		format = d3.format(",d"),
		color = d3.scale.category20c();

	var bubble = d3.layout.pack()
		.sort(null)
		.size([diameter, diameter])
		.padding(1.5);

	var svg = d3.select("body").append("svg")
		.attr("width", diameter)
		.attr("height", diameter)
		.attr("class", "bubble");

	function drawCircle(x, y, radius, opts) {
		var node = svg.append("g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + x + "," + y + ")"; });

		var circle = node.append("circle")
			.attr("r", radius);

		if (opts.fill) {
			circle.style("fill", opts.fill);
		} else {
			circle.style("fill-opacity", 0);
		}

		if (opts.stroke) {
			circle.attr("stroke-width", opts.stroke.width);
			circle.attr('stroke', opts.stroke.color);
		}

		return circle;
	}

	function makeNav(opts) {
		var bigCircle = drawCircle(opts.x, opts.y, opts.r + 5, {stroke: {width: 1, color: "black"}});

		bigCircle.style("display", "none");

		var circle = drawCircle(opts.x, opts.y, opts.r, {
			fill: opts.fill
		});

		circle.style("cursor", "pointer");

		var text = svg.append("text")
			.attr("x", 80)
			.attr("y", 80)
			.text(opts.title)
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "red")
			.style("opacity", 0);

		circle.on("mouseover", function() {
			text.transition().style("opacity", 1);
			circle.transition().style("fill", opts.hover.color);
			bigCircle.transition().style("display", "block");
		});

		circle.on("mouseout", function() {
			text.transition().style("opacity", 0);
			circle.transition().style("fill", opts.fill);
			bigCircle.transition().style("display", "none");
		});
	}

	drawCircle(75, 80, 50, {fill: "green"});
	drawCircle(75, 80, 60, {stroke: {width: 2, color: "black"}});

	makeNav({
		title: "Clients",
		x: 100,
		y: 10,
		r: 30,
		fill: "red",
		hover: {"color": "blue"}
	});

})(d3);
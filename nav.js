(function(d3) {
	var width = 200;
	var height = 200;

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.style("background", "orange")
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
			.attr("x", 68)
			.attr("y", 100)
			.attr("text-anchor", "middle")
			.text(opts.title)
			.attr("font-family", "sans-serif")
			.attr("font-size", "16px")
			.attr("fill", "black")
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

	// drawCircle(75, 80, 75, {fill: "green"});
	drawCircle(85, 95, 80, {stroke: {width: 2, color: "black"}});
	drawCircle(75, 95, 65, {stroke: {width: 2, color: "black"}});
	drawCircle(68, 95, 53, {fill: "green"});

	makeNav({
		title: "Contact",
		x: 105,
		y: 35,
		r: 10,
		fill: "green",
		hover: {"color": "blue"}
	});

	makeNav({
		title: "Biography",
		x: 75,
		y: 30,
		r: 10,
		fill: "green",
		hover: {"color": "blue"}
	});

	makeNav({
		title: "Clients",
		x: 160,
		y: 125,
		r: 15,
		fill: "red",
		hover: {"color": "blue"}
	});

	makeNav({
		title: "Resources",
		x: 165,
		y: 83,
		r: 15,
		fill: "red",
		hover: {"color": "pink"}
	});

	makeNav({
		title: "Services",
		x: 150,
		y: 45,
		r: 15,
		fill: "blue",
		hover: {"color": "pink"}
	});

})(d3);
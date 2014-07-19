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

		return {node: node, circle: circle};
	}

	function makeNav(opts) {
		opts.hover.circle = opts.hover.circle || false;

		var image;

		var bigCircle = drawCircle(opts.x, opts.y, opts.r + 5, {stroke: {width: 1, color: "black"}}).circle;

		bigCircle.style("display", "none");

		if (opts.image) {
			image = svg.append("svg:image")
				.attr('x', opts.x - opts.r)
				.attr('y', opts.y - opts.r)
				.attr('width', opts.r * 2)
				.attr('height', opts.r * 2)
				.attr("xlink:href", opts.image);
		}

		var circular = drawCircle(opts.x, opts.y, opts.r, {
			fill: opts.fill
		});

		var circle = circular.circle;

		circle.style("cursor", "pointer");

		var text = svg.append("text")
			.attr("x", 68)
			.attr("y", 100)
			.attr("text-anchor", "middle")
			.text(opts.title)
			.attr("font-family", "sans-serif")
			.attr("font-size", "16px")
			.attr("fill", "black")
			.style("opacity", 0)
			.style("display", "none");

		function hover() {
			// text.style("display","block").transition().style("opacity", 1);
			// circle.transition().style("fill", opts.hover.color);
			if (opts.hover.circle) {
				bigCircle.transition().style("display", "block");
			}

			if (opts.hover.image) {
				image.attr("xlink:href", opts.hover.image);
			}
		}

		circle.on("mouseover", hover);
		text.on("mouseover", hover);

		circle.on("mouseout", function() {
			text.style("display","none");
			circle.transition().style("fill", opts.fill);
			bigCircle.transition().style("display", "none");

			if (opts.hover.image) {
				image.attr("xlink:href", opts.image);
			}
		});
	}

	// drawCircle(75, 80, 75, {fill: "green"});
	drawCircle(85, 95, 80, {stroke: {width: 2, color: "black"}});
	drawCircle(75, 95, 65, {stroke: {width: 2, color: "black"}});

	makeNav({
		title: "Home",
		type: "home",
		x: 68,
		y: 95,
		r: 53,
		fill: "green",
		hover: {"color": "green"}
	});

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
		image: "images/bio-1.png",
		hover: {image: "images/bio-2.png"}
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
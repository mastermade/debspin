(function(d3) {
	var width = 250;
	var height = 250;

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

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

		var active = opts.active || document.location.href.indexOf(opts.link) > -1;

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
			.attr("x", 76)
			.attr("y", 110)
			.attr("text-anchor", "middle")
			.text(opts.title)
			.attr("font-family", "sans-serif")
			.attr("font-size", "16px")
			.attr("fill", "black")
			.style("opacity", 0)
			.style("display", "none");

		function hover(onActive) {
			if (!onActive) {
				text.style("display","block").transition().style("opacity", 1);
			}

			if (opts.hover.color) {
				circle.transition().style("fill", opts.hover.color);
			}

			if (opts.hover.circle) {
				bigCircle.transition().style("display", "block");
			}

			if (opts.hover.image) {
				image.attr('width', opts.r * 2.4);
				image.attr('height', opts.r * 2.4);
				image.attr('x', opts.x - opts.r * 1.2);
				image.attr('y', opts.y - opts.r * 1.2);
				image.attr("xlink:href", opts.hover.image);
			}
		}

		circle.on("mouseover", hover);
		text.on("mouseover", hover);

		if (active) {
			hover(true);
		}

		circle.on("mouseout", function() {
			text.style("display","none");

			if (!active) {
				circle.transition().style("fill", opts.fill);
				bigCircle.transition().style("display", "none");

				if (opts.hover.image) {
					image.attr('width', opts.r * 2);
					image.attr('height', opts.r * 2);
					image.attr('x', opts.x - opts.r);
					image.attr('y', opts.y - opts.r);
					image.attr("xlink:href", opts.image);
				}
			}
		});

		function click() {
			document.location.href = opts.link;
		}

		if (opts.link) {
			circle.on("click", click);
			text.on("click", click);
		}
	}

	// drawCircle(75, 80, 75, {fill: "green"});
	drawCircle(105, 105, 90, {stroke: {width: 1, color: "black"}});
	drawCircle(90, 105, 70, {stroke: {width: 1, color: "black"}});

	makeNav({
		title: "Home",
		type: "home",
		link: "index.html",
		x: 76,
		y: 105,
		r: 53,
		fill: "98ca3d",
		hover: {"color": "98ca3d"}
	});

	makeNav({
		title: "Biography",
		x: 105,
		y: 40,
		r: 12,
		image: "images/bio-1.png",
		hover: {image: "images/bio-2.png"}
	});

	makeNav({
		title: "Contact",
		x: 130,
		y: 50,
		r: 12,
		image: "images/contact-1.png",
		hover: {image: "images/contact-2.png"}
	});

	makeNav({
		title: "Clients",
		link: "clients.html",
		x: 178,
		y: 155,
		r: 25,
		image: "images/clients-1.png",
		hover: {image: "images/clients-2.png"}
	});

	makeNav({
		title: "Services",
		x: 178,
		y: 55,
		r: 25,
		image: "images/services-1.png",
		hover: {image: "images/services-2.png"}
	});

	makeNav({
		title: "Resources",
		x: 195,
		y: 105,
		r: 25,
		image: "images/resources-1.png",
		hover: {image: "images/resources-2.png"}
	});

})(d3);
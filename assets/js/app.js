
// set the dimensions of the graph
var svgWidth = 960;
var svgHeight = 500;

// set the margins around the graph
var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create an SVG wrapper 
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


// append an SVG group to hold the chart, shift by the left and top margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import data
d3.csv("assets/data/data.csv").then(function(trendData){
    // parse data
    trendData.forEach(function(data) {
        data.poverty = +data.poverty;
        console.log();
        data.obesity = +data.obesity;
        console.log(`State: ${data.abbr}, Poverty: ${data.poverty}, Obesity: ${data.obesity}`);
    });

    // create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(trendData, d => d.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(trendData, d => d.obesity)])
        .range([height, 0]);

    // create axis function
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // create text for circles
    var stateLabels = svg.selectAll()
    
      // create circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(trendData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "green")
    .attr("opacity", ".25");

    // label axes
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("% Obesity");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("% in Poverty");
  }).catch(function(error) {
    console.log(error);

});
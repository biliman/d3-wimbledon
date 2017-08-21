/* global d3 */

// Our canvas
const width = 1150,
  height = 300,
  margin = 20,
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#fffff0')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    // console.log(JSON.stringify(rows));
    redraw(rows)
  })
}

// redraw function
let redraw = (data) => {

  let dataset = []
  data.map(element => dataset.push(element.GoalsScored))
  console.log(dataset);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, height - margin])

  const xScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, width - marginLeft])

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range(['peru', 'teal'])

  var yAxis = d3.axisLeft(yScale).ticks(4).tickPadding(5)
  var xAxis = d3.axisBottom(xScale).ticks(46).tickPadding(5)

  svg.append('g')
    .call(yAxis)
    .attr('transform', `translate(${marginLeft})`)

  svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(${margin}, ${height - margin})`)
  // Your data to graph here
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return xScale(i) + marginLeft
    })
    .attr('y', (d) => {
      return height - yScale(d) - margin
    })
    .attr('width', 10)
    .attr('height', (d) => {
      return yScale(d)
    })
}

reload()

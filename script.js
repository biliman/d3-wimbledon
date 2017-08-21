/* global d3 */

// Our canvas
const width = 1250,
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
    .range([0, height])

  // Your data to graph here
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * 22
    })
    .attr('y', (d) => {
      return height - yScale(d)
    })
    .attr('width', margin)
    .attr('height', (d) => {
      return yScale(d)
    })
}

reload()

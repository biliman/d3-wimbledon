/* global d3 */

// Our canvas
const width = 1100,
  height = 350,
  margin = 20,
  marginLeft = 60

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#fafafa')
  .style('border', '1px solid black')
  .style('padding', '50px')
  .style('overflow', 'visible')

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
  data.forEach(function (res) {
    dataset.push(res.GoalsScored)
  })

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, height])

  const xScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, width])

  const yAxisScale = d3.scaleLinear()
    .domain([d3.max(dataset), 0])
    .range([0, height])

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range(['#7f73ff', '#35e2c3'])

  const yAxis = d3.axisLeft(yAxisScale).ticks(d3.max(dataset))
  const xAxis = d3.axisBottom(xScale).ticks(d3.max(dataset.length))

  const trans = d3.transition().duration(250).ease(d3.easeLinear)

  svg.append('g')
    .call(yAxis)
    .attr('transform', 'translate(-2, 0)')

  svg.append('g')
    .call(xAxis)
    .attr('transform', 'translate(0, 350)')
  // Your data to graph here
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return xScale(i)
    })
    .attr('y', () => {
      return height
    })
    .attr('width', margin)
    .attr('height', () => {
      return 0
    })
    .attr('fill', colorScale)
    // .on('mouseover', function () {
    //   d3.select(this).style('fill', '#ed6495')
    // })
    // .on('mouseout', function () {
    //   d3.select(this).style('fill', colorScale)
    // })
    .transition(trans).delay((d, i) => {
      return i * 100
    })
    .attr('height', (d) => {
      return yScale(d)
    })
    .attr('y', (d) => {
      return height - yScale(d)
    })
}

reload()

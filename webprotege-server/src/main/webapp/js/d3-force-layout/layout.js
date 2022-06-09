const newD3Button = 'new-d3-button';
const newD3Graph = 'new-d3-graph';
const oldD3Graph = 'old-d3-graph';

window.layout = {
    generateGraph: (gNodes, gLinks, width, height) => {

      let btn = document.getElementById(newD3Button);

      if (!btn) {
        btn = document.createElement('button');
        btn.id = newD3Button;
        btn.innerText = 'Show Dynamic KG';
        btn.style.width = '20%';
        btn.style.marginLeft = '78%';
        btn.style.background = '#e4e4e4';
        btn.style.border = '1px solid #d0d0d0';
        btn.style.zIndex = 99;
        btn.style.height = '30px';
        btn.style.color = '#000';
        btn.style.cursor = 'pointer';
  
  
        setTimeout(() => {
          const containerDiv = document.getElementsByClassName('wp-graph')[0].parentElement.parentElement;
          containerDiv.prepend(btn);
        }, 2000);
      } else {
        const new_btn = btn.cloneNode(true);
        btn.parentNode.replaceChild(new_btn, btn);
        btn = new_btn;
        btn.innerText = 'Show Dynamic KG';
      }

      let oldD3GraphVisible;
      

      btn.addEventListener('click', () => {
        try {

            if (oldD3GraphVisible === false) {
              const oldD3GraphEl = document.getElementById(oldD3Graph);
              oldD3GraphEl.style.display = 'block';
              const newD3GraphEl = document.getElementById(newD3Graph);
              newD3GraphEl.style.display = 'none';
              oldD3GraphVisible = true;
              btn.innerText = 'Show new d3 layout';
              return;
            } else if (oldD3GraphVisible === true) {
              const oldD3GraphEl = document.getElementById(oldD3Graph);
              oldD3GraphEl.style.display = 'none';
              const newD3GraphEl = document.getElementById(newD3Graph);
              newD3GraphEl.style.display = 'block';
              oldD3GraphVisible = false;
              btn.innerText = 'Show Static KG';
              return;
            }

            createGraph();
      
          } catch (e) {
            alert(e)
          }
      });

      function createGraph() {

        const existingGraph = document.getElementById(newD3Graph);
        if (existingGraph) {
          existingGraph.remove();
        }

        // Configure graphics
        var width = width || 1000,
          height = height || 800;
  
        var circleWidth = 10,
          charge = -5000,
          gravity = 0.2;
  
        var palette = {
          "lightgray": "#D9DEDE",
          "gray": "#C3C8C8",
          "mediumgray": "#536870",
          "orange": "#BD3613",
          "purple": "#595AB7",
          "yellowgreen": "#738A05"
        }
        
        var nodes = gNodes.map(n => ({
            id: n.id,
            name: n.label
        }));
        var links = gLinks.map(l => ({
            source: nodes.find(n => n.id === l.headId),
            target: nodes.find(n => n.id === l.tailId),
            label: l.label
        }));
        var numNodes = nodes.length;
      
        console.log(nodes, gLinks);
        // // Generate test data
        // var nodes = [];
        // var numNodes = 5;
        // for (var x = 0; x < numNodes; x++) {
        //   var targetAry = [];
        //   var connections = (Math.round(Math.random() * 5));
        //   for (var y = 0; y < connections; y++) {
        //     targetAry.push(Math.round(Math.random() * numNodes))
        //   }
        //   nodes.push({
        //     id: x,
        //     name: "Node " + x,
        //     target: targetAry
        //   })
        // }
  
        // // Create the links array from the generated data
        // var links = [];
        // for (var i = 0; i < nodes.length; i++) {
        //   if (nodes[i].target !== uconsndefined) {
        //     for (var j = 0; j < nodes[i].target.length; j++) {
        //       links.push({
        //         source: nodes[i],
        //         target: nodes[nodes[i].target[j]]
        //       })
        //     }
        //   }
        // }

        // console.log(nodes,links)

        // Create SVG
        var fdGraph = d3.select('.wp-graph')
          .attr('id', oldD3Graph)
          .select(function() {
            return this.parentNode;
          })
          .append('svg')
          .attr('id', newD3Graph)
          .attr('width', width)
          .attr('height', height)

        const oldD3GraphEl = document.getElementById(oldD3Graph);
        oldD3GraphEl.style.display = 'none';
        oldD3GraphVisible = false;
        btn.innerText = 'Show Static KG';
  
        // Create the force layout to calculate and animate node spacing
        
        var forceLayout = d3.layout.force()
          .nodes(nodes)
          .links(links)
          .gravity(gravity)
          .charge(charge)
          .size([width/2, height/2])
  
        const orange = '#f9c44c';
        const blue = '#6698cd';
        const green = '#008000';
        // Create the SVG lines for the links
        var link = fdGraph
          .selectAll('line').data(links).enter()
          .append('line')
          .attr('stroke', link => {
            if (link.label.trim() === "") {
              console.log("vignesh")
              console.log(link.tailId)
              return orange;
            }
            //if(link.tailId.trim() !== undefined && link.tailId.trim().includes("NamedInd")){return green}
            return blue;
          })
          .attr('stroke-width', 1)
          .attr('class', function (d, i) {
            // Add classes to lines to identify their from's and to's
            if (d.target !== undefined){
            var theClass = 'line_' + d.target.id + ' line'};
            if (d.source !== undefined) {
              theClass += ' to_' + d.source.id
            }
            return theClass
          }).attr('marker-start', 'url(#arrow)');

          //
          var linkLabel = fdGraph.selectAll("svg").data(links).enter().append("text")
            .attr("class", "linkLabel")
            .attr('fill', blue)
            .attr("dy", 5)
            .text(function(d,i) {
              return d.label;
            });
        //
  
        // Create the SVG groups for the nodes and their labels
        var node = fdGraph
          .selectAll('circle').data(nodes).enter()
          .append('g')
          .attr('id', function (d) { return 'node_' + d.id })
          .attr('class', 'node')
          .on('mouseover', function (d) {
            // When mousing over a node, make the label bigger and bold
            // and revert any previously enlarged text to normal
            d3.selectAll('.node').selectAll('text')
              .attr('font-size', '12')
              .attr('font-weight', 'normal')
  
            // Highlight the current node
            d3.select(this).select('text')
              .attr('font-size', '16')
              .attr('font-weight', 'bold')
  
            // Hightlight the nodes that the current node connects to
            for (var i = 0; i < d.target.length; i++) {
              d3.select('#node_' + d.target[i]).select('text')
                .attr('font-size', '14')
                .attr('font-weight', 'bold')
            }
            
            for (var x = 0; x < links.length; x++) {
              if (links[x].target !== undefined) {
                if (links[x].target.id === d.id) {
                  // Highlight the connections to this node
                  d3.selectAll('.to_' + links[x].target.id)
                    .attr('stroke', palette.orange)
                    .attr('stroke-width', 2)
  
                  // Highlight the nodes connected to this one
                  d3.select('#node_' + links[x].source.id).select('text')
                    .attr('font-size', '14')
                    .attr('font-weight', 'bold')
                }
              }
            }
  
            // Highlight the connections from this node
            d3.selectAll('.line_' + d.id)
              .attr('stroke', palette.purple)
              .attr('stroke-width', 3)
  
            // When mousing over a node, 
            // make it more repulsive so it stands out
            forceLayout.charge(function (d2, i) {
              if (d2 != d) {
  
                // Make the nodes connected to more repulsive
                for (var i = 0; i < d.target.length; i++) {
                  if (d2.id == d.target[i]) {
                    return charge * 8
                  }
                }
  
                // Make the nodes connected from more repulsive
                for (var x = 0; x < links.length; x++) {
                  if (links[x].source.id === d2.id) {
                    if (links[x].target !== undefined) {
                      if (links[x].target.id === d.id) {
                        return charge * 8
                      }
                    }
                  }
                }
  
                // Reset unrelated nodes
                return charge;
  
              } else {
                // Make the selected node more repulsive
                return charge * 10;
              }
            });
            forceLayout.start();
          })
          .call(forceLayout.drag)
        
        /* Add following after fd graph generation */

          var arrowPoints = [[0, 0], [0, 10], [10, 5]];
          var markerBoxWidth = 30;
          var markerBoxHeight = 10;
          var refX = markerBoxWidth / 2;
          var refY = markerBoxHeight / 2;

          fdGraph
          .append('defs')
          .append('marker')
          .attr('id', 'arrow')
          .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
          .attr('refX', refX)
          .attr('refY', refY)
          .attr('markerWidth', markerBoxWidth)
          .attr('markerHeight', markerBoxHeight)
          .attr('orient', 'auto-start-reverse')
          .append('path')
          .attr('d', d3.line()(arrowPoints))
          .attr('stroke', '#444')
          .attr('fill', '#444');

       /*End of Marker */




        // Create the SVG circles for the nodes
        node.append('circle')
          .attr('cx', function (d) {
            return d.x
          })
          .attr('cy', function (d) {
            return d.y
          })
          .attr('r', circleWidth)
          .attr('fill', function (d, i) {
            // Color 1/3 of the nodes each color
            // Depending on the data, this can be made more meaningful
            // RoseRed
            console.log("LanLan")
            if(d.id.includes("NamedIndividual")){
              return '#00FF00'
            }else{return '#800080'}
            }
          )
  
        // Create the SVG text to label the nodes
        node.append('text')
          .text(function (d) {
            return d.name
          })
          .attr('font-size', '12')
  
        // Animate the layout every time tick
        forceLayout.on('tick', function (e) {
          // Move the nodes base on charge and gravity
          node.attr('transform', function (d, i) {
            return 'translate(' + d.x + ', ' + d.y + ')'
          })
  
          // Adjust the lines to the new node positions
          link
            .attr('x1', function (d) {
              return d.source.x
            })
            .attr('y1', function (d) {
              return d.source.y
            })
            .attr('x2', function (d) {
              if (d.target !== undefined) {
                return d.target.x
              } else {
                return d.source.x
              }
            })
            .attr('y2', function (d) {
              if (d.target !== undefined) {
                return d.target.y// adjust label position
              } else {
                return d.source.y
              }
            })

            linkLabel
            .attr('x', function (d) {
              var first = d.source.x;
              var second = 0;
              if (d.target !== undefined) {
                second = d.target.x
              } else {
                second = d.source.x
              }
              
              return (first+second)/2

            })
            .attr('y', function (d) {
              var first = d.source.y
              var second = 0;
              if (d.target !== undefined) {
                second = d.target.y// adjust label position
              } else {
                second = d.source.y
              }
              return (first+second)/2
            });

        })
       
        // Start the initial layout
        forceLayout.start();
      }
    }
}
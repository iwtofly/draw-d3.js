(function(){
     $().ready(function(){
          
          var width = 800,
               height = 800;

          var svg=d3.select('svg')
                         .attr({"width":width,
                                "height":height,
                           })

          //节点和边;
          var nodes = [ {name: "Track" ,img:"./img/cloud-server.png" },{name:"Server",img:"./img/cloud-server.png"},
                         { name: "网关", img:"./img/swtich.png"}, { name: "网关", img:"./img/swtich.png" },
                   { name: "MEC_a1" ,img:"./img/MEC.png"}, { name: "MEC_a2" ,img:"./img/MEC.png" },
                   { name: "MEC_b1" ,img:"./img/MEC.png" }, { name: "MEC_b2" ,img:"./img/MEC.png" }];
      
          var edges = [ {source: 0,target: 1} ,{ source : 0, target : 2},
                         {source: 1,target: 2} ,{ source : 1, target : 3},
                         { source : 2 , target: 3 } , { source : 2 , target: 4 } ,
                    { source : 2 , target: 5 } , { source : 3 , target: 6 } ,
                    { source : 3 , target: 7 }  ];

          var force = d3.layout.force()
                         .nodes(nodes) //指定节点数组
                         .links(edges)  //连线数组
                         .size([width,height])  //作用域范围
                         .linkDistance(150)
                         .charge([-400]);

          var drag = force.drag()
                         .on("dragstart", dragstart);
          force.start();
          console.log(nodes);
          console.log(edges);
          //   添加连线
          var svg_edges = svg.selectAll("line")
                              .data(edges)
                              .enter()
                              .append("line")
                              .style("stroke","#ccc")
                              .style("stroke-width",3);

          var color = d3.scale.category20();

          var svg_nodes_img = svg.selectAll("image")
                              .data(nodes)
                              .enter()
                              .append('image')
                              .attr("width",50)
                              .attr("height",50)
                              .attr("xlink:href",function(d){
                                   return d.img;
                              })
                              .attr("x",10)
                              .attr("y",10)
                              .call(force.drag); //节点能够拖动

          svg_nodes_img.on("dblclick",dblclick)
          //描述节点的文字
          var svg_texts = svg.selectAll("text")
                                   .data(nodes)
                                   .enter()
                                   .append("text")
                                   .style("fill","black")
                                   .attr("dx",20)
                                   .attr("dy",8)
                                   .text(function(d){
                                        return d.name;
                                   });
          force.on("tick",function(){ //每个时间间隔
               //更新连线坐标
               svg_edges.attr("x1",function(d){return d.source.x ;})
                         .attr("y1",function(d){return d.source.y ;})
                         .attr("x2",function(d){return d.target.x ;})
                         .attr("y2",function(d){return d.target.y})
               //更新节点坐标
               svg_nodes_img.attr("x",function(d){return d.x-15})
                         .attr("y",function(d){ return d.y-30});

               svg_texts.attr("x",function(d){ return d.x+10})
                         .attr("y",function(d){ return d.y+10});

          });

          function dblclick(d) {
               d3.select(this).classed("fixed", d.fixed = false);
           }

          function dragstart(d) {
               d3.select(this).classed("fixed", d.fixed = true);
          } 
     })
     

})();
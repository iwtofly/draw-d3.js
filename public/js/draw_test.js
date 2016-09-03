(function(){
     $().ready(function(){
          var width = 800,
               height = 800;

          var svg=d3.select('svg')
                         .attr({"width":width,
                                "height":height,
                           })

          var tooltip = d3.select("body")  
                         .append("div")  
                         .attr("class","tooltip")  
                         .style("opacity",0.0);  
          
          //socket.io接收到的数据
          // var resources = [ ["T"],["S"],["A",1] ,["A",2],["A"],["B"],["B",1],["B",2]];
          var resources = [ ["T",{"data":""}],["S",{"data":""}],["A",1,{"data":""}] ,["A",2,{"data":""}],["B",{"data":""}],["B",1,{"data":""}],["B",2,{"data":""}]];
          var nodeLength = resources.length;

          var targetT,targetS,targetA,targetB;  

          var nodes = d3.range(0,nodeLength).map(function(i){
               if(resources[i].length==2 &&  resources[i][0]=="T"){
                    targetT=i                    
                    return {name:"Track",img:"./img/cloud-server.png",data:resources[i][1]}
               }
               else if(resources[i].length==2 && resources[i][0]=="S"){
                    targetS=i  
                    return {name:"Server",img:"./img/cloud-server.png",data:resources[i][1]}
               }
               else if(resources[i].length==2 && resources[i][0]=="A"){
                    targetA=i
                    return {name:"MEC_A",img:"./img/swtich.png" ,data:resources[i][1]}
               }
               else if(resources[i].length==2 && resources[i][0]=="B"){
                    targetB=i  
                    return {name:"MEC_B",img:"./img/swtich.png", data:resources[i][1]}
               }
               else if(resources[i].length==3 && resources[i][0]=="A"){
                    return {name:"MEC_A_sub"+resources[i][1],img:"./img/MEC.png",data:resources[i][2]}
               }
               else if(resources[i].length==3 && resources[i][0]=="B"){
                    return {name:"MEC_B_sub"+resources[i][1],img:"./img/MEC.png",data:resources[i][2]}
               }
               console("i:"+i)
          })

          console.log("nodes: "+JSON.stringify(nodes))

          var edges = d3.range(1,nodeLength).map(function(i){
               console.log("nodes[i]"+nodes[i])
               if(nodes[i]["name"]=="Server"){
                    return {source: i,target: targetT}
               }if(nodes[i].name=="MEC_A"){
                    return {source: i,target: targetS}
               }if(nodes[i].name=="MEC_B"){
                    return {source: i,target: targetS}
               }if(nodes[i].name.substr(0,9)=="MEC_A_sub"){
                    var temTar1= targetA==undefined ? targetS:targetA;
                    return {source: i,target: temTar1}
               }if(nodes[i].name.substr(0,9)=="MEC_B_sub"){
                    var temTar2= targetB==undefined ? targetS:targetB;
                    return {source: i,target: temTar2}
               }
          })

         
          
          //节点和边;
          // var nodes = [ {name: "Track" ,img:"./img/cloud-server.png" },{name:"Server",img:"./img/cloud-server.png"},
          //                { name: "网关", img:"./img/swtich.png"}, { name: "网关", img:"./img/swtich.png" },
          //          { name: "MEC_a1" ,img:"./img/MEC.png"}, { name: "MEC_a2" ,img:"./img/MEC.png" },
          //          { name: "MEC_b1" ,img:"./img/MEC.png" }, { name: "MEC_b2" ,img:"./img/MEC.png" }];
      
          // var edges = [ {source: 0,target: 1} ,{ source : 0, target : 2},
          //                {source: 1,target: 2} ,{ source : 1, target : 3},
          //                { source : 2 , target: 3 } , { source : 2 , target: 4 } ,
          //           { source : 2 , target: 5 } , { source : 3 , target: 6 } ,
          //           { source : 3 , target: 7 }  ];

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
                              .call(force.drag) //节点能够拖动
                              .on("mouseover",function(d,i){  
                              /* 
                              鼠标移入时， 
                                  （1）通过 selection.html() 来更改提示框的文字 
                                  （2）通过更改样式 left 和 top 来设定提示框的位置 
                                  （3）设定提示框的透明度为1.0（完全不透明） 
                                  */  
                                
                                   tooltip.html(d.data[i]+ "ggggggggggg" + "<br />" +   
                                     d.data[i]+" ggggggggg")  
                                               .style("left", (d3.event.pageX) + "px")  
                                               .style("top", (d3.event.pageY + 20) + "px")  
                                               .style("opacity",1.0);  
                              })  
                              .on("mousemove",function(d){  
                              /* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */  
                                
                                  tooltip.style("left", (d3.event.pageX) + "px")  
                                          .style("top", (d3.event.pageY + 20) + "px");  
                              })  
                              .on("mouseout",function(d){  
                              /* 鼠标移出时，将透明度设定为0.0（完全透明）*/  
                                
                                  tooltip.style("opacity",0.0);  
                              })  


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
(function(){
     $().ready(function(){
          var width = 800,
               height = 800;
 
         var root={"servers":[
                 {
                  "port":40001,
                  "name":"Sir1",
                  "videos":{"shit":["1.png"]},
                  "ip":"  ::ffff:127.0.0.1",
                  "type":"server"
                    }
                ],
                  "proxies":[
                  {
                      "port":50001,
                      "name":"GATEWAY_1",
                      "pos":"1",
                      "caches":{},
                      "ip":"::ffff:127.0.0.1",
                      "nodes":[
                               {"port":50002,"name":"MEC1","pos":"11","caches":{},"ip":"::ffff:127.0.0.1"},
                               {"port":50003,"name":"MEC2","pos":"12","caches":{},"ip":"::ffff:127.0.0.1"}
                               ]},
                  {
                      "port":50001,
                      "name":"GATEWAY_2",
                      "pos":"2",
                      "caches":{},
                      "ip":"::ffff:127.0.0.1",
                      "nodes":[
                               {"port":50002,"name":"MEC1","pos":"21","caches":{},"ip":"::ffff:127.0.0.1"},
                               {"port":50003,"name":"MEC2","pos":"22","caches":{},"ip":"::ffff:127.0.0.1"}
                               ]}
                    ]}
          var myNode =[];
          myNode.push(root.servers[0]);
          for(var k1=0;k1<root.proxies.length;k1++){
            myNode.push(root.proxies[k1])
            for(var k2=0;k2<root.proxies[k1].nodes.length;k2++){
              myNode.push(root.proxies[k1].nodes[k2]);
            }
          }
          console.log(JSON.stringify(myNode));

          var svg=d3.select('svg')
                         .attr({"width":width,
                                "height":height,
                           })

          var tooltip = d3.select("body")  
                         .append("div")  
                         .attr("class","tooltip")  
                         .style("opacity",0.0); 
          
           draw();
          // setInterval(function(){
          //   // svg.selectAll().remove();
          //     $("svg").empty();
          //      resources.push(["B",3,{"data":""}]);
          //      draw();
          // },10000)
          

          function draw(){
               $("svg").empty();

               var targetT,targetS,targetA,targetB,subIndex,targetSub={}; 

               var nodeLength=myNode.length;
               var nodes=d3.range(0,nodeLength).map(function(i){
                   if(myNode[i].name.substr(0,3)=="Sir"){
                    targetS=i;
                    return{name:"Server",img:"./img/cloud-server.png",data:"myNode[i]",x:570,y:246}
                   }
                   if(myNode[i].name.substr(0,7)=="GATEWAY"){
                    if(myNode[i].pos=="1"){
                      targetA=i;
                      return{name:"DGW_A",img:"./img/swtich.png" ,data:"", x:380,y:248}
                    }else{
                      targetB=i;
                      return {name:"DGW_B",img:"./img/swtich.png", data:"",x:380,y:450}
                    }
                   }
                   if(myNode[i].pos.length==2){
                      if(myNode[i].pos.substr(0,1)=="1"){
                        return  {name:"MEC_A_sub"+myNode[i].pos.substr(1,2),img:"./img/MEC.png",data:"",x:200 , y : myNode[i].pos.substr(1,2)==1 ? 145:295}
                      }else{
                        return {name:"MEC_B_sub"+myNode[i].pos.substr(1,2),img:"./img/MEC.png",data:"",x:200 , y : myNode[i].pos.substr(1,2)==1 ? 415:580}
                      }
                   }
               })

               console.log(JSON.stringify(nodes));

               var edges = d3.range(1,nodeLength).map(function(i){
                    console.log("nodes["+i+"]"+JSON.stringify(nodes[i]))
                    if(nodes[i].name=="DGW_A"){
                         return {source: i,target: targetS+1}
                    }if(nodes[i].name=="DGW_B"){
                         return {source: i,target: targetS+1}
                    }else{
                      return {source:i,target:i}
                    }
                    // if(nodes[i].name.substr(0,9)=="MEC_A_sub"){
                    //      var temTar1= targetA==undefined ? targetS:targetA;
                    //      return {source: i,target: temTar1}
                    // }if(nodes[i].name.substr(0,9)=="MEC_B_sub"){
                    //      var temTar2= targetB==undefined ? targetS:targetB;
                    //      return {source: i,target: temTar2}
                    // }
                    // if(nodes[i].name =="Phone"){
                    //     //这是上一级的索引例如“A1”
                    //     var tempTar=resources[i][1].target;
                    //     subIndex=targetSub[tempTar];

                    //     console.log("phone: "+subIndex)
                    //     return {source: i ,target: subIndex}
                    // }
               })
                
               console.log("edges: "+JSON.stringify(edges))

               // var targetT,targetS,targetA,targetB,subIndex,targetSub={};  
               // var k=0;

               // //初始化节点
               // var nodes = d3.range(0,nodeLength).map(function(i){
               //      if(resources[i].length==2 &&  resources[i][0]=="T"){
               //           targetT=i;               
               //           return {name:"Tracker",img:"./img/cloud-server.png",data:resources[i][1], x:570,y:95}
               //      }
               //      else if(resources[i].length==2 && resources[i][0]=="S"){
               //           targetS=i;
               //           return {name:"Server",img:"./img/cloud-server.png",data:resources[i][1],x:570,y:246}
               //      }
               //      else if(resources[i].length==2 && resources[i][0]=="A"){
               //           targetA=i;
               //           return {name:"DGW_A",img:"./img/swtich.png" ,data:resources[i][1], x:380,y:248}
               //      }
               //      else if(resources[i].length==2 && resources[i][0]=="B"){
               //           targetB=i; 
               //           return {name:"DGW_B",img:"./img/swtich.png", data:resources[i][1],x:380,y:450}
               //      }
               //      else if(resources[i].length==3 && resources[i][0]=="A"){
               //            var tempname="A"+resources[i][1];
               //            targetSub[tempname]=i;
                          
               //           return {name:"MEC_A_sub"+resources[i][1],img:"./img/MEC.png",data:resources[i][2],x:200 , y:resources[i][1]==1 ? 145:295}
               //      }
               //      else if(resources[i].length==3 && resources[i][0]=="B"){                          
               //            var tempname="B"+resources[i][1];
               //            targetSub[tempname]=i;

               //           return {name:"MEC_B_sub"+resources[i][1],img:"./img/MEC.png",data:resources[i][2],x:200,y:resources[i][1]==1 ? 415:580}
               //      }
               //      else if(resources[i].length==3 && resources[i][0]=="PH"){
               //            k++;
               //            var tempTar=resources[i][1].target;
               //            subIndex=targetSub[tempTar];
               //            var tempY=function(){
               //              if(tempTar=="A1"){return position.MEC_A_sub1.yp+(k-2)*50}
               //              else if(tempTar=="A2"){return position.MEC_A_sub2.yp+(k-2)*50}
               //              else if(tempTar=="B1"){return position.MEC_B_sub1.yp+(k-2)*50}
               //              else if(tempTar=="B2"){return position.MEC_B_sub2.yp+(k-2)*50};
               //            }
               //           return {name:"Phone",img:"./img/phone.png",data:resources[i][2],
               //                    x:85, y:tempY }
               //      }

               //      console("i:"+i)
               // })

               // console.log("nodes: "+JSON.stringify(nodes));
               // console.log("targetSub: "+JSON.stringify(targetSub));

               // //初始化连线
               // var edges = d3.range(1,nodeLength).map(function(i){
               //      console.log("nodes["+i+"]"+JSON.stringify(nodes[i]))
               //      if(nodes[i]["name"]=="Server"){
               //           return {source: i,target: targetT}
               //      }if(nodes[i].name=="DGW_A"){
               //           return {source: i,target: targetS}
               //      }if(nodes[i].name=="DGW_B"){
               //           return {source: i,target: targetS}
               //      }if(nodes[i].name.substr(0,9)=="MEC_A_sub"){
               //           var temTar1= targetA==undefined ? targetS:targetA;
               //           return {source: i,target: temTar1}
               //      }if(nodes[i].name.substr(0,9)=="MEC_B_sub"){
               //           var temTar2= targetB==undefined ? targetS:targetB;
               //           return {source: i,target: temTar2}
               //      }if(nodes[i].name =="Phone"){
               //          //这是上一级的索引例如“A1”
               //          var tempTar=resources[i][1].target;
               //          subIndex=targetSub[tempTar];

               //          console.log("phone: "+subIndex)
               //          return {source: i ,target: subIndex}
               //      }
               // })

               // console.log("edges: "+JSON.stringify(edges))

              

               var force = d3.layout.force()
                              .nodes(nodes) //指定节点数组
                              .links(edges)  //连线数组
                              .size([width,height])  //作用域范围
                              .linkDistance(150)
                              .gravity(.05)
                              .charge([-400]);

               var drag = force.drag()
                              .on("dragstart", dragstart);
               force.start();
               console.log(nodes);
               console.log(edges);
               // //   添加连线
               

               var updateEdges = svg.selectAll("line")
                                   .data(edges);
               var enterEdges = updateEdges.enter();

               updateEdges.style("stroke","#ccc")
                          .style("stroke-width",3);

               enterEdges.append("line")
                          .style("stroke","#ccc")
                          .style("stroke-width",3);

               //  //以前的版本
               // // var svg_edges = svg.selectAll("line")
               // //                     .data(edges)
               // //                     .enter()
               // //                     .append("line")
               // //                     .style("stroke","#ccc")
               // //                     .style("stroke-width",3);

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
                                   .call(force.drag) //节点能够拖动
                                   .on("mouseover",function(d,i){  
                                   /* 
                                   鼠标移入时， 
                                       （1）通过 selection.html() 来更改提示框的文字 
                                       （2）通过更改样式 left 和 top 来设定提示框的位置 
                                       （3）设定提示框的透明度为1.0（完全不透明） 
                                       */  
                                     
                                        tooltip.html(JSON.stringify(d.data)+"<br />" +   
                                          d.data+" ggggggggg")  
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
                    updateEdges.attr("x1",function(d){d.fixed = true ;return d.source.x ;})
                              .attr("y1",function(d){d.fixed = true; return d.source.y ;})
                              .attr("x2",function(d){d.fixed = true; return d.target.x ;})
                              .attr("y2",function(d){d.fixed = true; return d.target.y})
                    //更新节点坐标
                    svg_nodes_img.attr("x",function(d){d.fixed = true; return d.x-15})
                              .attr("y",function(d){ d.fixed = true; return d.y-30});

                    svg_texts.attr("x",function(d){ d.fixed = true; return d.x+10})
                              .attr("y",function(d){ d.fixed = true; return d.y+10});

               });

               function dblclick(d) {
                    d3.select(this).classed("fixed", d.fixed = false);
                }

               function dragstart(d) {
                    d3.select(this).classed("fixed", d.fixed = true);
               } 
         
          }
          
      })  
     

})();
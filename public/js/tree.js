(function(){
    $().ready(function(){
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


        var tooltip = d3.select("body")  
                        .append("div")  
                        .attr("class","tooltip")  
                        .style("opacity",0.0)
                        .style("background-color","agba( 100, 149 ,237,0.5)")


        // setInterval(function(){
        //   // svg.selectAll().remove();
        //     $("svg").empty();
        //      resources.push(["B",3,{"data":""}]);
        //      draw();
        // },10000)

        var width = 800,
            height = 800;

        var svg=d3.select("body")     //选择文档中的body元素
                    .append("svg")     
                    .attr({"width":width,
                            "height":height,
                       })

        function draw(root){

            var myNode =[];
            myNode.push(root.servers[0]);
            for(var k1=0;k1<root.proxies.length;k1++){
                myNode.push(root.proxies[k1])
                for(var k2=0;k2<root.proxies[k1].nodes.length;k2++){
                  myNode.push(root.proxies[k1].nodes[k2]);
                }
            }
            console.log(JSON.stringify(myNode));

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
                        return{name:"DGW_A",img:"./img/swtich.png" ,data:myNode[i].data, x:380,y:248}
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
                     return {source: i,target: targetS}
                }if(nodes[i].name=="DGW_B"){
                     return {source: i,target: targetS}
                }else if(nodes[i].name.substr(0,9)=="MEC_A_sub"){
                  var temTar1= targetA==undefined ? targetS:targetA;
                  return {source:i,target:temTar1}
                }else if(nodes[i].name.substr(0,9)=="MEC_B_sub"){
                  var temTar2= targetB==undefined ? targetS:targetB;
                  return {source:i,target:temTar2}
                }
            })

            console.log("edges: "+JSON.stringify(edges))

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
            //   添加连线
            var svg=d3.select("svg");

            var svg_edges = svg.selectAll("line")
                               .data(edges)
                               .enter()
                               .append("line")
                               .style("stroke","#ccc")
                               .style("stroke-width",3)
                               .attr('lid',function(d,i){
                                return i+1;
                               })
            // console.log("svg_edges:"+JSON.stringify(svg_edges))
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
                               .attr('did',function(d,i){
                                return d.name;
                               })
                               .on("mouseover",function(d,i){                                 
                                    tooltip.html(JSON.stringify(d.data)+"<br />" +   
                                      d.data+" ggggggggg")  
                                            .style("left", (d3.event.pageX) + "px")  
                                            .style("top", (d3.event.pageY + 20) + "px")  
                                            .style("opacity",1.0)
                                            .style("background-color","rgba(  238, 232, 205,0.8)");  
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

            // console.log("svg_nodes_img:"+JSON.stringify(svg_nodes_img))

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
                svg_edges.attr("x1",function(d){d.fixed = true ;return d.source.x ;})
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

        draw(root);

        var host=root.proxies[0];
        var text="abbbbbbbbbb";
        console.log(host.name)
        setTimeout(()=>{
            msg(host,"add",text);
        },3000);

        function msg(host, type, text){
            var msgTooltip = d3.select("body")  
                         .append("div")  
                         .attr("class","msgTooltip")  
                         .style("opacity",0.0); 


            var nameIndex, node;

            node=findDOMNode(host);

            var offsetTop=parseInt($("svg").css("margin-top"))+parseInt(node.attr("y"));
            
            var offsetLeft=parseInt($("svg").css("margin-left"))+parseInt(node.attr("x"));
            console.log("offsetTop:"+offsetTop,"offsetLeft:"+offsetLeft)
            d3.select(".msgTooltip").html(nameIndex+": "+type+"-"+text)
                .style("left",offsetLeft+ "px")  
                .style("top", offsetTop-60+"px")
                .style("opacity",1.0);

            setTimeout(()=>{
                d3.select(".msgTooltip").html(nameIndex+": "+type+"-"+text)
                    .style("opacity",0);
            },3000);

            // host.data=text;
            // console.log(host)
            // root.proxies[0]=host;
            // var myRoot=root;
            // console.log(myRoot)
            // draw(myRoot);

            // var line=$("svg line[lid=2]").css("stroke","red");
            // console.log(line)
            


            
            
        }

        var host1=root.servers[0];
        var host2=root.proxies[1];

        // var host1=root.proxies[0];
        // var host2=root.proxies[0].nodes[0];
        setTimeout(()=>{
            link(host1,host2,"add",text);
        },4000);


        function link(host1, host2, type, text){

            var linkTooltip = d3.select("body")  
                         .append("div")  
                         .attr("class","linkTooltip")  
                         .style("opacity",0.0); 

            var node1=findDOMNode(host1);
            var node2=findDOMNode(host2);

            console.log(node1)
            console.log(node2)

            var x1=parseInt(node1.attr("x"))+25,
                y1=parseInt(node1.attr("y"))+25,
                x2=parseInt(node2.attr("x"))+25,
                y2=parseInt(node2.attr("y"))+25;

            var lineData=[
                       {x:x1,y:y1},
                       {x:x2,y:y2},
                    ];

            var svg = d3.select('svg');

            var ball=svg.append("circle")
                        .attr({
                            "cx":x1,
                            "cy":y1,
                            "r":"5",
                            "stroke":"red",
                            "fill":"red"
                        })
                        .transition()
                        .duration(1000)
                        .delay(500)
                        .ease("linear")
                        .attr({
                            "cx":x2,
                            "cy":y2, 
                        })
                        .transition()
                        .delay(1500)
                        .remove();

            var textTip=svg.append("text")
                            .attr({
                                "x":(x1+x2)/2+10,
                                "y":(y1+y2)/2+10,
                                "stroke":"blue"
                            })
                            .text(text)
                            .transition()
                            .duration(1000)
                            .delay(500)
                            .remove();



            var lineFunction = d3.svg.line()
                                 .x(function(d) { return d.x; })
                                 .y(function(d) { return d.y; })
                                 .interpolate("basis");  //linear
            var lineGraph = svg.append("path")
                                .attr("d", lineFunction(lineData))
                                .attr("stroke", "lightblue")
                                .attr("stroke-width", 5)
                                .attr("fill", "none")
                                .transition()
                                .duration(500)
                                .ease("bounce")
                                .attr("stroke", "blue")
                                .delay(500)
                                .transition()
                                .duration(500)
                                .ease("linear")
                                .attr("stroke", "lightblue")
                                .transition()
                                .delay(1500)
                                .duration(500)
                                .ease("linear")
                                .attr("opacity", 0);

        }



        function findDOMNode(host){
            switch (host.name){
                case "Sir1":
                    node=$("svg image[did='Server']");
                  break;
                case "GATEWAY_1":
                    console.log("DGW_A");
                    node=$("svg image[did='DGW_A']");
                    nameIndex="DGW_A";
                    break;
                case "GATEWAY_2":
                    node=$("svg image[did='DGW_B']");
                    console.log("DGW_B");
                    break;
                case "MEC1":
                    node=$("svg image[did='MEC_A_sub1']");
                    console.log("MEC_A_sub1");
                    break;
                case "MEC2":
                    node=$("svg image[did='MEC_A_sub2']");
                    console.log("MEC_A_sub2");
                    break;
                default:
                    node={"x":60,"y":60};
                    console.log("Sorry, cannot match");    
            }
            return node;
        }
        
    })  
    
    


})();
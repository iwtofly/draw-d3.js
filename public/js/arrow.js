(function(){
    $().ready(function(){
        var width = 800,
           height = 800;

        var svg = d3.select("body").append("svg")
                    .attr("width", width)
                    .attr("height", height);
        
        var defs = svg.append("defs");

        var arrowMarker = defs.append("marker")
                                .attr("id","arrow")
                                .attr("markerUnits","strokeWidth")
                                .attr("markerWidth","12")
                                .attr("markerHeight","12")
                                .attr("viewBox","0 0 12 12") 
                                .attr("refX","6")
                                .attr("refY","6")
                                .attr("orient","auto");

        var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
                                
        arrowMarker.append("path")
                    .attr("d",arrow_path)
                    .attr("fill","#000");

        //绘制直线
        var line = svg.append("line")
                     .attr("x1",0)
                     .attr("y1",0)
                     .attr("x2",200)
                     .attr("y2",50)
                     .attr("stroke","red")
                     .attr("stroke-width",2)
                     .attr("marker-end","url(#arrow)")
                     .transition()
                     .duration(1000)
                     .attr("x2",800)
                     .attr("y2",200)

        // //绘制曲线
        // var curve_path = "M20,70 T80,100 T160,80 T200,90";

        // var curve = svg.append("path")
        //              .attr("d",curve_path)
        //              .attr("fill","white")
        //              .attr("stroke","red")
        //              .attr("stroke-width",2)
        //              .attr("marker-start","url(#arrow)")
        //              .attr("marker-mid","url(#arrow)")
        //              .attr("marker-end","url(#arrow)");
          
    })  
     

})();
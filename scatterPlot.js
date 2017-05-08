	


		var dataset;  //Global variable
		var scalingVariable=2;//scale everything including the padding easily
		var w=500*scalingVariable;
		var h=500*scalingVariable;
		var padding = 70*scalingVariable;
		var toggleYear=1;//flag to tell what was the last year I saw



		d3.csv("ScatterData.csv", function(data) {
    		dataset=data;    //Once loaded, copy to dataset.


//prost2003=NumberAccidents
//theft2003=totalDeathsAndInjuries

/////////////////////////////////////////SCALES///////////////////////////////////////////

		//Create scale functions
		var xScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) { 
			
			return Number(d["totalDeathsAndInjuries"])+100; 
		})
		])
		.range([padding, w - padding ]);




		var yScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) { 
			return Number(d["NumberAccidents"])+100; 
		})])
		.range([h-padding , padding]);



/////////////////////////////////////////SVGs///////////////////////////////////////////

		//Create SVG element
		var svg = d3.select("#area1")
		.append("svg")
		.attr("width", w)
		.attr("height", h);


		svg.selectAll("circle")  
		.data(dataset)
		.enter()
		.append("circle")     
		.attr("cx", function(d,i) {
			return xScale(Number(d["totalDeathsAndInjuries"]));
		})
		.attr("cy", function(d) {
			return yScale(Number(d["NumberAccidents"]));
		})
		.attr("r",15)
		.attr("fill", "green")
		.attr("opacity", "0.5")
		.attr("stroke", "black")
		.attr("stroke-width",2)

		.on("mouseover", function(d) {

		    d3.select(this)
		       .attr("fill", "orange");
/*		      var xPosition = d3.mouse(this)[0]-50;
		      var yPosition = d3.mouse(this)[1]-50;*/
/*		      var x = screen.width;
   		      var y = screen.height;

		      console.log(x,y);
			var xPosition = parseFloat(d3.select(this).attr("cx"));
			var yPosition = parseFloat(d3.select(this).attr("cy"));
			console.log((xPosition/x)*100,(yPosition/y)*100);*/
		  //  d3.select("#tooltip")
/*			  .style("left", 250 + "px")
			  .style("top", -4800 + "px")*/
		/*	  .select("#value")
			  .text(d["BOROUGH"]+" is the most dangerous borough with a total of "+d["boroughTotal"]+ " deaths and injuries caused by "+d["VEHICLE 1 FACTOR"]);
			d3.select("#tooltip").classed("hidden", false);
*/
			var xPosition = parseFloat(d3.select(this).attr("cx"));
			var yPosition = parseFloat(d3.select(this).attr("cy"));
			svg.selectAll(".text.title")
			.transition()    
			.duration(0)
			.each("start", function() {
				d3.select(this);
			})   
			.transition()    // <-- Transition #2
			.duration(0)
			.attr("x", xPosition-350 )
			.attr("y", yPosition-150 )
			.text(d["BOROUGH"]);	
		
			svg.selectAll(".text.title2")
			.transition()    
			.duration(0)
			.each("start", function() {
				d3.select(this);
			})   
			.transition()    // <-- Transition #2
			.duration(0)
			.attr("x", xPosition-350 )
			.attr("y", yPosition-150 )
			.text("Amount:"+d["boroughTotal"]);	
			
			svg.selectAll(".text.title3")
			.transition()    
			.duration(0)
			.each("start", function() {
				d3.select(this);
			})   
			.transition()    // <-- Transition #2
			.duration(0)
			.attr("x", xPosition-350 )
			.attr("y", yPosition-150 )
			.text(d["VEHICLE 1 FACTOR"]);	
		

		})
		.on("mouseout", function(d) {
        	d3.select(this)
        	.transition()
      		.duration(500)
    		.attr("fill", "green");
    		//d3.select("#tooltip").classed("hidden", true);
    		svg.selectAll(".text.title")
			.transition()    
			.duration(0)
			.each("start", function() {
				d3.select(this);
			})   
			.transition()    // <-- Transition #2
			.duration(0)
			.text(function(){
				return " ";//depending on what was the last change to the new data
			});	
			svg.selectAll(".text.title2")
			.transition()    
			.duration(0)
			.each("start", function() {
				d3.select(this);
			})   
			.transition()    // <-- Transition #2
			.duration(0)
			.text(function(){
				return " ";//depending on what was the last change to the new data
			});	
			svg.selectAll(".text.title3")
			.transition()    
			.duration(0)
			.each("start", function() {
				d3.select(this);
			})   
			.transition()    // <-- Transition #2
			.duration(0)
			.text(function(){
				return " ";//depending on what was the last change to the new data
			});	

		});


		var hackCounterForDisplaying = 0;
		

		svg.selectAll("text")  
		.data(dataset)
		.enter()
		.append("text")     
		.text(function(d) {
			return d["VEHICLE 1 FACTOR"];

		})
		.attr("x", function(d) {
			return (xScale(Number(d["totalDeathsAndInjuries"])));
		})
		.attr("y", function(d) {
			hackCounterForDisplaying++;
			if (hackCounterForDisplaying%2==0) {
				return yScale(Number(d["NumberAccidents"]))-10;
			}else
				return yScale(Number(d["NumberAccidents"]));
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "12px")
		.attr("fill", "black")
		.attr("opacity", "0.5");	



		svg.append("text")      // text label for the x axis
		.attr("transform", "rotate(-90)")
		.attr("x", -h/2)
		.attr("y", padding/2 -9)
		.style("text-anchor", "middle")
		.text("Number of Deaths or Injuries");

		svg.append("text")      // text label for the y axis
		.attr("x", w/2 )
		.attr("y", h-padding/2 )
		.style("text-anchor", "middle")
		.text("Total Number of Accidents");


		svg.append("text")      // text label for more details
		.attr("class","text title")
		.attr("transform", "translate("+(w-padding*5)+"," + (padding-40) + ")")
		.style("text-anchor", "middle")
		.text(" ")
		.attr("font-family", "sans-serif")
		.attr("font-size", "22px")
		.attr("opacity", "1")
		.attr("fill", "black");	

		svg.append("text")      // text label for more details
		.attr("class","text title2")
		.attr("transform", "translate("+(w-padding*5)+"," + (padding-20) + ")")
		.style("text-anchor", "middle")
		.text(" ")
		.attr("font-family", "sans-serif")
		.attr("font-size", "22px")
		.attr("opacity", "1")
		.attr("fill", "black");	

		svg.append("text")      // text label for more details
		.attr("class","text title3")
		.attr("transform", "translate("+(w-padding*5)+"," + (padding) + ")")
		.style("text-anchor", "middle")
		.text(" ")
		.attr("font-family", "sans-serif")
		.attr("font-size", "22px")
		.attr("opacity", "1")
		.attr("fill", "black");	

////////////////////////////////////////AXIS///////////////////////////////////////////
		var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(10);

					//Define Y axis
		var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(10);


		//Create X axis
		svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate("+0+"," + (h-padding) + ")")
		.call(xAxis);

				//Create Y axis
				
		svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (padding) + ","+ 0 +")")
		.call(yAxis);

});
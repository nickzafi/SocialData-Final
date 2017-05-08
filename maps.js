
var path = d3.geo.path();
var scalingVariable=1;
var ww=800*scalingVariable;
var hh=600*scalingVariable;
          var flagHoverOrCklick=-1;//1 for click 0 for hover
          var previousState=2;//flag to tell what was the last status
          var colorsForClusters=["red","blue","green","yellow","MediumAquaMarine  ","magenta"];
      var centroids=[   //this is a list with all the cntroids
      [[-73.97829684,40.68228024 ],[-73.85654579,40.76961033],
        [-73.97973089,40.75299603 ],[-73.8349104,40.71801373]],
      [[-73.80998122,40.71004448],[-73.9249654,40.80038465],[-73.98303114,40.65946792],
        [-73.95960841,40.77494712 ],[-73.9904789,40.73689813],[-73.79051142,40.66081824]],
      [[-73.95606821,40.71718703],[-73.89829814,40.83597855],[-74.0238062,40.60891031 ],[-73.80692425,40.71085392],
        [-73.99228448,40.73272938],[-73.88190392,40.77216325],[-73.96911881,40.77138143 ],[-73.78490798,40.65220501]]
      ];


    var namesForCircles = ["circles2","circles3","circles4"];

      var projection = d3.geo.mercator()
      .center([-73.962916, 40.740698])
      .scale(70000)
      .translate([ww/2, hh/2 ]);
      //Create SVG element
      var svg = d3.select("#area2")
      .append("svg")
      .attr("width", ww)
      .attr("height", hh);

      var path = d3.geo.path()
      .projection(projection);


      d3.json("NewYork.json", function(json) {//reading the json to draw the map

        svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .style("fill","black")
        .attr("opacity", "0.8")
        .attr("stroke", "green")
        .attr("stroke-width",2)
        .attr("d", path);

      });


      changeCentroids(0);//create for the first time centroids for accidents


      function outOfButton(){//function that works for every button and is called when you hover away. Sets to previous status if you changed after a hover
              if(flagHoverOrCklick==0){// need to know if you clicked or just hovered. Take action only after hover
                if (previousState==2) {changeCentroids(0);}
                else if (previousState==3) {changeCentroids(1);}
                else if (previousState==4) {changeCentroids(2);}
                
              }
            }

function changeCentroids(classC){//function for changing the centroids.Works for all buttons and functionalities

          className=namesForCircles[classC];

          svg.selectAll("."+namesForCircles[0]).remove();//destroy what we had
          svg.selectAll("."+namesForCircles[1]).remove();
          svg.selectAll("."+namesForCircles[2]).remove();

          
          var counter=0;
          var counter2=0;
          var limit;

          if (classC==0) {limit=2}
          if (classC==1) {limit=3}
          if (classC==2) {limit=4}


          svg.selectAll(className)  //create new class for the new centoids (better understanded by our brains)
          .data(centroids[classC])
          .enter()
          .append("circle")    
          .attr("class",className)
          .attr("cx", function(d) {
            return projection([d[0],d[1]])[0];
          })
          .attr("cy", function(d) {
            return projection([d[0],d[1]])[1];
          })
          .attr("r", 5)
          .attr("stroke", function(d){
            if (counter<limit) {
              counter++;            
              return "red";
            }
              else {
              counter++;            
              return "blue";
            }
          })          
          .attr("fill", function(d){
            if (counter2<limit)
            {
              counter2++;            
              return "red";
            }
            else {
              counter2++;            
              return "blue";
            }
          })
          .transition()
          .delay(1000)
          .attr("r", 10)
          .attr("fill-opacity", "0.0")
          .attr("stroke-width",5)
          .attr("stroke-opacity","1.0");

        }



    ////////////////////////////////BUTTON 2////////////////////////////////////////

    d3.select("button2")
    .on("click", function() {

      previousState=2;
      flagHoverOrCklick=1;
      changeCentroids(0);//create for the first time centroids

    });

    d3.select("button2")
    .on("mouseover", function() {

      flagHoverOrCklick=0;
      changeCentroids(0);//create for the first time centroids

    });

    d3.select("button2")
    .on("mouseout", function() {
      outOfButton();

    });

    ////////////////////////////////BUTTON 3////////////////////////////////////////
    d3.select("button3")
    .on("click", function() {

      previousState=3;
      flagHoverOrCklick=1;
      changeCentroids(1);//create for the first time centroids

    });
    d3.select("button3")
    .on("mouseover", function() {

      flagHoverOrCklick=0;
      changeCentroids(1);//create for the first time centroids
    });



    d3.select("button3")
    .on("mouseout", function() {
      outOfButton();

    });


    ////////////////////////////////BUTTON 4////////////////////////////////////////

    d3.select("button4")
    .on("click", function() {

      previousState=4;
      flagHoverOrCklick=1;
      changeCentroids(2);//create for the first time centroids
    });

    d3.select("button4")
    .on("mouseover", function() {

      flagHoverOrCklick=0;
      changeCentroids(2);//create for the first time centroids

    });

    d3.select("button4")
    .on("mouseout", function() {
      outOfButton();

    });

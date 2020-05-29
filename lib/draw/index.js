//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.getAttribute("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.getAttribute("height") <  endY)                 svg.getAttribute("height", endY);
    if (svg.getAttribute("width" ) < (startX + stroke) )    svg.getAttribute("width", (startX + stroke));
    if (svg.getAttribute("width" ) < (endX   + stroke) )    svg.getAttribute("width", (endX   + stroke));
    
    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }

    // var d = [
    //     "M", start.x, start.y, 
    //     "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    // ].join(" ");

    // return d;
    console.log({ delta, deltaX, deltaY })
    path
        .setAttribute("d", `
            M ${startX} ${startY}
            H ${endX - 100}
            a 50 50 0 0 1 50 50
            //A ${(endX - startX) / 2 + startX - 150},${endY} 0 0 1 ${endX},${endY}
            // V ${endY}
        `);
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
    // path.setAttribute("d", `
    //                 M ${startX} ${startY}
    //                 V ${startY + deltaY}
    //                 A ${delta} ${delta} 0 0 ${arc1} ${startX + delta * signum(deltaX)} ${startY + 2 * delta}
    //                 H ${endX - delta * signum(deltaX)}
    //                 A ${delta} ${delta} 0 0 ${arc2} ${endX} ${startY + 3 * delta}
    //                 V ${endY}
    //             `);
}

export function connectElements(svg, path, startElem, endElem) {
    // var svgContainer = $("#svgContainer");

    // if first element is lower than the second, swap!
    // if(startElem.getBoundingClientRect().y > endElem.getBoundingClientRect().y){
    //     var temp = startElem;
    //     startElem = endElem;
    //     endElem = temp;
    // }

    const baseMargin = 10;

    // get (top, left) corner coordinates of the svg container   
    const svgTop  = svg.getBoundingClientRect().y;
    const svgLeft = svg.getBoundingClientRect().x;

    // get (top, left) coordinates for the two elements
    const start = startElem.getBoundingClientRect();
    const end   = endElem.getBoundingClientRect();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    const startX = start.x + (start.width + baseMargin) - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    const startY = start.y  + (start.height / 2) - svgTop;        // y = top offset + height - svg's top offset

    // calculate path's end (x,y) coords
    // var endX = endCoord.x + svgLeft;
    const endX = end.x + end.width / 2;
    const endY = end.y  - svgTop;

    // call function for drawing the path
    console.log({svg, path, startX, startY, endX, endY})
    drawPath(svg, path, startX, startY, endX, endY);

}



// function connectAll() {
//     // connect all the paths you want!
//     connectElements($("#svg1"), $("#path1"), $("#teal"),   $("#orange"));
//     connectElements($("#svg1"), $("#path2"), $("#red"),    $("#orange"));
//     connectElements($("#svg1"), $("#path3"), $("#teal"),   $("#aqua")  );
//     connectElements($("#svg1"), $("#path4"), $("#red"),    $("#aqua")  ); 
//     connectElements($("#svg1"), $("#path5"), $("#purple"), $("#teal")  );
//     connectElements($("#svg1"), $("#path6"), $("#orange"), $("#green") );

// }

// $(document).ready(function() {
//     // reset svg each time 
//     $("#svg1").getAttribute("height", "0");
//     $("#svg1").getAttribute("width", "0");
//     connectAll();
// });

// $(window).resize(function () {
//     // reset svg each time 
//     $("#svg1").getAttribute("height", "0");
//     $("#svg1").getAttribute("width", "0");
//     connectAll();
// });
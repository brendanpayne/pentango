function createPentagon(id, size = 100, Xcenter = 150, Ycenter = 150, shiftVal = 0, color = "red") {
    // pentagon
    const numberOfSides = 5,
        step  = 2 * Math.PI / numberOfSides, //Precalculate step value
        shift = (Math.PI / 180.0) * (shiftVal-18); // align it properly  
        
    const svg = document.getElementById(id);

    const svgns = "http://www.w3.org/2000/svg";

    let pentagon = document.createElementNS(svgns, "polygon")
        points = ``;

    for (let i=0; i<=numberOfSides; i++) {
        const curStep = (i * step + shift);
        if (points) {
            points+=`,`;
        }
        points+=`${Xcenter + size * Math.cos(curStep)} ${Ycenter + size * Math.sin(curStep)}`;
    }
    pentagon.setAttribute("points", points);
    pentagon.setAttribute("fill", color);
    svg.appendChild(pentagon);
}
createPentagon(`polygon_0`, 50, 135, 140, 36, `white`)

for (var i = 0; i < 5;i++) {
    var curStep = i * (2 * Math.PI / 5) + ((Math.PI / 180.0) * -18);
    createPentagon(`polygon_${i+1}`, 50, 135+ (90 * Math.cos(curStep)), 140 + (90 * Math.sin(curStep)), 0, `red`);
}

for (var i=0; i < document.getElementsByTagName(`g`).length; i++) {
    let polygon = document.getElementById(`polygon_${i}`);
    polygon.addEventListener('mouseover', function(e) {
        polygon.firstChild.setAttribute('fill', 'white');
    })
    polygon.addEventListener('mouseout', function(e) {
        polygon.firstChild.setAttribute('fill', 'red');
    })
    polygon.addEventListener('click', function(e) {
        console.log(`you clicked ${i}`);
    })
}

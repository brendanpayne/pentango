function createPentagon(id, size = 100, Xcenter = 150, Ycenter = 150, shiftVal = 0, color = "red", letter = "A") {
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

    let text = document.createElementNS(svgns, "text");

    text.setAttributeNS(null, "x", Xcenter);
    text.setAttributeNS(null, "y", Ycenter+5); //5 is the offset
    text.setAttributeNS(null, "font-size", size);
    text.setAttributeNS(null, "fill", 'black');
    text.setAttributeNS(null, "text-anchor", 'middle');
    text.setAttributeNS(null, "alignment-baseline", 'middle');
    text.setAttributeNS(null, "font-family", 'Arial');
    text.setAttributeNS(null, "font-weight", 'bold');

    text.textContent = letter;
    svg.appendChild(text);
}


const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const exportButton = document.getElementById('exportButton');
const pixelCountInput = document.getElementById('pixelCountInput');

let pixelCount = parseInt(pixelCountInput.value);
const canvasSize = 500;
let pixelSize = canvasSize / pixelCount;

let pixelColors = Array(pixelCount).fill(null).map(() => Array(pixelCount).fill(0));

const colorMap = ['rgba(0, 0, 0, 0)', '#000000', '#ffffff'];

function drawCanvas() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    for (let y = 0; y < pixelCount; y++) {
        for (let x = 0; x < pixelCount; x++) {
            ctx.fillStyle = colorMap[pixelColors[y][x]];
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }
}
drawCanvas();

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const pixelX = Math.floor(x / pixelSize);
    const pixelY = Math.floor(y / pixelSize);

    const color = colorPicker.value;
    const colorIndex = colorMap.indexOf(color);
    if (colorIndex === -1) {
        colorMap.push(color);
        pixelColors[pixelY][pixelX] = colorMap.length - 1;
    } else {
        pixelColors[pixelY][pixelX] = colorIndex;
    }
    drawCanvas();
});

pixelCountInput.addEventListener('change', () => {
    pixelCount = parseInt(pixelCountInput.value);
    pixelSize = canvasSize / pixelCount;
    pixelColors = Array(pixelCount).fill(null).map(() => Array(pixelCount).fill(0));
    drawCanvas();
});

// Imprimir la matriz de colores en la consola
exportButton.addEventListener('click', () => {
    let mycanva = document.getElementById('mycanva')
    let ctx = mycanva.getContext("2d")
    let pixelSize = 240 / pixelCount;

    function drawCanvas() {
        console.log("Colores");
        console.log(colorMap);
        console.log("");
        console.log("Lienzo");
        console.log(pixelColors);
        ctx.clearRect(0, 0, canvasSize, canvasSize); // Limpiar el lienzo antes de dibujar
        for (let y = 0; y < pixelCount; y++) {
            for (let x = 0; x < pixelCount; x++) {
                ctx.fillStyle = colorMap[pixelColors[y][x]];
                ctx.fillRect(
                    Math.floor(x * pixelSize),
                    Math.floor(y * pixelSize),
                    Math.ceil(pixelSize),
                    Math.ceil(pixelSize)
                );
            }
        }
    }

    drawCanvas()
});


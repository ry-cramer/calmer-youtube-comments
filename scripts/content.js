/// Content script

console.log('Compatible Website!');
console.log('Loading canvas...');

// Create a canvas element
const canvas = document.createElement('canvas');
const body = document.getElementsByTagName('body')
canvas.id = 'annotation-canvas';
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = body.width;
canvas.style.height = body.height;
canvas.style.zIndex = '9999'; // Ensure canvas appears on top of other content
document.body.appendChild(canvas);
console.log('Canvas loaded');
console.log('Loading draw tools...');

const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Scroll position

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseout', endDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.clientX + window.scrollX - canvas.offsetLeft, e.clientY + window.scrollY - canvas.offsetTop];
    console.log('Drawing...');
}

function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    [lastX, lastY] = [e.clientX + window.scrollX - canvas.offsetLeft, e.clientY + window.scrollY - canvas.offsetTop];
    ctx.lineTo(lastX, lastY);
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
}

function endDrawing() {
    isDrawing = false;
    console.log('End drawing');
}

console.log('Drawing tools loaded!');


const modeBtn = document.getElementById("mode-btn")
const destroyBtn = document.getElementById("destroy-btn")
const eraserBtn = document.getElementById("eraser-btn")
// arraylike 객체를 foreach 사용 위해 배열로 만들기
const colorOptions = Array.from(document.getElementsByClassName("color-option"))
const color = document.getElementById("color")
const lineWidth = document.getElementById("line-width")
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false; //평소 마우스를 클릭하지 않는 경우: false
let isFilling = false; //

////// 캔버스에 마우스로 그림그리기 ////////
function onMove(event) {
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    // 이전 선과 새로운 선의 연결 끊어주기
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}
// 마우스 클릭이 있는 경우 그림을 그리게 해줌
function startPainting(){
    isPainting = true; // 마우스를 클릭 시 true
}
// 마우스 클릭 떼는 경우 연필을 움직이게끔만
function cancelPainting(){
    isPainting = false; // 마우스 떼면 false
}


//////// 그림 그리는 선 굵기 조절 //////
function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

/////// 선 색상 직접 선택해 조절 /////////
function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

/////// 선 색상 정해진 색상 중 클릭해서 조절 //////////
function onColorClick(event) {
    const colorValue = event.target.dataset.color
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

/////// 채우기인지 그리기인지
function onModeClick(){
    // 그리기 모드
    if(isFilling){
        isFilling = false
        modeBtn.innerText = "Fill"
    }
    // 채우기 모드
    else{
        isFilling = true
        modeBtn.innerText = "Draw"
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    ctx.strokeStyle = "white"
    isFilling = false;
    modeBtn.innerText = "Fill";
}


canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
// 캔버스로부터 나간 경우 mouseup 이벤트가 발생되지 않아 발생하는 오류 해결법
// 1. document.addEventListener("mouseup", cancelPainting);
// 2. canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);


lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);


colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick)
eraserBtn.addEventListener("click", onEraserClick)
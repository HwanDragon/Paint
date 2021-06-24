const canvas = document.getElementById("canvas_view");
const range = document.getElementById("line_size_selector");
const colors = document.getElementsByClassName("colors");
const saveButton = document.getElementById("saveButton");
const loadImageButton = document.getElementById("loadImage");
const penButton = document.getElementById("pen");
const pipetteButton = document.getElementById("pipette");
const userColor = document.getElementById("user_color");
const resizeButton = document.getElementById("resizeButton");
const canvasWidth = document.getElementById("canvas_width");
const canvasHeight = document.getElementById("canvas_height");
const eraserCanvas = document.getElementById("eraserCanvas");
const fontSize = document.getElementById("fontSize");
const textContent = document.getElementById("textContent");
const text = document.getElementById("text");
let painting = false;
var sketchBook = new SketchBook(canvas);
const ctx = sketchBook.getContext();
ctx.strokeStyle = "#000000";
ctx.lineWidth = 2.5;
var canvasStatus = Drawing.Pen;

// 마우스 Move event
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    switch(canvasStatus) {
        case Drawing.Pipette:
        case Drawing.Non:
        {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        break;
        case Drawing.Pen:
        {
            if (painting == true) {
                ctx.lineTo(x, y);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
        }
        break; 
    }
};

// 마우스 Move down event
function onMouseDown(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    switch(canvasStatus) {
        case Drawing.Pen:
        {
            startPainting();
        }
        break; 
        case Drawing.Pipette:
        {
            var rgba = sketchBook.getPixelRgba(x, y);
            setUserStrokeColor(rgba.colorText());
        }
        break; 
        case Drawing.Text: 
        {
            ctx.font = fontSize.value + "px Arial";
            var text = textContent.value;
            ctx.strokeText(text, x, y);
        }
        break;
        default:
            break;
    }
    
};

// 마우스 Move up event
function onMouseUp(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    switch(canvasStatus) {
        case Drawing.Pen:
        {
            stopPainting();
        }
        break; 
        default:
            break;
    }
};

// 마우스 Move Leave event
function onMouseLeave(event) {
    switch(canvasStatus) {
        case Drawing.Pen:
        {
            stopPainting();
        }
        break; 
        default:
            break;
    }
}

// 선 그리기 중지
const stopPainting = () => {
    painting = false;
};
  
// 선 그리기 시작
const startPainting = () => {
    painting = true;
};

// 선색상 변경
function changeColor(event) {
    const color = event.target.style.backgroundColor;
    setUserStrokeColor(color);
}

// 펜 선택 이벤트
function onClickPen() {
    canvasStatus = Drawing.Pen;
}

// 스포이드 선택 이벤트
function onClickPipette () {
    canvasStatus = Drawing.Pipette;
}

function onClickText() {
    canvasStatus = Drawing.Text;
}

// Save 버튼 선택 이벤트
function onClickSave() {
    sketchBook.saveToImage();
}

// 이미지 로드 선택 이벤트
function onClickLoadImage(e) {
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            canvasWidth.value = img.width;
            canvasHeight.value = img.height;
            var context = canvas.getContext("2d");
            context.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);  
}

// 스케치북 리사이즈
function onClickResize() {
    sketchBook.resize(canvasWidth.value, canvasHeight.value);
}

function setUserStrokeColor(color) {
    ctx.strokeStyle = color;
    userColor.style.backgroundColor = color;
}

function onChangedRange(event) {
    var value = event.target.value;
    ctx.lineWidth = value;
}

function onClickClear() {
    sketchBook.clear();
}

// 초기화
function init() {
    canvas.width = canvasWidth.value;
    canvas.height = canvasHeight.value;
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);  // 추후에는 마우스 start 에서 이벤트 구분해서 함수호출하는식으로 변경
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    loadImageButton.addEventListener('change', onClickLoadImage, false);   // 이미지 로드 버튼 설정
    saveButton.addEventListener("click", onClickSave);    // 이미지 저장
    penButton.addEventListener("click", onClickPen);
    pipetteButton.addEventListener("click", onClickPipette);
    Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
    resizeButton.addEventListener("click", onClickResize);
    range.addEventListener("input", onChangedRange);
    eraserCanvas.addEventListener("click", onClickClear);
    text.addEventListener("click", onClickText);
}

// 캔버스 설정
if(canvas.getContext) {
    // 브라우저에서 캔버스 기능 지원
    init();
} else {
    // 브라우저에서 캔버스 기능 미지원
}
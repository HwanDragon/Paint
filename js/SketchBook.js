// Canvas HTMLCanvasElement의 입력으로 받음 (HTMLCanvasElement의 확장 클래스)
class SketchBook {
    constructor(canvas) {
        this.canvas = canvas;
    }

    // 컨텍스트 반환
    getContext() {
        return this.canvas.getContext("2d");
    }

    // 캔버스 내용 이미지로 저장
    saveToImage() {
        const link = document.createElement("a");
        link.download = "Paint.jpg";
        link.href = this.canvas.toDataURL();
        link.click();
    }

    // 캔버스의 x,y 위치에 픽셀 컬러값 가져오기
    getPixelRgba(x,y) {
        var canvasData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var width = this.canvas.width;
        var r = canvasData.data[(y*width +x) * 4];
        var g = canvasData.data[(y*width +x) * 4 + 1];
        var b = canvasData.data[(y*width +x) * 4 + 2];
        var a = canvasData.data[(y*width +x) * 4 + 3];
        return new RGBA(r,g,b,a);
    }

    // 캔버스 리사이즈
    resize(width, height) {
        var context = this.canvas.getContext("2d");
        let imageData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = width;
        this.canvas.height = height;
        context.putImageData(imageData, 0, 0);
    }

    clear() {
        var context = this.canvas.getContext("2d");
        // 픽셀 정리
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 컨텍스트 리셋
        context.beginPath();
    }
}



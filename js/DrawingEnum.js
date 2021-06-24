/*
    캔버스에서 작업 할 종류
 */
var Drawing = Object.freeze(
    {
        Non : 0,    // 아무작업도 안함
        Pen : 1,    // 펜 쓰기
        Fill : 2,   // 채우기
        Shape : 3,  // 도형 그리기
        Eraser : 4,  // 지우개
        Cut : 5,    // 잘라내기
        Pipette : 6, // 스포이드
        Text : 7,   // 텍스트 입력
    }
);

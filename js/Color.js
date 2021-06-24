// Color class
class Color {
    constructor(r,g,b,) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    colorText() {
        return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
    }
}

class RGBA extends Color {
    constructor (r,g,b,a) {
        super(r,g,b);
        this.a = a;
    }

    rgbaText() {
        return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
    }
}

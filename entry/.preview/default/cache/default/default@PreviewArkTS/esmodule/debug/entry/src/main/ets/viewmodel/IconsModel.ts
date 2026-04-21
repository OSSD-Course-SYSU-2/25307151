import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
import IconItem from "@bundle:com.example.animation/entry/ets/viewmodel/IconItem";
import Point from "@bundle:com.example.animation/entry/ets/viewmodel/Point";
const TWO_PI: number = 2 * Math.PI;
@Observed
export class IconsModel {
    public imagerArr: Array<IconItem> = [];
    private num: number = Common.IMAGES_MIN;
    private radius: number;
    constructor(num: number, radius: number) {
        this.radius = radius;
        this.addImage(num);
    }
    public addImage(num: number) {
        this.num = num;
        if (this.imagerArr.length === num) {
            return;
        }
        if (this.imagerArr.length > num) {
            this.imagerArr.splice(num, this.imagerArr.length - num);
        }
        else {
            for (let i = this.imagerArr.length; i < num; i++) {
                const point = this.genPointByIndex(i);
                // 使用模运算来循环使用图像资源，避免数组越界
                const imageIndex = i % Common.IMAGE_RESOURCE.length;
                this.imagerArr.push(new IconItem(i, Common.IMAGE_RESOURCE[imageIndex], false, point));
            }
        }
        this.refreshPoint(num);
    }
    public refreshPoint(num: number) {
        for (let i = 0; i < num; i++) {
            this.imagerArr[i].point = this.genPointByIndex(i);
        }
    }
    public genPointByIndex(index: number): Point {
        const x = this.radius * Math.cos(TWO_PI * index / this.num);
        const y = this.radius * Math.sin(TWO_PI * index / this.num);
        return new Point(x, y);
    }
    public reset() {
        for (let i = 0; i < this.num; i++) {
            if (this.imagerArr[i].clicked) {
                this.imagerArr[i].clicked = false;
            }
        }
    }
}

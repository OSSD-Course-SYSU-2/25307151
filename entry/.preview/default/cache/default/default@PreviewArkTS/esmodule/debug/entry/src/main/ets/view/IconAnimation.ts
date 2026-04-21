if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IconAnimation_Params {
    mainFlag?: boolean;
    item?: IconItem;
}
import type IconItem from '../viewmodel/IconItem';
import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
export class IconAnimation extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainFlag = new SynchedPropertySimpleTwoWayPU(params.mainFlag, this, "mainFlag");
        this.__item = new SynchedPropertyNesedObjectPU(params.item, this, "item");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IconAnimation_Params) {
        this.__item.set(params.item);
    }
    updateStateVars(params: IconAnimation_Params) {
        this.__item.set(params.item);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mainFlag.purgeDependencyOnElmtId(rmElmtId);
        this.__item.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mainFlag.aboutToBeDeleted();
        this.__item.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mainFlag: SynchedPropertySimpleTwoWayPU<boolean>;
    get mainFlag() {
        return this.__mainFlag.get();
    }
    set mainFlag(newValue: boolean) {
        this.__mainFlag.set(newValue);
    }
    private __item: SynchedPropertyNesedObjectPU<IconItem>;
    get item() {
        return this.__item.get();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.item.image);
            Image.debugLine("entry/src/main/ets/view/IconAnimation.ets(25:5)", "entry");
            Context.animation({
                delay: Common.DELAY_10,
                duration: Common.DURATION_1000,
                iterations: 1,
                curve: Curve.Smooth,
                playMode: PlayMode.Normal
            });
            Image.width(Common.ICON_WIDTH);
            Image.height(Common.ICON_HEIGHT);
            Image.objectFit(ImageFit.Contain);
            Image.translate(this.mainFlag ? { x: this.item.point.x, y: this.item.point.y } : { x: 0, y: 0 });
            Image.rotate({
                x: 0,
                y: 1,
                z: 0,
                angle: this.item.clicked ? Common.ROTATE_ANGLE_360 : 0
            });
            Image.scale(this.item.clicked ? { x: Common.SCALE_RATIO, y: Common.SCALE_RATIO } : { x: 1, y: 1 });
            Image.opacity(this.item.clicked ? Common.OPACITY_06 : 1);
            Image.onClick(() => {
                this.item.clicked = !this.item.clicked;
            });
            Context.animation(null);
        }, Image);
    }
    rerender() {
        this.updateDirtyElements();
    }
}

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CountController_Params {
    quantity?: number;
}
import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
function __Text__textStyle(): void {
    Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
    Text.fontWeight(Common.FONT_WEIGHT_500);
}
export class CountController extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__quantity = new SynchedPropertySimpleTwoWayPU(params.quantity, this, "quantity");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CountController_Params) {
    }
    updateStateVars(params: CountController_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__quantity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__quantity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __quantity: SynchedPropertySimpleTwoWayPU<number>;
    get quantity() {
        return this.__quantity.get();
    }
    set quantity(newValue: number) {
        this.__quantity.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/CountController.ets(13:5)", "entry");
            Column.height(Common.CONTROLLER_WIDTH);
            Column.padding({
                top: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
                bottom: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
                left: { "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
                right: { "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" }
            });
            Column.margin({
                bottom: { "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" }
            });
            Column.width(Common.CONTROLLER_HEIGHT);
            Column.borderRadius({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/CountController.ets(14:7)", "entry");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(Common.DEFAULT_FULL_WIDTH);
            Row.margin({
                top: { "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/CountController.ets(15:9)", "entry");
            __Text__textStyle();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.quantity.toFixed(0));
            Text.debugLine("entry/src/main/ets/view/CountController.ets(18:9)", "entry");
            __Text__textStyle();
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: this.quantity,
                min: Common.IMAGES_MIN,
                max: Common.IMAGES_TOTAL,
                step: 1,
                style: SliderStyle.InSet
            });
            Slider.debugLine("entry/src/main/ets/view/CountController.ets(28:7)", "entry");
            Slider.blockColor(Color.White);
            Slider.selectedColor({ "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Slider.margin({
                top: { "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" }
            });
            Slider.showSteps(true);
            Slider.trackThickness({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Slider.onChange((value: number) => {
                this.quantity = value;
            });
        }, Slider);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

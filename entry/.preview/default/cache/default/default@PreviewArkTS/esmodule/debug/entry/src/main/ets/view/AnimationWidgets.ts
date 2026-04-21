if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AnimationWidgets_Params {
    mainFlag?: boolean;
    quantity?: number;
    iconModel?: IconsModel;
}
import type { IconsModel } from '../viewmodel/IconsModel';
import { IconAnimation } from "@bundle:com.example.animation/entry/ets/view/IconAnimation";
import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
import type IconItem from '../viewmodel/IconItem';
export class AnimationWidgets extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mainFlag = new ObservedPropertySimplePU(false, this, "mainFlag");
        this.__quantity = new SynchedPropertySimpleTwoWayPU(params.quantity, this, "quantity");
        this.__iconModel = this.initializeConsume("iconModel", "iconModel");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("quantity", this.onQuantityChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AnimationWidgets_Params) {
        if (params.mainFlag !== undefined) {
            this.mainFlag = params.mainFlag;
        }
    }
    updateStateVars(params: AnimationWidgets_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mainFlag.purgeDependencyOnElmtId(rmElmtId);
        this.__quantity.purgeDependencyOnElmtId(rmElmtId);
        this.__iconModel.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mainFlag.aboutToBeDeleted();
        this.__quantity.aboutToBeDeleted();
        this.__iconModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mainFlag: ObservedPropertySimplePU<boolean>;
    get mainFlag() {
        return this.__mainFlag.get();
    }
    set mainFlag(newValue: boolean) {
        this.__mainFlag.set(newValue);
    }
    private __quantity: SynchedPropertySimpleTwoWayPU<number>;
    get quantity() {
        return this.__quantity.get();
    }
    set quantity(newValue: number) {
        this.__quantity.set(newValue);
    }
    private __iconModel: ObservedPropertyAbstractPU<IconsModel>;
    get iconModel() {
        return this.__iconModel.get();
    }
    set iconModel(newValue: IconsModel) {
        this.__iconModel.set(newValue);
    }
    onQuantityChange() {
        this.iconModel.addImage(this.quantity);
    }
    aboutToAppear() {
        this.onQuantityChange();
    }
    animate() {
        this.getUIContext().animateTo({
            delay: Common.DELAY_10,
            tempo: Common.TEMPO,
            iterations: 1,
            duration: Common.DURATION_500,
            curve: Curve.Smooth,
            playMode: PlayMode.Normal
        }, () => {
            this.mainFlag = !this.mainFlag;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/view/AnimationWidgets.ets(50:5)", "entry");
            Stack.width(Common.DEFAULT_FULL_WIDTH);
            Stack.layoutWeight(1);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/view/AnimationWidgets.ets(51:7)", "entry");
            Stack.width(Common.DEFAULT_FULL_WIDTH);
            Stack.height(Common.DEFAULT_FULL_HEIGHT);
            Stack.rotate({
                x: 0,
                y: 0,
                z: 1,
                angle: this.mainFlag ? Common.ROTATE_ANGLE_360 : 0
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new IconAnimation(this, {
                                item: item,
                                mainFlag: this.__mainFlag
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/AnimationWidgets.ets", line: 53, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    item: item,
                                    mainFlag: this.mainFlag
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                item: item
                            });
                        }
                    }, { name: "IconAnimation" });
                }
            };
            this.forEachUpdateFunction(elmtId, this.iconModel.imagerArr, forEachItemGenFunction, (item: IconItem) => JSON.stringify(item.index), false, false);
        }, ForEach);
        ForEach.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.mainFlag ? { "id": 16777218, "type": 20000, params: [], "bundleName": "com.example.animation", "moduleName": "entry" } : { "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/AnimationWidgets.ets(68:7)", "entry");
            Image.width({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Image.height({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
            Image.scale({
                x: this.mainFlag ? Common.INIT_SCALE : 1,
                y: this.mainFlag ? Common.INIT_SCALE : 1
            });
            Image.onClick(() => {
                this.iconModel.reset();
                this.animate();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/AnimationWidgets.ets(81:7)", "entry");
            Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Text.opacity(Common.OPACITY_06);
            Text.fontColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Text.fontWeight(Common.FONT_WEIGHT_500);
            Text.margin({
                top: { "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" }
            });
        }, Text);
        Text.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

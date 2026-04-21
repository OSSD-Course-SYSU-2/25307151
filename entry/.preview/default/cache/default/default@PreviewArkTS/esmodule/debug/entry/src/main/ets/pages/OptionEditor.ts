if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface OptionEditor_Params {
    optionTexts?: string[];
    quantity?: number;
}
import router from "@ohos:router";
class OptionEditor extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__optionTexts = new ObservedPropertyObjectPU([], this, "optionTexts");
        this.__quantity = new ObservedPropertySimplePU(3, this, "quantity");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: OptionEditor_Params) {
        if (params.optionTexts !== undefined) {
            this.optionTexts = params.optionTexts;
        }
        if (params.quantity !== undefined) {
            this.quantity = params.quantity;
        }
    }
    updateStateVars(params: OptionEditor_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__optionTexts.purgeDependencyOnElmtId(rmElmtId);
        this.__quantity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__optionTexts.aboutToBeDeleted();
        this.__quantity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __optionTexts: ObservedPropertyObjectPU<string[]>;
    get optionTexts() {
        return this.__optionTexts.get();
    }
    set optionTexts(newValue: string[]) {
        this.__optionTexts.set(newValue);
    }
    private __quantity: ObservedPropertySimplePU<number>;
    get quantity() {
        return this.__quantity.get();
    }
    set quantity(newValue: number) {
        this.__quantity.set(newValue);
    }
    aboutToAppear() {
        // 获取传递过来的参数
        const params = router.getParams() as Record<string, Object>;
        if (params) {
            this.quantity = params['quantity'] as number;
            this.optionTexts = params['optionTexts'] as string[];
        }
    }
    aboutToDisappear() {
        // 页面销毁时的清理工作
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/OptionEditor.ets(24:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Text.create('编辑选项文本');
            Text.debugLine("entry/src/main/ets/pages/OptionEditor.ets(26:7)", "entry");
            // 标题
            Text.fontSize(24);
            // 标题
            Text.fontWeight(FontWeight.Bold);
            // 标题
            Text.fontColor('#333333');
            // 标题
            Text.margin({ top: 20, bottom: 20 });
        }, Text);
        // 标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 选项列表
            List.create();
            List.debugLine("entry/src/main/ets/pages/OptionEditor.ets(33:7)", "entry");
            // 选项列表
            List.width('100%');
            // 选项列表
            List.layoutWeight(1);
            // 选项列表
            List.margin({ top: 10 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/pages/OptionEditor.ets(35:11)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/OptionEditor.ets(36:13)", "entry");
                            Row.width('100%');
                            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(`${index + 1}.`);
                            Text.debugLine("entry/src/main/ets/pages/OptionEditor.ets(37:15)", "entry");
                            Text.fontSize(18);
                            Text.fontColor('#666666');
                            Text.width(40);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            TextInput.create({ text: item });
                            TextInput.debugLine("entry/src/main/ets/pages/OptionEditor.ets(42:15)", "entry");
                            TextInput.width('100%');
                            TextInput.height(50);
                            TextInput.fontSize(16);
                            TextInput.backgroundColor('#F5F5F5');
                            TextInput.borderRadius(8);
                            TextInput.padding({ left: 12, right: 12 });
                            TextInput.onChange((value: string) => {
                                this.optionTexts[index] = value;
                            });
                        }, TextInput);
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.optionTexts, forEachItemGenFunction, (item: string, index: number) => index.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        // 选项列表
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 按钮区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/OptionEditor.ets(63:7)", "entry");
            // 按钮区域
            Row.width('100%');
            // 按钮区域
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 按钮区域
            Row.padding({ left: 16, right: 16 });
            // 按钮区域
            Row.margin({ top: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.debugLine("entry/src/main/ets/pages/OptionEditor.ets(64:9)", "entry");
            Button.width('45%');
            Button.height(50);
            Button.fontSize(18);
            Button.backgroundColor('#CCCCCC');
            Button.fontColor('#333333');
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('保存');
            Button.debugLine("entry/src/main/ets/pages/OptionEditor.ets(74:9)", "entry");
            Button.width('45%');
            Button.height(50);
            Button.fontSize(18);
            Button.backgroundColor({ "id": 16777262, "type": 10001, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Button.fontColor(Color.White);
            Button.onClick(() => {
                // 使用AppStorage保存数据
                AppStorage.setOrCreate('editedOptionTexts', ObservedObject.GetRawObject(this.optionTexts));
                router.back();
            });
        }, Button);
        Button.pop();
        // 按钮区域
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "OptionEditor";
    }
}
registerNamedRoute(() => new OptionEditor(undefined, {}), "", { bundleName: "com.example.animation", moduleName: "entry", pagePath: "pages/OptionEditor", pageFullPath: "entry/src/main/ets/pages/OptionEditor", integratedHsp: "false", moduleType: "followWithHap" });

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    quantity?: number;
    optionTexts?: string[];
    isVoiceListening?: boolean;
    voiceStatus?: string;
    voiceService?: VoiceRecognitionService;
    audioService?: AudioPlayerService;
}
import { Wheel } from "@bundle:com.example.animation/entry/ets/view/Wheel";
import { CountController } from "@bundle:com.example.animation/entry/ets/view/CountController";
import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
import router from "@ohos:router";
import { VoiceRecognitionService } from "@bundle:com.example.animation/entry/ets/service/VoiceRecognitionService";
import { AudioPlayerService } from "@bundle:com.example.animation/entry/ets/service/AudioPlayerService";
import type common from "@ohos:app.ability.common";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__quantity = new ObservedPropertySimplePU(Common.IMAGES_MIN, this, "quantity");
        this.__optionTexts = new ObservedPropertyObjectPU([], this, "optionTexts");
        this.__isVoiceListening = new ObservedPropertySimplePU(false, this, "isVoiceListening");
        this.__voiceStatus = new ObservedPropertySimplePU('未启动', this, "voiceStatus");
        this.voiceService = new VoiceRecognitionService();
        this.audioService = new AudioPlayerService();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.quantity !== undefined) {
            this.quantity = params.quantity;
        }
        if (params.optionTexts !== undefined) {
            this.optionTexts = params.optionTexts;
        }
        if (params.isVoiceListening !== undefined) {
            this.isVoiceListening = params.isVoiceListening;
        }
        if (params.voiceStatus !== undefined) {
            this.voiceStatus = params.voiceStatus;
        }
        if (params.voiceService !== undefined) {
            this.voiceService = params.voiceService;
        }
        if (params.audioService !== undefined) {
            this.audioService = params.audioService;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__quantity.purgeDependencyOnElmtId(rmElmtId);
        this.__optionTexts.purgeDependencyOnElmtId(rmElmtId);
        this.__isVoiceListening.purgeDependencyOnElmtId(rmElmtId);
        this.__voiceStatus.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__quantity.aboutToBeDeleted();
        this.__optionTexts.aboutToBeDeleted();
        this.__isVoiceListening.aboutToBeDeleted();
        this.__voiceStatus.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __quantity: ObservedPropertySimplePU<number>;
    get quantity() {
        return this.__quantity.get();
    }
    set quantity(newValue: number) {
        this.__quantity.set(newValue);
    }
    private __optionTexts: ObservedPropertyObjectPU<string[]>;
    get optionTexts() {
        return this.__optionTexts.get();
    }
    set optionTexts(newValue: string[]) {
        this.__optionTexts.set(newValue);
    }
    private __isVoiceListening: ObservedPropertySimplePU<boolean>;
    get isVoiceListening() {
        return this.__isVoiceListening.get();
    }
    set isVoiceListening(newValue: boolean) {
        this.__isVoiceListening.set(newValue);
    }
    private __voiceStatus: ObservedPropertySimplePU<string>;
    get voiceStatus() {
        return this.__voiceStatus.get();
    }
    set voiceStatus(newValue: string) {
        this.__voiceStatus.set(newValue);
    }
    private voiceService: VoiceRecognitionService;
    private audioService: AudioPlayerService;
    aboutToAppear() {
        // 初始化选项文本
        this.initOptionTexts();
        // 初始化音频服务
        const context = getContext(this) as common.UIAbilityContext;
        this.audioService.init(context);
    }
    aboutToDisappear() {
        // 释放资源
        this.voiceService.destroy();
        this.audioService.release();
    }
    aboutToForeground() {
        // 页面重新进入前台时，检查是否有编辑后的数据
        const editedTexts = AppStorage.get<string[]>('editedOptionTexts');
        if (editedTexts && editedTexts.length > 0) {
            // 更新选项文本
            for (let i = 0; i < editedTexts.length; i++) {
                this.optionTexts[i] = editedTexts[i];
            }
            // 清除临时存储
            AppStorage.delete('editedOptionTexts');
        }
    }
    initOptionTexts() {
        this.optionTexts = [];
        for (let i = 0; i < Common.IMAGES_TOTAL; i++) {
            this.optionTexts.push(`选项${i + 1}`);
        }
    }
    // 启动语音识别
    async startVoiceRecognition() {
        this.voiceStatus = '正在启动...';
        const success = await this.voiceService.startListening(() => {
            // 检测到触发词"释怀"时的回调
            this.onTriggerWordDetected();
        });
        if (success) {
            this.isVoiceListening = true;
            this.voiceStatus = '正在监听中';
        }
        else {
            this.voiceStatus = '启动失败';
        }
    }
    // 停止语音识别
    stopVoiceRecognition() {
        this.voiceService.stopListening();
        this.isVoiceListening = false;
        this.voiceStatus = '已停止';
    }
    // 检测到触发词
    async onTriggerWordDetected() {
        console.info('Index: Trigger word "释怀" detected!');
        this.voiceStatus = '检测到"释怀"！播放音乐...';
        try {
            // 播放音频文件
            // 注意：你需要将音频文件放在 entry/src/main/resources/rawfile/ 目录下
            // 文件名需要替换为你实际的音频文件名
            // 例如：await this.audioService.playFromRawFile('guanyu_song.mp3');
            // 这里使用一个示例文件名，请替换为你的实际文件
            await this.audioService.playFromRawFile('trigger_sound.mp3');
            // 播放完成后恢复监听状态
            setTimeout(() => {
                if (this.isVoiceListening) {
                    this.voiceStatus = '正在监听中';
                }
            }, 3000);
        }
        catch (error) {
            console.error(`Index: Failed to play audio - ${error}`);
            this.voiceStatus = '播放失败';
        }
    }
    // 转盘旋转完成回调
    async onWheelSpinComplete(selectedIndex: number) {
        console.info(`Index: Wheel spin completed, selected index: ${selectedIndex}`);
        const selectedOption = this.optionTexts[selectedIndex] || `选项${selectedIndex + 1}`;
        console.info(`Index: Selected option: ${selectedOption}`);
        // 自动播放音频
        try {
            console.info('Index: Auto-playing audio after spin complete');
            await this.audioService.playFromRawFile('trigger_sound.mp3');
        }
        catch (error) {
            console.error(`Index: Failed to play audio after spin - ${error}`);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(133:5)", "entry");
            Column.width(Common.DEFAULT_FULL_WIDTH);
            Column.height(Common.DEFAULT_FULL_HEIGHT);
            Column.backgroundColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Wheel(this, {
                        quantity: this.__quantity,
                        optionTexts: this.__optionTexts,
                        onSpinComplete: (index: number) => {
                            this.onWheelSpinComplete(index);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 134, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            quantity: this.quantity,
                            optionTexts: this.optionTexts,
                            onSpinComplete: (index: number) => {
                                this.onWheelSpinComplete(index);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "Wheel" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CountController(this, {
                        quantity: this.__quantity
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 142, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            quantity: this.quantity
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "CountController" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 编辑选项按钮
            Button.createWithLabel('编辑选项文本');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(147:7)", "entry");
            // 编辑选项按钮
            Button.width('60%');
            // 编辑选项按钮
            Button.height(50);
            // 编辑选项按钮
            Button.fontSize(18);
            // 编辑选项按钮
            Button.backgroundColor('#FF9800');
            // 编辑选项按钮
            Button.fontColor(Color.White);
            // 编辑选项按钮
            Button.margin({ top: 20 });
            // 编辑选项按钮
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/OptionEditor',
                    params: {
                        quantity: this.quantity,
                        optionTexts: this.optionTexts.slice(0, this.quantity)
                    }
                });
            });
        }, Button);
        // 编辑选项按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 语音识别控制区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(165:7)", "entry");
            // 语音识别控制区域
            Row.width('80%');
            // 语音识别控制区域
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 语音识别控制区域
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isVoiceListening ? '停止监听' : '开始监听');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(166:9)", "entry");
            Button.width('45%');
            Button.height(50);
            Button.fontSize(16);
            Button.backgroundColor(this.isVoiceListening ? '#F44336' : '#4CAF50');
            Button.fontColor(Color.White);
            Button.onClick(() => {
                if (this.isVoiceListening) {
                    this.stopVoiceRecognition();
                }
                else {
                    this.startVoiceRecognition();
                }
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('测试播放');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(180:9)", "entry");
            Button.width('45%');
            Button.height(50);
            Button.fontSize(16);
            Button.backgroundColor('#2196F3');
            Button.fontColor(Color.White);
            Button.onClick(async () => {
                try {
                    await this.audioService.playFromRawFile('trigger_sound.mp3');
                }
                catch (error) {
                    console.error(`Test play failed: ${error}`);
                }
            });
        }, Button);
        Button.pop();
        // 语音识别控制区域
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.animation", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });

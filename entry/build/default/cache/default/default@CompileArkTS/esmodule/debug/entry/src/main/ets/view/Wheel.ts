if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Wheel_Params {
    quantity?: number;
    optionTexts?: string[];
    isSpinningState?: boolean;
    spinTrigger?: number;
    destinyTrigger?: number;
    destinyTargetIndex?: number;
    rotateAngle?: number;
    isSpinning?: boolean;
    selectedIndex?: number;
    canvasReady?: boolean;
    currentOption?: string;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    wheelRadius?: number;
    colors?: string[];
    updateTimer?: number;
    onSpinComplete?: (selectedIndex: number) => void;
    onSpinStateChange?: (isSpinning: boolean) => void;
}
import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
export class Wheel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__quantity = new SynchedPropertySimpleTwoWayPU(params.quantity, this, "quantity");
        this.__optionTexts = new SynchedPropertyObjectTwoWayPU(params.optionTexts, this, "optionTexts");
        this.__isSpinningState = new SynchedPropertySimpleTwoWayPU(params.isSpinningState, this, "isSpinningState");
        this.__spinTrigger = new SynchedPropertySimpleTwoWayPU(params.spinTrigger, this, "spinTrigger");
        this.__destinyTrigger = new SynchedPropertySimpleTwoWayPU(params.destinyTrigger, this, "destinyTrigger");
        this.__destinyTargetIndex = new SynchedPropertySimpleTwoWayPU(params.destinyTargetIndex, this, "destinyTargetIndex");
        this.__rotateAngle = new ObservedPropertySimplePU(0, this, "rotateAngle");
        this.__isSpinning = new ObservedPropertySimplePU(false, this, "isSpinning");
        this.__selectedIndex = new ObservedPropertySimplePU(-1, this, "selectedIndex");
        this.__canvasReady = new ObservedPropertySimplePU(false, this, "canvasReady");
        this.__currentOption = new ObservedPropertySimplePU('等待开始', this, "currentOption");
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.wheelRadius = 150;
        this.colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
            '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF6B35',
            '#1DD1A1', '#F368E0', '#FF9F43', '#EE5A24', '#00B894'
        ];
        this.updateTimer = -1;
        this.onSpinComplete = undefined;
        this.onSpinStateChange = undefined;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("quantity", this.onQuantityChange);
        this.declareWatch("spinTrigger", this.onSpinTrigger);
        this.declareWatch("destinyTrigger", this.onDestinyTrigger);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Wheel_Params) {
        if (params.rotateAngle !== undefined) {
            this.rotateAngle = params.rotateAngle;
        }
        if (params.isSpinning !== undefined) {
            this.isSpinning = params.isSpinning;
        }
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
        if (params.canvasReady !== undefined) {
            this.canvasReady = params.canvasReady;
        }
        if (params.currentOption !== undefined) {
            this.currentOption = params.currentOption;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.wheelRadius !== undefined) {
            this.wheelRadius = params.wheelRadius;
        }
        if (params.colors !== undefined) {
            this.colors = params.colors;
        }
        if (params.updateTimer !== undefined) {
            this.updateTimer = params.updateTimer;
        }
        if (params.onSpinComplete !== undefined) {
            this.onSpinComplete = params.onSpinComplete;
        }
        if (params.onSpinStateChange !== undefined) {
            this.onSpinStateChange = params.onSpinStateChange;
        }
    }
    updateStateVars(params: Wheel_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__quantity.purgeDependencyOnElmtId(rmElmtId);
        this.__optionTexts.purgeDependencyOnElmtId(rmElmtId);
        this.__isSpinningState.purgeDependencyOnElmtId(rmElmtId);
        this.__spinTrigger.purgeDependencyOnElmtId(rmElmtId);
        this.__destinyTrigger.purgeDependencyOnElmtId(rmElmtId);
        this.__destinyTargetIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__rotateAngle.purgeDependencyOnElmtId(rmElmtId);
        this.__isSpinning.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__canvasReady.purgeDependencyOnElmtId(rmElmtId);
        this.__currentOption.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__quantity.aboutToBeDeleted();
        this.__optionTexts.aboutToBeDeleted();
        this.__isSpinningState.aboutToBeDeleted();
        this.__spinTrigger.aboutToBeDeleted();
        this.__destinyTrigger.aboutToBeDeleted();
        this.__destinyTargetIndex.aboutToBeDeleted();
        this.__rotateAngle.aboutToBeDeleted();
        this.__isSpinning.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__canvasReady.aboutToBeDeleted();
        this.__currentOption.aboutToBeDeleted();
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
    private __optionTexts: SynchedPropertySimpleOneWayPU<string[]>; // 选项文本数组
    get optionTexts() {
        return this.__optionTexts.get();
    }
    set optionTexts(newValue: string[]) {
        this.__optionTexts.set(newValue);
    }
    private __isSpinningState: SynchedPropertySimpleTwoWayPU<boolean>; // 暴露旋转状态给父组件
    get isSpinningState() {
        return this.__isSpinningState.get();
    }
    set isSpinningState(newValue: boolean) {
        this.__isSpinningState.set(newValue);
    }
    private __spinTrigger: SynchedPropertySimpleTwoWayPU<number>; // 旋转触发器（改变时触发旋转）
    get spinTrigger() {
        return this.__spinTrigger.get();
    }
    set spinTrigger(newValue: number) {
        this.__spinTrigger.set(newValue);
    }
    private __destinyTrigger: SynchedPropertySimpleTwoWayPU<number>; // 天意触发器
    get destinyTrigger() {
        return this.__destinyTrigger.get();
    }
    set destinyTrigger(newValue: number) {
        this.__destinyTrigger.set(newValue);
    }
    private __destinyTargetIndex: SynchedPropertySimpleTwoWayPU<number>; // 天意目标选项索引
    get destinyTargetIndex() {
        return this.__destinyTargetIndex.get();
    }
    set destinyTargetIndex(newValue: number) {
        this.__destinyTargetIndex.set(newValue);
    }
    private __rotateAngle: ObservedPropertySimplePU<number>;
    get rotateAngle() {
        return this.__rotateAngle.get();
    }
    set rotateAngle(newValue: number) {
        this.__rotateAngle.set(newValue);
    }
    private __isSpinning: ObservedPropertySimplePU<boolean>;
    get isSpinning() {
        return this.__isSpinning.get();
    }
    set isSpinning(newValue: boolean) {
        this.__isSpinning.set(newValue);
    }
    private __selectedIndex: ObservedPropertySimplePU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __canvasReady: ObservedPropertySimplePU<boolean>; // 标记canvas是否准备好
    get canvasReady() {
        return this.__canvasReady.get();
    }
    set canvasReady(newValue: boolean) {
        this.__canvasReady.set(newValue);
    }
    private __currentOption: ObservedPropertySimplePU<string>; // 当前指针指向的选项
    get currentOption() {
        return this.__currentOption.get();
    }
    set currentOption(newValue: string) {
        this.__currentOption.set(newValue);
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private wheelRadius: number;
    private colors: string[];
    private updateTimer: number; // 定时器ID
    private onSpinComplete?: (selectedIndex: number) => void; // 旋转完成回调
    private onSpinStateChange?: (isSpinning: boolean) => void; // 旋转状态变化回调
    // 暴露给父组件的方法
    startSpin() {
        this.spin();
    }
    onQuantityChange() {
        this.selectedIndex = -1;
        this.rotateAngle = 0; // 重置旋转角度
        // 数量变化时重新绘制转盘
        if (this.canvasReady) {
            this.drawWheel();
        }
    }
    // 监听旋转触发器
    onSpinTrigger() {
        if (this.spinTrigger > 0) {
            this.spin();
        }
    }
    // 监听天意触发器
    onDestinyTrigger() {
        if (this.destinyTrigger > 0 && this.destinyTargetIndex >= 0) {
            this.spinToTarget(this.destinyTargetIndex);
        }
    }
    // 绘制转盘
    drawWheel() {
        if (!this.context) {
            return;
        }
        const centerX = this.wheelRadius;
        const centerY = this.wheelRadius;
        const anglePerSection = 2 * Math.PI / this.quantity;
        // 清空画布
        this.context.clearRect(0, 0, this.wheelRadius * 2, this.wheelRadius * 2);
        // 根据选项数量动态调整字体大小
        const fontSize = this.quantity > 10 ? 14 : (this.quantity > 6 ? 16 : 20);
        const textRadius = this.quantity > 10 ? this.wheelRadius - 40 : (this.quantity > 6 ? this.wheelRadius - 45 : this.wheelRadius - 50);
        // 绘制每个扇形
        for (let i = 0; i < this.quantity; i++) {
            const startAngle = i * anglePerSection - Math.PI / 2;
            const endAngle = startAngle + anglePerSection;
            // 绘制扇形
            this.context.beginPath();
            this.context.moveTo(centerX, centerY);
            this.context.arc(centerX, centerY, this.wheelRadius - 10, startAngle, endAngle);
            this.context.closePath();
            this.context.fillStyle = this.colors[i % this.colors.length];
            this.context.fill();
            // 绘制边框
            this.context.strokeStyle = '#FFFFFF';
            this.context.lineWidth = 2;
            this.context.stroke();
            // 绘制文字
            const textAngle = startAngle + anglePerSection / 2;
            const textX = centerX + textRadius * Math.cos(textAngle);
            const textY = centerY + textRadius * Math.sin(textAngle);
            this.context.save();
            this.context.translate(textX, textY);
            this.context.rotate(textAngle + Math.PI / 2);
            this.context.fillStyle = '#FFFFFF';
            this.context.font = `${fontSize}px sans-serif`;
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.fillText(this.optionTexts[i] || `选项${i + 1}`, 0, 0);
            this.context.restore();
        }
        // 绘制中心圆
        this.context.beginPath();
        this.context.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        this.context.fillStyle = '#FFFFFF';
        this.context.fill();
        this.context.strokeStyle = '#333333';
        this.context.lineWidth = 3;
        this.context.stroke();
    }
    // 根据当前角度计算指针指向的选项
    getCurrentOption(angle: number): string {
        const anglePerSection = 360 / this.quantity;
        // 指针在顶部，需要计算转盘旋转后指针指向的位置
        // 指针指向的角度 = 360 - (angle % 360)
        const pointerAngle = (360 - (angle % 360)) % 360;
        // 计算是第几个选项（从顶部顺时针方向）
        const optionIndex = Math.floor(pointerAngle / anglePerSection);
        return this.optionTexts[optionIndex] || `选项${optionIndex + 1}`;
    }
    // 开始旋转
    spin() {
        if (this.isSpinning) {
            return;
        }
        this.isSpinning = true;
        this.isSpinningState = true; // 同步状态给父组件
        if (this.onSpinStateChange) {
            this.onSpinStateChange(true);
        }
        this.selectedIndex = -1;
        this.currentOption = '旋转中...';
        // 随机选择结果（每个选项机会均等）
        const targetIndex = Math.floor(Math.random() * this.quantity);
        const anglePerSection = 360 / this.quantity;
        // 计算目标角度（多转几圈 + 目标位置）
        const extraRotations = 5 + Math.floor(Math.random() * 3); // 5-7圈
        const targetAngle = extraRotations * 360 + (360 - targetIndex * anglePerSection - anglePerSection / 2);
        // 启动定时器，每50ms更新一次当前选项
        let currentAngle = 0;
        const startAngle = 0;
        const angleStep = (targetAngle - startAngle) / 80; // 4000ms / 50ms = 80次
        this.updateTimer = setInterval(() => {
            currentAngle += angleStep;
            if (currentAngle >= targetAngle) {
                clearInterval(this.updateTimer);
                this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
            }
            else {
                this.currentOption = this.getCurrentOption(currentAngle);
            }
        }, 50);
        // 使用动画
        this.getUIContext().animateTo({
            duration: 4000,
            curve: Curve.EaseOut,
            onFinish: () => {
                this.isSpinning = false;
                this.isSpinningState = false; // 同步状态给父组件
                if (this.onSpinStateChange) {
                    this.onSpinStateChange(false);
                }
                this.selectedIndex = targetIndex;
                this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
                // 清除定时器
                if (this.updateTimer !== -1) {
                    clearInterval(this.updateTimer);
                    this.updateTimer = -1;
                }
                // 调用旋转完成回调
                if (this.onSpinComplete) {
                    this.onSpinComplete(targetIndex);
                }
            }
        }, () => {
            this.rotateAngle = targetAngle;
        });
    }
    // 旋转到指定目标（天意功能）
    spinToTarget(targetIndex: number) {
        if (this.isSpinning) {
            return;
        }
        if (targetIndex < 0 || targetIndex >= this.quantity) {
            return;
        }
        this.isSpinning = true;
        this.isSpinningState = true; // 同步状态给父组件
        if (this.onSpinStateChange) {
            this.onSpinStateChange(true);
        }
        this.selectedIndex = -1;
        this.currentOption = '天意降临...';
        const anglePerSection = 360 / this.quantity;
        // 计算目标角度（多转几圈 + 目标位置）
        const extraRotations = 5 + Math.floor(Math.random() * 3); // 5-7圈
        const targetAngle = extraRotations * 360 + (360 - targetIndex * anglePerSection - anglePerSection / 2);
        // 启动定时器，每50ms更新一次当前选项
        let currentAngle = 0;
        const startAngle = 0;
        const angleStep = (targetAngle - startAngle) / 80; // 4000ms / 50ms = 80次
        this.updateTimer = setInterval(() => {
            currentAngle += angleStep;
            if (currentAngle >= targetAngle) {
                clearInterval(this.updateTimer);
                this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
            }
            else {
                this.currentOption = this.getCurrentOption(currentAngle);
            }
        }, 50);
        // 使用动画
        this.getUIContext().animateTo({
            duration: 4000,
            curve: Curve.EaseOut,
            onFinish: () => {
                this.isSpinning = false;
                this.isSpinningState = false; // 同步状态给父组件
                if (this.onSpinStateChange) {
                    this.onSpinStateChange(false);
                }
                this.selectedIndex = targetIndex;
                this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
                // 清除定时器
                if (this.updateTimer !== -1) {
                    clearInterval(this.updateTimer);
                    this.updateTimer = -1;
                }
                // 调用旋转完成回调
                if (this.onSpinComplete) {
                    this.onSpinComplete(targetIndex);
                }
            }
        }, () => {
            this.rotateAngle = targetAngle;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(Common.DEFAULT_FULL_WIDTH);
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 当前选项显示框
            Column.create();
            // 当前选项显示框
            Column.width('80%');
            // 当前选项显示框
            Column.height(60);
            // 当前选项显示框
            Column.justifyContent(FlexAlign.Center);
            // 当前选项显示框
            Column.backgroundColor('#FFFFFF');
            // 当前选项显示框
            Column.borderRadius(12);
            // 当前选项显示框
            Column.shadow({ radius: 8, color: '#40000000', offsetX: 0, offsetY: 2 });
            // 当前选项显示框
            Column.margin({ top: 20, bottom: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentOption);
            Text.fontSize(24);
            Text.fontColor(this.isSpinning ? '#FF6B6B' : '#333333');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        // 当前选项显示框
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(this.wheelRadius * 2);
            Stack.height(this.wheelRadius * 2);
            Stack.margin({ top: 10 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Canvas.create(this.context);
            Canvas.width(this.wheelRadius * 2);
            Canvas.height(this.wheelRadius * 2);
            Canvas.onReady(() => {
                this.canvasReady = true;
                this.drawWheel();
            });
            Canvas.rotate({ angle: this.rotateAngle });
        }, Canvas);
        Canvas.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 指针
            Column.create();
            // 指针
            Column.width(4);
            // 指针
            Column.height(40);
            // 指针
            Column.backgroundColor('#FF0000');
            // 指针
            Column.position({ x: this.wheelRadius - 2, y: 0 });
        }, Column);
        // 指针
        Column.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 结果显示
            if (this.selectedIndex >= 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`恭喜选中：选项${this.selectedIndex + 1}`);
                        Text.fontSize(20);
                        Text.fontColor('#333333');
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

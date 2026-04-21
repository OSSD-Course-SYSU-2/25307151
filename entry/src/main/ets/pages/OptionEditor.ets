import Common from '../common/constants/Const';
import router from '@ohos.router';

@Entry
@Component
struct OptionEditor {
  @State optionTexts: string[] = [];
  @State quantity: number = 3;

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

  build() {
    Column() {
      // 标题
      Text('编辑选项文本')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ top: 20, bottom: 20 })

      // 选项列表
      List() {
        ForEach(this.optionTexts, (item: string, index: number) => {
          ListItem() {
            Row() {
              Text(`${index + 1}.`)
                .fontSize(18)
                .fontColor('#666666')
                .width(40)

              TextInput({ text: item })
                .width('100%')
                .height(50)
                .fontSize(16)
                .backgroundColor('#F5F5F5')
                .borderRadius(8)
                .padding({ left: 12, right: 12 })
                .onChange((value: string) => {
                  this.optionTexts[index] = value;
                })
            }
            .width('100%')
            .padding({ left: 16, right: 16, top: 8, bottom: 8 })
          }
        }, (item: string, index: number) => index.toString())
      }
      .width('100%')
      .layoutWeight(1)
      .margin({ top: 10 })

      // 按钮区域
      Row() {
        Button('取消')
          .width('45%')
          .height(50)
          .fontSize(18)
          .backgroundColor('#CCCCCC')
          .fontColor('#333333')
          .onClick(() => {
            router.back();
          })

        Button('保存')
          .width('45%')
          .height(50)
          .fontSize(18)
          .backgroundColor($r('app.color.primary'))
          .fontColor(Color.White)
          .onClick(() => {
            // 使用AppStorage保存数据
            AppStorage.setOrCreate('editedOptionTexts', this.optionTexts);
            router.back();
          })
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
      .padding({ left: 16, right: 16 })
      .margin({ top: 20, bottom: 20 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}

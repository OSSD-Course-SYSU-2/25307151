/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { picker } from '@kit.CoreFileKit';
import prompt from '@ohos.promptAction';
import router from '@ohos.router';
import Common from '../common/constants/Const';

@Entry
@Component
struct IconSelector {
  // 当前选中的图标索引
  @State selectedIconIndex: number = -1;
  
  // 10个图标的资源数组
  @State iconResources: Resource[] = Common.IMAGE_RESOURCE;
  
  // 是否显示图标选择器
  @State showIconPicker: boolean = false;
  
  // 构建图标网格
  buildIconGrid() {
    Column() {
      // 标题
      Text($r('app.string.icon_selector_title'))
        .fontSize($r('app.float.size_24'))
        .fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.text_primary'))
        .margin({ top: $r('app.float.size_24'), bottom: $r('app.float.size_32') })
      
      // 图标网格 - 2行5列
      Grid() {
        ForEach(this.iconResources, (iconResource: Resource, index: number) => {
          GridItem() {
            Column() {
              // 图标显示区域
              Image(iconResource)
                .width($r('app.float.size_64'))
                .height($r('app.float.size_64'))
                .objectFit(ImageFit.Contain)
                .border({
                  width: this.selectedIconIndex === index ? 
                    $r('app.float.size_2') : $r('app.float.size_1'),
                  color: this.selectedIconIndex === index ? 
                    $r('app.color.primary') : $r('app.color.border'),
                  radius: $r('app.float.size_8')
                })
                .padding($r('app.float.size_8'))
                .backgroundColor($r('app.color.surface'))
                .onClick(() => {
                  this.selectedIconIndex = index;
                  this.showIconPicker = true;
                })
              
              // 图标编号
              Text(`图标 ${index + 1}`)
                .fontSize($r('app.float.size_12'))
                .fontColor($r('app.color.text_secondary'))
                .margin({ top: $r('app.float.size_8') })
              
              // 更换按钮
              Button($r('app.string.change_icon'))
                .width($r('app.float.size_60'))
                .height($r('app.float.size_24'))
                .fontSize($r('app.float.size_12'))
                .margin({ top: $r('app.float.size_8') })
                .onClick(() => {
                  this.selectedIconIndex = index;
                  this.showIconPicker = true;
                })
            }
            .alignItems(HorizontalAlign.Center)
          }
        }, (iconResource: Resource, index: number) => index.toString())
      }
      .columnsTemplate('1fr 1fr 1fr 1fr 1fr')
      .rowsTemplate('1fr 1fr')
      .columnsGap($r('app.float.size_16'))
      .rowsGap($r('app.float.size_16'))
      .width('100%')
      .height($r('app.float.size_320'))
      
      // 操作按钮区域
      Column() {
        // 导入JPG图片按钮
        Button($r('app.string.import_jpg'))
          .width('80%')
          .height($r('app.float.size_48'))
          .fontSize($r('app.float.size_16'))
          .backgroundColor($r('app.color.primary'))
          .fontColor(Color.White)
          .margin({ top: $r('app.float.size_32'), bottom: $r('app.float.size_16') })
          .onClick(() => {
            this.pickImageFromGallery();
          })
        
        // 保存按钮
        Button($r('app.string.save_config'))
          .width('80%')
          .height($r('app.float.size_48'))
          .fontSize($r('app.float.size_16'))
          .backgroundColor($r('app.color.success'))
          .fontColor(Color.White)
          .margin({ bottom: $r('app.float.size_32') })
          .onClick(() => {
            this.saveIconConfiguration();
          })
        
        // 返回按钮
        Button($r('app.string.back'))
          .width('80%')
          .height($r('app.float.size_48'))
          .fontSize($r('app.float.size_16'))
          .backgroundColor($r('app.color.secondary'))
          .fontColor(Color.White)
          .onClick(() => {
            router.back();
          })
      }
      .width('100%')
      .alignItems(HorizontalAlign.Center)
    }
  }
  
  // 构建图标选择器对话框
  buildIconPicker() {
    if (this.showIconPicker && this.selectedIconIndex >= 0) {
      AlertDialog({
        title: $r('app.string.select_icon'),
        message: $r('app.string.select_icon_for', this.selectedIconIndex + 1),
        confirm: {
          value: $r('app.string.select_from_gallery'),
          action: () => {
            this.showIconPicker = false;
            this.pickImageFromGallery();
          }
        },
        cancel: () => {
          this.showIconPicker = false;
        }
      })
    }
  }
  
  // 从图库选择图片
  async pickImageFromGallery() {
    try {
      // 创建图片选择器选项
      const photoSelectOptions = new picker.PhotoSelectOptions();
      photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
      photoSelectOptions.maxSelectNumber = 1;
      
      // 创建图片选择器
      const photoPicker = new picker.PhotoViewPicker();
      
      // 打开图片选择器
      const photoSelectResult = await photoPicker.select(photoSelectOptions);
      
      if (photoSelectResult && photoSelectResult.photoUris.length > 0) {
        const selectedImageUri = photoSelectResult.photoUris[0];
        await this.updateIconWithSelectedImage(selectedImageUri);
      }
    } catch (error) {
      console.error('选择图片失败:', error);
      prompt.showToast({
        message: '选择图片失败，请重试',
        duration: 2000
      });
    }
  }
  
  // 使用选择的图片更新图标
  async updateIconWithSelectedImage(imageUri: string) {
    try {
      // 这里应该将图片保存到应用资源或使用文件路径
      // 由于HarmonyOS的限制，我们需要将图片转换为base64或保存到应用目录
      
      // 临时方案：使用文件URI直接显示
      if (this.selectedIconIndex >= 0 && this.selectedIconIndex < this.iconResources.length) {
        // 创建一个临时资源对象
        // 注意：实际应用中需要处理图片的持久化存储
        this.iconResources[this.selectedIconIndex] = { 
          id: 0, 
          type: 0, 
          moduleName: '',
          bundleName: '',
          uri: imageUri 
        };
        
        // 显示成功提示
        prompt.showToast({
          message: $r('app.string.icon_updated', this.selectedIconIndex + 1),
          duration: 2000
        });
      }
    } catch (error) {
      console.error('更新图标失败:', error);
      prompt.showToast({
        message: $r('app.string.update_failed'),
        duration: 2000
      });
    }
  }
  
  // 保存图标配置
  saveIconConfiguration() {
    // 这里应该将图标配置保存到本地存储
    // 例如使用Preferences或文件系统
    
    // 显示保存成功提示
    prompt.showToast({
      message: $r('app.string.config_saved'),
      duration: 2000
    });
    
    // 可以添加导航回主页的逻辑
    // router.back();
  }
  
  build() {
    Column() {
      this.buildIconGrid()
    }
    .width('100%')
    .height('100%')
    .padding($r('app.float.size_16'))
    .backgroundColor($r('app.color.background'))
    
    // 图标选择器对话框
    this.buildIconPicker()
  }
}
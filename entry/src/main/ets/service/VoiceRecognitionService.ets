import { speechRecognizer } from '@kit.CoreSpeechKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { audio } from '@kit.AudioKit';

export class VoiceRecognitionService {
  private asrEngine: speechRecognizer.SpeechRecognitionEngine | null = null;
  private audioCapturer: audio.AudioCapturer | null = null;
  private isListening: boolean = false;
  private sessionId: string = 'voice_recognition_session';
  private triggerWord: string = '释怀';
  private onTriggerCallback: (() => void) | null = null;

  // 创建语音识别引擎
  async createEngine(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const extraParam: Record<string, Object> = {
        'locate': 'CN',
        'recognizerMode': 'short'
      };
      
      const initParamsInfo: speechRecognizer.CreateEngineParams = {
        language: 'zh-CN',
        online: 1,
        extraParams: extraParam
      };

      speechRecognizer.createEngine(initParamsInfo, (err: BusinessError, engine: speechRecognizer.SpeechRecognitionEngine) => {
        if (!err) {
          console.info('VoiceRecognitionService: Engine created successfully');
          this.asrEngine = engine;
          this.setListener();
          resolve(true);
        } else {
          console.error(`VoiceRecognitionService: Failed to create engine. Code: ${err.code}, message: ${err.message}`);
          resolve(false);
        }
      });
    });
  }

  // 设置识别回调监听
  private setListener() {
    if (!this.asrEngine) {
      return;
    }

    const listener: speechRecognizer.RecognitionListener = {
      onStart: (sessionId: string, eventMessage: string) => {
        console.info(`VoiceRecognitionService: onStart - ${sessionId}`);
      },
      
      onEvent: (sessionId: string, eventCode: number, eventMessage: string) => {
        console.info(`VoiceRecognitionService: onEvent - ${sessionId}, code: ${eventCode}`);
      },
      
      onResult: (sessionId: string, result: speechRecognizer.SpeechRecognitionResult) => {
        console.info(`VoiceRecognitionService: onResult - ${sessionId}`);
        // 获取识别结果
        if (result && result.result && result.result.length > 0) {
          const recognizedText = result.result[0];
          console.info(`VoiceRecognitionService: Recognized text: ${recognizedText}`);
          
          // 检查是否包含触发词
          if (recognizedText.includes(this.triggerWord)) {
            console.info(`VoiceRecognitionService: Trigger word "${this.triggerWord}" detected!`);
            if (this.onTriggerCallback) {
              this.onTriggerCallback();
            }
          }
        }
      },
      
      onComplete: (sessionId: string, eventMessage: string) => {
        console.info(`VoiceRecognitionService: onComplete - ${sessionId}`);
        // 如果还在监听状态，继续下一轮识别
        if (this.isListening) {
          this.startRecognition();
        }
      },
      
      onError: (sessionId: string, errorCode: number, errorMessage: string) => {
        console.error(`VoiceRecognitionService: onError - ${sessionId}, code: ${errorCode}, message: ${errorMessage}`);
        // 错误后也尝试继续识别
        if (this.isListening) {
          setTimeout(() => {
            this.startRecognition();
          }, 1000);
        }
      }
    };

    this.asrEngine.setListener(listener);
  }

  // 开始识别
  private startRecognition() {
    if (!this.asrEngine) {
      console.error('VoiceRecognitionService: Engine not initialized');
      return;
    }

    const recognizerParams: speechRecognizer.StartParams = {
      sessionId: this.sessionId,
      audioInfo: {
        audioType: 'pcm',
        sampleRate: 16000,
        soundChannel: 1,
        sampleBit: 16
      },
      extraParams: {
        'vadBegin': 2000,
        'vadEnd': 3000,
        'maxAudioDuration': 60000
      }
    };

    this.asrEngine.startListening(recognizerParams);
  }

  // 开始持续监听
  async startListening(onTrigger: () => void): Promise<boolean> {
    if (this.isListening) {
      console.warn('VoiceRecognitionService: Already listening');
      return true;
    }

    // 创建引擎
    if (!this.asrEngine) {
      const success = await this.createEngine();
      if (!success) {
        return false;
      }
    }

    this.onTriggerCallback = onTrigger;
    this.isListening = true;
    this.startRecognition();
    
    console.info('VoiceRecognitionService: Started listening');
    return true;
  }

  // 停止监听
  stopListening() {
    this.isListening = false;
    
    if (this.asrEngine) {
      this.asrEngine.cancel(this.sessionId);
    }
    
    console.info('VoiceRecognitionService: Stopped listening');
  }

  // 释放资源
  destroy() {
    this.stopListening();
    
    if (this.audioCapturer) {
      this.audioCapturer.release();
      this.audioCapturer = null;
    }
    
    if (this.asrEngine) {
      this.asrEngine.shutdown();
      this.asrEngine = null;
    }
    
    console.info('VoiceRecognitionService: Destroyed');
  }

  // 设置触发词
  setTriggerWord(word: string) {
    this.triggerWord = word;
    console.info(`VoiceRecognitionService: Trigger word set to "${word}"`);
  }
}

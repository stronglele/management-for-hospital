// 辅助检查
'use strict'

export default {
  'item': [{
    'key': 'ae',
    'label': '',
    'type': 'checkbox',
    'options': [{
      'value': '心超',
      'contain': {
        'key': 'ae',
        'value': '心超'
      },
      'key': 'slightlyitem',
      'child': [{
        'key': 'checkedDate',
        'label': '检查日期',
        'type': 'date'
      }, {
        'key': 'hospitalName',
        'label': '检查医院名称',
        'type': 'text'
      }, {
        'type': 'table',
        'label': 'M型主要测值',
        'options': [{
          'label': '主动脉根部直径（cm）',
          'key': 'ardmetervalue',
          'subKey': 'ardnormalvalue'
        }, {
          'label': '左房内径（cm）',
          'key': 'ladmetervalue',
          'subKey': 'ladnormalvalue'
        }, {
          'label': '左室舒张末内径（cm）',
          'key': 'lveddmetervalue',
          'subKey': 'lveddnormalvalue'
        }, {
          'label': '左室收缩末内径（cm）',
          'key': 'lvesdmetervalue',
          'subKey': 'lvesdnormalvalue'
        }, {
          'label': '室间隔厚度（cm）',
          'key': 'lvstmetervalue',
          'subKey': 'lvstnormalvalue'
        }, {
          'label': '左室厚壁厚度（cm）',
          'key': 'lvtmetervalue',
          'subKey': 'lvtnormalvalue'
        }]
      }, {
        'type': 'checkbox',
        'label': '二维超声波主要描述',
        'options': [{
          'value': 'Simpson法测量LVEF',
          'input': {
            'key': 'simpsonItem',
            'unit': '%'
          }
        }, {
          'value': '肺动脉压力',
          'input': {
            'key': 'papitem',
            'unit': 'mmHg'
          }
        }]
      }, {
        'type': 'table',
        'label': '左心室功能测定',
        'options': [{
          'label': '左室舒张末容量（ml）',
          'key': 'lvedvmetervalue',
          'subKey': 'lvedvnormalvalue'
        }, {
          'label': '左室收缩末容量（ml）',
          'key': 'lvesvmetervalue',
          'subKey': 'lvesvnormalvalue'
        }, {
          'label': '左室射血分数LVEF（%）',
          'key': 'lvefmetervalue',
          'subKey': 'lvefnormalvalue'
        }]
      }, {
        'type': 'mix',
        'label': '诊断意见',
        'child': [{
          'key': 'lvwmstatus',
          'label': '左室壁活动',
          'type': 'radio',
          'options': [{
            'value': '正常'
          }, {
            'value': '异常',
            'key': 'lvwmitem',
            'type': 'checkbox',
            'options': [{
              'value': '前壁',
              'input': {
                'key': 'lfwvalue',
                'unit': '%'
              }
            }, {
              'value': '下壁',
              'input': {
                'key': 'llwvalue',
                'unit': '%'
              }
            }, {
              'value': '后壁',
              'input': {
                'key': 'latwvalue',
                'unit': '%'
              }
            }, {
              'value': '心尖部',
              'input': {
                'key': 'lapexvalue',
                'unit': '%'
              }
            }, {
              'value': '室间隔',
              'input': {
                'key': 'lisvalue',
                'unit': '%'
              }
            }, {
              'value': '右室',
              'input': {
                'key': 'lrvvalue',
                'unit': '%'
              }
            }]
          }]
        }, {
          'key': 'rvwmstatus',
          'label': '右室壁活动',
          'type': 'radio',
          'options': [{
            'value': '正常'
          }, {
            'value': '异常',
            'type': 'checkbox',
            'key': 'rvwmitem',
            'options': [{
              'value': '前壁',
              'input': {
                'key': 'rfwvalue',
                'unit': '%'
              }
            }, {
              'value': '下壁',
              'input': {
                'key': 'rlwvalue',
                'unit': '%'
              }
            }, {
              'value': '后壁',
              'input': {
                'key': 'ratwvalue',
                'unit': '%'
              }
            }, {
              'value': '心尖部',
              'input': {
                'key': 'rapexvalue',
                'unit': '%'
              }
            }, {
              'value': '室间隔',
              'input': {
                'key': 'risvalue',
                'unit': '%'
              }
            }, {
              'value': '右室',
              'input': {
                'key': 'rrvvalue',
                'unit': '%'
              }
            }]
          }]
        }, {
          'key': 'viflag',
          'label': '瓣膜关闭不全',
          'type': 'radio',
          'options': [{
            'value': '无'
          }, {
            'value': '有',
            'type': 'checkboxs',
            'child': [{
              'key': 'vic',
              'type': 'checkbox',
              'label': '部位',
              'options': [
                '二尖瓣',
                '三尖瓣',
                '主动脉瓣',
                '肺动脉瓣'
              ]
            }, {
              'key': 'vicmv',
              'type': 'radio',
              'label': '二尖瓣程度',
              'options': [
                '轻度',
                '中度',
                '重度'
              ],
              'contain': {
                'key': 'vic',
                'value': '二尖瓣'
              }
            }, {
              'key': 'victv',
              'type': 'radio',
              'label': '三尖瓣程度',
              'options': [
                '轻度',
                '中度',
                '重度'
              ],
              'contain': {
                'key': 'vic',
                'value': '三尖瓣'
              }
            }, {
              'key': 'vicav',
              'type': 'radio',
              'label': '主动脉瓣程度',
              'options': [
                '轻度',
                '中度',
                '重度'
              ],
              'contain': {
                'key': 'vic',
                'value': '主动脉瓣'
              }
            }, {
              'key': 'vicpv',
              'type': 'radio',
              'label': '肺动脉瓣程度',
              'options': [
                '轻度',
                '中度',
                '重度'
              ],
              'contain': {
                'key': 'vic',
                'value': '肺动脉瓣'
              }
            }]
          }]
        }, {
          'key': 'vs',
          'label': '瓣膜口狭窄',
          'type': 'radio',
          'options': [{
            'value': '无'
          }, {
            'value': '有',
            'type': 'checkboxs',
            'child': [{
              'key': 'vsc',
              'type': 'checkbox',
              'label': '部位',
              'options': [
                '二尖瓣',
                '三尖瓣',
                '主动脉瓣',
                '肺动脉瓣'
              ]
            }, {
              'key': 'vscmv',
              'type': 'radio',
              'label': '二尖瓣程度',
              'options': [
                '轻度',
                '中度',
                '重度'
              ],
              'contain': {
                'key': 'vsc',
                'value': '二尖瓣'
              }
            }, {
              'key': 'vsctv',
              'type': 'radio',
              'label': '三尖瓣程度',
              'options': [
                '轻度',
                '中度',
                '重度'
              ],
              'contain': {
                'key': 'vsc',
                'value': '三尖瓣'
              }
            }, {
              'key': 'vscav',
              'type': 'radio',
              'label': '主动脉瓣程度',
              'options': [
                '轻度',
                '中度',
                '重度'
              ],
              'contain': {
                'key': 'vsc',
                'value': '主动脉瓣'
              }
            }, {
              'key': 'vscpv',
              'type': 'radio',
              'label': '肺动脉瓣程度',
              'options': [
                '轻度',
                '中度',
                '重度'
              ],
              'contain': {
                'key': 'vsc',
                'value': '肺动脉瓣'
              }
            }]
          }]
        }]
      }, {
        'type': 'checkbox',
        'label': '',
        'options': [{
          'value': '其他',
          'input': {
            'key': 'otherItem',
            'unit': ''
          }
        }]
      }]
    }, {
      'value': '心电图',
      'input': {
        'key': 'cardiogramItem',
        'type': 'textarea',
        'contain': {
          'key': 'ae',
          'value': '心电图'
        }
      }
    }, {
      'value': '动态心电图',
      'input': {
        'key': 'dcgitem',
        'type': 'textarea',
        'contain': {
          'key': 'ae',
          'value': '动态心电图'
        }
      }
    }, {
      'value': '颈部血管超声',
      'input': {
        'key': 'cvusitem',
        'type': 'textarea',
        'contain': {
          'key': 'ae',
          'value': '颈部血管超声'
        }
      }
    }, {
      'value': '下肢血管超声',
      'input': {
        'key': 'levuitem',
        'type': 'textarea',
        'contain': {
          'key': 'ae',
          'value': '下肢血管超声'
        }
      }
    }, {
      'value': '冠脉CTA',
      'input': {
        'key': 'ctaitem',
        'type': 'textarea',
        'contain': {
          'key': 'ae',
          'value': '冠脉CTA'
        }
      }
    }]
  }]
}

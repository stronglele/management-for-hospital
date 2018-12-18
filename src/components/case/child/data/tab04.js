// CAG/PCI手术记录
'use strict'

export default {
  '造影记录': [{
    'key': 'cagdate',
    'label': '造影日期',
    'type': 'date'
  }, {
    'key': 'leftca',
    'label': '左冠造影',
    'type': 'checkbox',
    'options': [{
      'value': 'LM',
      'input': {
        'key': 'lmvalue',
        'type': 'text',
        'placeholder': '填写狭窄度',
        'unit': '%',
        'contain': {
          'key': 'leftca',
          'value': 'LM'
        }
      }
    }, {
      'value': 'LAD',
      'key': 'lad',
      'type': 'checkbox',
      'options': [{
        'value': '近段',
        'input': {
          'key': 'ladnearvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lad',
            'value': '近段'
          }
        }
      }, {
        'value': '中段',
        'input': {
          'key': 'ladmiddlevalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lad',
            'value': '中段'
          }
        }
      }, {
        'value': '远段',
        'input': {
          'key': 'ladfarvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lad',
            'value': '远段'
          }
        }
      }, {
        'value': '第一对角支',
        'input': {
          'key': 'ladfirstvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lad',
            'value': '第一对角支'
          }
        }
      }, {
        'value': '第一对角支a',
        'input': {
          'key': 'ladfirstavalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lad',
            'value': '第一对角支a'
          }
        }
      }, {
        'value': '第二对角支',
        'input': {
          'key': 'ladsecondvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lad',
            'value': '第二对角支'
          }
        }
      }, {
        'value': '第二对角支a',
        'input': {
          'key': 'ladsecondavalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lad',
            'value': '第二对角支a'
          }
        }
      }]
    }, {
      'value': 'LCX',
      'key': 'lcx',
      'type': 'checkbox',
      'options': [{
        'value': '近段',
        'input': {
          'key': 'lcxnearvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lcx',
            'value': '近段'
          }
        }
      }, {
        'value': '中段',
        'input': {
          'key': 'lcxmiddlevalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lcx',
            'value': '中段'
          }
        }
      }, {
        'value': '远段',
        'input': {
          'key': 'lcxfarvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lcx',
            'value': '远段'
          }
        }
      }, {
        'value': '中间支',
        'input': {
          'key': 'lcxcentervalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lcx',
            'value': '中间支'
          }
        }
      }, {
        'value': '第一钝缘支',
        'input': {
          'key': 'lcxfirstvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lcx',
            'value': '第一钝缘支'
          }
        }
      }, {
        'value': '第二钝缘支',
        'input': {
          'key': 'lcxsecondvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lcx',
            'value': '第二钝缘支'
          }
        }
      }, {
        'value': '左后侧支',
        'input': {
          'key': 'lcxleftvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lcx',
            'value': '左后侧支'
          }
        }
      }, {
        'value': '左后侧支a',
        'input': {
          'key': 'lcxleftavalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lcx',
            'value': '左后侧支a'
          }
        }
      }, {
        'value': '左后侧支b',
        'input': {
          'key': 'lcxleftbvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lcx',
            'value': '左后侧支b'
          }
        }
      }, {
        'value': '左后降支',
        'input': {
          'key': 'lcxleftdropvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'lcx',
            'value': '左后降支'
          }
        }
      }]
    }]
  }, {
    'key': 'rightca',
    'label': '右冠造影',
    'type': 'checkbox',
    'options': [{
      'value': 'RCA',
      'key': 'rca',
      'type': 'checkbox',
      'oContain': {
        'key': 'rightca',
        'value': 'RCA'
      },
      'options': [{
        'value': '近段',
        'input': {
          'key': 'rcanearvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'rca',
            'value': '近段'
          }
        }
      }, {
        'value': '中段',
        'input': {
          'key': 'rcamiddlevalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'rca',
            'value': '中段'
          }
        }
      }, {
        'value': '远段',
        'input': {
          'key': 'rcafarvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'rca',
            'value': '远段'
          }
        }
      }, {
        'value': '右后降支',
        'input': {
          'key': 'rcarightdropvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'rca',
            'value': '右后降支'
          }
        }
      }, {
        'value': '右后侧支',
        'input': {
          'key': 'rcarightvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'rca',
            'value': '右后侧支'
          }
        }
      }, {
        'value': '右后侧支第一分支',
        'input': {
          'key': 'rcarightfirstvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'rca',
            'value': '右后侧支第一分支'
          }
        }
      }, {
        'value': '右后侧支第二分支',
        'input': {
          'key': 'rcarightsecondvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'rca',
            'value': '右后侧支第二分支'
          }
        }
      }, {
        'value': '右后侧支第三分支',
        'input': {
          'key': 'rcarightthirdvalue',
          'placeholder': '填写狭窄度',
          'unit': '%',
          'contain': {
            'key': 'rca',
            'value': '右后侧支第三分支'
          }
        }
      }]
    }]
  }],
  '桥血管评估': [{
    'key': 'lesionvalue',
    'label': '病变位置',
    'type': 'radio',
    'options': [
      '主动脉吻合',
      '体部',
      '远段吻合口'
    ]
  }, {
    'key': 'svbg',
    'label': '桥血管',
    'type': 'checkbox',
    'options': [{
      'value': '近段',
      'input': {
        'key': 'svbgnearvalue',
        'placeholder': '填写狭窄度',
        'unit': '%',
        'contain': {
          'key': 'svbg',
          'value': '近段'
        }
      }
    }, {
      'value': '中段',
      'input': {
        'key': 'svbgmiddlevalue',
        'placeholder': '填写狭窄度',
        'unit': '%',
        'contain': {
          'key': 'svbg',
          'value': '中段'
        }
      }
    }, {
      'value': '远段',
      'input': {
        'key': 'svbgfarvalue',
        'placeholder': '填写狭窄度',
        'unit': '%',
        'contain': {
          'key': 'svbg',
          'value': '远段'
        }
      }
    }]
  }, {
    'key': 'larpg',
    'label': '左室-主动脉根部压力阶差',
    'type': 'text',
    'unit': 'mmHg'
  }, {
    'key': 'draandother',
    'type': 'checkbox',
    'options': [{
      'value': '双肾动脉造影',
      'input': {
        'key': 'dra',
        'type': 'text',
        'placeholder': '',
        'unit': '',
        'contain': {
          'key': 'draandother',
          'value': '双肾动脉造影'
        }
      }
    }, {
      'value': '其他造影发现',
      'key': 'oaf',
      'type': 'checkbox',
      'oContain': {
        'key': 'draandother',
        'value': '其他造影发现'
      },
      'options': [{
        'value': '侧支循环',
        'input': {
          'key': 'ccvalue',
          'type': 'text',
          'placeholder': '',
          'unit': '',
          'contain': {
            'key': 'oaf',
            'value': '侧支循环'
          }
        }
      }, {
        'value': '肌桥',
        'input': {
          'key': 'mbvalue',
          'type': 'text',
          'placeholder': '',
          'unit': '',
          'contain': {
            'key': 'oaf',
            'value': '肌桥'
          }
        }
      }, {
        'value': '血管畸形',
        'input': {
          'key': 'vmvalue',
          'type': 'text',
          'placeholder': '',
          'unit': '',
          'contain': {
            'key': 'oaf',
            'value': '血管畸形'
          }
        }
      }, {
        'value': '动静脉瘘',
        'input': {
          'key': 'afvalue',
          'type': 'text',
          'placeholder': '',
          'unit': '',
          'contain': {
            'key': 'oaf',
            'value': '动静脉瘘'
          }
        }
      }, {
        'value': '冠脉痉挛',
        'input': {
          'key': 'csvalue',
          'type': 'text',
          'placeholder': '',
          'unit': '',
          'contain': {
            'key': 'oaf',
            'value': '冠脉痉挛'
          }
        }
      }, {
        'value': '其他',
        'input': {
          'key': 'ovalue',
          'type': 'text',
          'placeholder': '',
          'unit': '',
          'contain': {
            'key': 'oaf',
            'value': '其他'
          }
        }
      }]
    }]
  }],
  'PCI记录': [{
    'key': 'pcidate',
    'label': 'PCI手术日期',
    'type': 'date'
  }, {
    'key': 'pcistatus',
    'label': 'PCI状态',
    'type': 'radio',
    'options': [
      '择期',
      '早期',
      '急诊',
      '抢救'
    ]
  }, {
    'key': 'sis',
    'label': '支架植入部位',
    'type': 'checkbox',
    'options': [{
      'value': 'LM',
      'key': 'lm_cm',
      'label': '耗材',
      'contain': {
        'key': 'leftca',
        'value': 'LM'
      },
      'input': {
        'key': 'lm_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lm_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lm_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LAD近段',
      'key': 'ladn_cm',
      'label': '耗材',
      'contain': {
        'key': 'lad',
        'value': '近段'
      },
      'input': {
        'key': 'ladn_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'ladn_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'ladn_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LAD中段',
      'key': 'ladm_cm',
      'label': '耗材',
      'contain': {
        'key': 'lad',
        'value': '中段'
      },
      'input': {
        'key': 'ladm_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'ladm_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'ladm_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LAD远段',
      'key': 'ladf_cm',
      'label': '耗材',
      'contain': {
        'key': 'lad',
        'value': '远段'
      },
      'input': {
        'key': 'ladf_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'ladf_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'ladf_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LAD第一对角支',
      'key': 'ladfv_cm',
      'label': '耗材',
      'contain': {
        'key': 'lad',
        'value': '第一对角支'
      },
      'input': {
        'key': 'ladfv_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'ladfv_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'ladfv_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LAD第一对角支a',
      'key': 'ladfav_cm',
      'label': '耗材',
      'contain': {
        'key': 'lad',
        'value': '第一对角支a'
      },
      'input': {
        'key': 'ladfav_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'ladfav_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'ladfav_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LAD第二对角支',
      'key': 'ladsv_cm',
      'label': '耗材',
      'contain': {
        'key': 'lad',
        'value': '第二对角支'
      },
      'input': {
        'key': 'ladsv_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'ladsv_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'ladsv_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LAD第二对角支a',
      'key': 'ladsav_cm',
      'label': '耗材',
      'contain': {
        'key': 'lad',
        'value': '第二对角支a'
      },
      'input': {
        'key': 'ladsav_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'ladsav_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'ladsav_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LCX近段',
      'key': 'lcxn_cm',
      'label': '耗材',
      'contain': {
        'key': 'lcx',
        'value': '近段'
      },
      'input': {
        'key': 'lcxn_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lcxn_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lcxn_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LCX中段',
      'key': 'lcxm_cm',
      'label': '耗材',
      'contain': {
        'key': 'lcx',
        'value': '中段'
      },
      'input': {
        'key': 'lcxm__prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lcxm_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lcxm_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LCX远段',
      'key': 'lcxf_cm',
      'label': '耗材',
      'contain': {
        'key': 'lcx',
        'value': '远段'
      },
      'input': {
        'key': 'lcxf_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lcxf_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lcxf_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LCX中间支',
      'key': 'lcxc_cm',
      'label': '耗材',
      'contain': {
        'key': 'lcx',
        'value': '中间支'
      },
      'input': {
        'key': 'lcxc_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lcxc_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lcxc_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LCX第一钝缘支',
      'key': 'lcxfv_cm',
      'label': '耗材',
      'contain': {
        'key': 'lcx',
        'value': '第一钝缘支'
      },
      'input': {
        'key': 'lcxfv_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lcxfv_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lcxfv_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LCX第二钝缘支',
      'key': 'lcxsv_cm',
      'label': '耗材',
      'contain': {
        'key': 'lcx',
        'value': '第二钝缘支'
      },
      'input': {
        'key': 'lcxsv_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lcxsv_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lcxsv_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LCX左后侧支',
      'key': 'lcxl_cm',
      'label': '耗材',
      'contain': {
        'key': 'lcx',
        'value': '左后侧支'
      },
      'input': {
        'key': 'lcxl_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lcxl_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lcxl_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LCX左后侧支a',
      'key': 'lcxla_cm',
      'label': '耗材',
      'contain': {
        'key': 'lcx',
        'value': '左后侧支a'
      },
      'input': {
        'key': 'lcxla_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lcxla_tlcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lcxla_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LCX左后侧支b',
      'key': 'lcxlb_cm',
      'label': '耗材',
      'contain': {
        'key': 'lcx',
        'value': '左后侧支b'
      },
      'input': {
        'key': 'lcxlb_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lcxlb_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lcxlb_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'LCX左后降支',
      'key': 'lcxld_cm',
      'label': '耗材',
      'contain': {
        'key': 'lcx',
        'value': '左后降支'
      },
      'input': {
        'key': 'lcxld_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'lcxld_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'lcxld_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'RCA近段',
      'key': 'rcan_cm',
      'label': '耗材',
      'contain': {
        'key': 'rca',
        'value': '近段'
      },
      'input': {
        'key': 'rcan_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'rcan_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'rcan_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'RCA中段',
      'key': 'rcam_cm',
      'label': '耗材',
      'contain': {
        'key': 'rca',
        'value': '中段'
      },
      'input': {
        'key': 'rcam_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'rcam_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'rcam_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'RCA远段',
      'key': 'rcaf_cm',
      'label': '耗材',
      'contain': {
        'key': 'rca',
        'value': '远段'
      },
      'input': {
        'key': 'rcaf_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'rcaf_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'rcaf_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'RCA右后降支',
      'key': 'rcard_cm',
      'label': '耗材',
      'contain': {
        'key': 'rca',
        'value': '右后降支'
      },
      'input': {
        'key': 'rcard_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'rcard_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'rcard_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'RCA右后侧支',
      'key': 'rcar_cm',
      'label': '耗材',
      'contain': {
        'key': 'rca',
        'value': '右后侧支'
      },
      'input': {
        'key': 'rcar_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'rcar_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'rcar_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'RCA右后侧支第一分支',
      'key': 'rcarf_cm',
      'label': '耗材',
      'contain': {
        'key': 'rca',
        'value': '右后侧支第一分支'
      },
      'input': {
        'key': 'rcarf_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'rcarf_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'rcarf_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'RCA右后侧支第二分支',
      'key': 'rcars_cm',
      'label': '耗材',
      'contain': {
        'key': 'rca',
        'value': '右后侧支第二分支'
      },
      'input': {
        'key': 'rcars_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'rcars_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'rcars_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': 'RCA右后侧支第三分支',
      'key': 'rcart_cm',
      'label': '耗材',
      'contain': {
        'key': 'rca',
        'value': '右后侧支第三分支'
      },
      'input': {
        'key': 'rcart_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'rcart_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'rcart_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': '桥血管近段',
      'key': 'svbgn_cm',
      'label': '耗材',
      'contain': {
        'key': 'svbg',
        'value': '近段'
      },
      'input': {
        'key': 'svbgn_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'svbgn_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'svbgn_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': '桥血管中段',
      'key': 'svbgm_cm',
      'label': '耗材',
      'contain': {
        'key': 'svbg',
        'value': '中段'
      },
      'input': {
        'key': 'svbgm_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'svbgm_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'svbgm_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }, {
      'value': '桥血管远段',
      'key': 'svbgf_timi',
      'label': '耗材',
      'contain': {
        'key': 'svbg',
        'value': '远段'
      },
      'input': {
        'key': 'svbgf_prs',
        'type': 'text',
        'label': '术后残余狭窄'
      },
      'radios': [{
        'key': 'svbgf_ltcs',
        'label': '靶病变特性',
        'options': [
          '一般病变',
          '钙化病变',
          '出现血栓',
          '分叉病变',
          '慢性完全闭塞病变',
          '小血管病变',
          '畸形冠状动脉病变',
          '桥血管病变',
          '既往病史'
        ]
      }, {
        'key': 'svbgf_timi',
        'label': '术后TIMI血流',
        'options': [
          '3',
          '2',
          '1',
          '0'
        ]
      }]
    }
    ]
  }]
}

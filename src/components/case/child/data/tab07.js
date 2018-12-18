// 围手术期评估
'use strict'

export default {
  'items': [
    {
      'key': 'mi',
      'label': '心肌梗死',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'cs',
      'label': '心源性休克',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'hf',
      'label': '心力衰竭',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'cat',
      'label': '缺血性脑卒中',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'ha',
      'label': '出血性脑卒中',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'pt',
      'label': '心包填塞',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'cn',
      'label': '对比剂肾病',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'ndd',
      'label': '新透析需求',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'ovc',
      'label': '其他需要处理的血管并发症',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'cr',
      'label': '浓缩红细胞／全血输血',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'seventytwoh',
      'label': '72小时内出血',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'bo',
      'label': '出现穿刺部位出血',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'hs',
      'label': '血肿大小',
      'type': 'radio',
      'options': [
        '<3cm',
        '3-5cm',
        '5-10cm',
        '>10cm'
      ],
      'condition': null
    },
    {
      'key': 'rh',
      'label': '后腹膜出血',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'dtb',
      'label': '消化道出血',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'uh',
      'label': '泌尿生殖系统出血',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'ob',
      'label': '其他出血',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'pi',
      'label': '肺部感染',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'sa',
      'label': '严重心律失常',
      'type': 'radio',
      'options': [
        '否',
        '是'
      ],
      'condition': null
    },
    {
      'key': 'satext',
      'label': '',
      'type': 'textarea',
      'options': '请描述具体类型',
      'condition': {
        'key': 'sa',
        'value': '是'
      }
    }
  ]
}

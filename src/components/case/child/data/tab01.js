// 入院诊断
'use strict'

export default {
  'items': [
    {
      'key': 'chd',
      'label': '冠心病',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'chditem',
      'label': '',
      'type': 'radio',
      'options': [
        '急性ST段抬高心肌梗死(I21.0-I21.3)',
        '急性非ST段抬高性心肌梗死(I21.4,I21.9,I21.9)',
        '不稳定性心绞痛(I20.1,I20.9,I20.0)',
        '稳定型心绞痛(I20.801)',
        '胸痛(不确定)(R07.400)'
      ],
      'condition': {
        'key': 'chd',
        'value': '有'
      }
    },
    {
      'key': 'pci',
      'label': 'PCI术后',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'cabg',
      'label': 'CABG术后',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'hd',
      'label': '高血压病',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'hditem',
      'label': '',
      'type': 'radio',
      'options': [
        '原发性',
        '继发性',
        'I级高血压',
        'II级高血压',
        'III级高血压'
      ],
      'condition': {
        'key': 'hd',
        'value': '有'
      }
    },
    {
      'key': 'sd',
      'label': '糖尿病',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'sditem',
      'label': '',
      'type': 'radio',
      'options': [
        'I型糖尿病',
        'II型糖尿病'
      ],
      'condition': {
        'key': 'sd',
        'value': '有'
      }
    },
    {
      'key': 'hyp',
      'label': '高血脂症',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'hcm',
      'label': '肥厚性心肌病',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'hcmitem',
      'label': '',
      'type': 'radio',
      'options': [
        '梗阻型',
        '非梗阻型'
      ],
      'condition': {
        'key': 'hcm',
        'value': '有'
      }
    },
    {
      'key': 'ci',
      'label': '心功能不全',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'ciitem',
      'label': '',
      'type': 'radio',
      'options': [
        'NYHA分级',
        'KILLIP分级'
      ],
      'condition': {
        'key': 'ci',
        'value': '有'
      }
    },
    {
      'key': 'cisubitem',
      'label': '',
      'type': 'radio',
      'options': [
        'I级',
        'II级',
        'III级',
        'IV级'
      ],
      'condition': {
        'key': 'ciitem',
        'value': 'NYHA分级',
        'subValue': '有'
      },
      'subcondition': {
        'key': 'ci',
        'value': '有'
      }
    },
    {
      'key': 'cisubitem',
      'label': '',
      'type': 'radio',
      'options': [
        'I级',
        'II级',
        'III级'
      ],
      'condition': {
        'key': 'ciitem',
        'value': 'KILLIP分级',
        'subValue': '有'
      },
      'subcondition': {
        'key': 'ci',
        'value': '有'
      }
    },
    {
      'key': 'arm',
      'label': '心律失常',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'armitem',
      'label': '',
      'type': 'radio',
      'options': [
        '无心房颤动',
        '有心房颤动'
      ],
      'condition': {
        'key': 'arm',
        'value': '有'
      }
    },
    {
      'key': 'armtext',
      'label': '',
      'type': 'text',
      'options': '如有其他心律失常情况,请写出具体名称',
      'condition': {
        'key': 'arm',
        'value': '有'
      }
    },
    {
      'key': 'crf',
      'label': '慢性肾功能不全',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'pi',
      'label': '肺部感染',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'osas',
      'label': '睡眠呼吸暂停综合症',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'cas',
      'label': '颈动脉狭窄',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'ca',
      'label': '脑卒中',
      'type': 'radio',
      'options': [
        '无',
        '有'
      ],
      'condition': null
    },
    {
      'key': 'caitem',
      'label': '',
      'type': 'radio',
      'options': [
        '缺血性',
        '出血性',
        'TIA'
      ],
      'condition': {
        'key': 'ca',
        'value': '有'
      }
    },
    {
      'key': 'othertext',
      'label': '其他诊断',
      'type': 'textarea',
      'options': null,
      'condition': null
    }
  ]
}

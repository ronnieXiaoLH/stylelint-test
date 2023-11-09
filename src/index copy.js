const path = require('path')
const stylelint = require('stylelint')
const { getFilesList } = require('./utils')

const isScss = true
const isLess = true

let ext = ['.css', '.vue']

const disabledRules = [
  'rule-empty-line-before',
  'comment-empty-line-before',
  'font-family-name-quotes',
  'at-rule-empty-line-before',
  'import-notation'
]

function initRules() {
  let rules = {}

  disabledRules.forEach((ruleKey) => {
    rules[ruleKey] = null
  })

  return rules
}

const config = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue' // 配置 vue 中 template 样式格式化
    // 'stylelint-config-standard-scss', // 配置stylelint scss插件
    // 'stylelint-config-standard-less', // 配置stylelint less插件
    // 'stylelint-config-standard-vue/scss' // 配置 vue 中 scss 样式格式化
    // 'stylelint-config-standard-vue'
  ],
  overrides: [
    // {
    //   files: ['**/*.(scss|css|vue|html)'],
    //   customSyntax: 'postcss-scss'
    // },
    // {
    //   files: ['**/*.(less|css|vue|html)'],
    //   customSyntax: 'postcss-less'
    // },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml'
  ],
  rules: {
    ...initRules()
    // 'scss/dollar-variable-pattern': null,
    // 'selector-class-pattern': null,
    // 'alpha-value-notation': null
  }
}

if (isScss && isLess) {
  ext.push(...['.scss', '.less'])
  config.extends.push(
    ...[
      // 'stylelint-config-standard-scss',
      'stylelint-config-standard-vue/scss',
      'stylelint-config-standard-less',
      'stylelint-config-standard-vue'
    ]
  )
  config.overrides.unshift({
    files: ['**/*.(scss|vue|html)'],
    customSyntax: 'postcss-scss'
  })
  config.overrides.unshift({
    files: ['**/*.(less|vue|html)'],
    customSyntax: 'postcss-less'
  })
} else {
  if (isScss) {
    ext.push('.scss')
    config.extends.push(
      ...[
        'stylelint-config-standard-scss',
        'stylelint-config-standard-vue/scss'
      ]
    )
    config.overrides.unshift({
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss'
    })
  }

  if (isLess) {
    ext.push('.less')
    config.extends.push(
      ...['stylelint-config-standard-less', 'stylelint-config-standard-vue']
    )
    config.overrides.unshift({
      files: ['**/*.(less|css|vue|html)'],
      customSyntax: 'postcss-less'
    })
  }
}

const stylelintTest = async function (targetPath, ignore) {
  // console.log('targetPath', targetPath)
  const files = getFilesList(targetPath, ignore, ext)
  // console.log('files', files)
  let ruleMap = new Map()
  try {
    console.time('stylelint')
    let res = await stylelint.lint({
      configBasedir: path.resolve(__dirname),
      config,
      files
    })
    console.timeEnd('stylelint')
    // console.log('res...', res)
    const ruleMetadata = res.ruleMetadata
    // console.log('ruleMetadata', ruleMetadata)
    const results = res.results.filter((item) => item.warnings.length)
    // console.log('results', results)

    results.forEach((item) => {
      console.log('file:', item.source, item.warnings)

      const fileExt = path.extname(item.source).slice(1)

      item.warnings.forEach(({ rule }) => {
        rule = fileExt + '__' + rule
        const count = ruleMap.get(rule) || 0
        ruleMap.set(rule, count + 1)
      })
    })
    console.log('ruleMap', ruleMap)
  } catch (error) {
    console.error(error.stack)
  }
}

stylelintTest(path.resolve(__dirname))

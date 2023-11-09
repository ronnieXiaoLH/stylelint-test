const fs = require('fs')
const path = require('path')
const ignore = require('ignore')

// 默认忽略扫描的文件
const defaultIgnore = [
  'node_modules',
  '.git',
  '.eslintrc.js',
  'babel.config.js',
  'build',
  'dist',
  'assets',
  'public',
  'static'
]

exports.getFilesList = function (
  rootPath,
  ignoreArr,
  ext = ['.js', '.mjs', '.ts', '.jsx', '.tsx', '.vue']
) {
  if (!fs.statSync(rootPath).isDirectory()) {
    return [rootPath]
  }

  ignoreArr = ignoreArr ? [...ignoreArr, ...defaultIgnore] : defaultIgnore
  const ig = ignore().add(ignoreArr)
  const filesList = []
  _getFilesList(rootPath)

  function _getFilesList(targetPath) {
    const files = fs.readdirSync(targetPath)
    files.forEach((f) => {
      const fPath = path.join(targetPath, f)
      const rPath = path.relative(rootPath, fPath)
      if (ig.ignores(rPath)) return
      if (fs.statSync(fPath).isDirectory()) {
        _getFilesList(fPath)
      } else {
        if (ext && ext.length) {
          if (ext.includes(path.extname(fPath))) {
            filesList.push(fPath)
          }
        } else {
          filesList.push(fPath)
        }
      }
    })
  }
  return filesList
}

const baseDisabledRules = [
  // 'at-rule-empty-line-before',
  // 'comment-empty-line-before',
  // 'custom-property-empty-line-before',
  // 'declaration-empty-line-before',
  // 'rule-empty-line-before'
]

function initRules(disabledRules = []) {
  let rules = {}

  disabledRules.forEach((ruleKey) => {
    rules[ruleKey] = null
  })

  return rules
}

exports.initCssConfig = function () {
  const disabledRules = ['comment-empty-line-before']

  return {
    extends: ['stylelint-config-standard'],
    rules: initRules(baseDisabledRules.concat(disabledRules))
  }
}

exports.initScssConfig = function () {
  const disabledRules = ['scss/comment-no-empty']

  return {
    extends: ['stylelint-config-standard-scss'],
    overrides: [
      {
        files: ['**/*.(scss)'],
        customSyntax: 'postcss-scss'
      }
    ],
    rules: initRules(baseDisabledRules.concat(disabledRules))
  }
}

exports.initLessConfig = function () {
  const disabledRules = []

  return {
    extends: ['stylelint-config-standard-less'],
    overrides: [
      {
        files: ['**/*.(less)'],
        customSyntax: 'postcss-less'
      }
    ],
    rules: initRules(baseDisabledRules.concat(disabledRules))
  }
}

exports.initVueConfig = function () {
  const disabledRules = []

  return {
    extends: [
      'stylelint-config-standard-less',
      'stylelint-config-standard-vue'
    ],
    overrides: [
      // {
      //   files: ['**/*.(vue)'],
      //   customSyntax: 'postcss-scss'
      // },
      {
        files: ['**/*.(vue)'],
        customSyntax: 'postcss-less'
      },
      {
        files: ['**/*.(vue)'],
        customSyntax: 'postcss-html'
      }
    ],
    rules: initRules(baseDisabledRules.concat(disabledRules))
  }
}

// bug
const BUG_BLOCKER = [
  'color-no-invalid-hex',
  'function-calc-no-unspaced-operator',
  'media-query-no-invalid',
  'named-grid-areas-no-invalid',
  'no-invalid-double-slash-comments',
  'no-invalid-position-at-import-rule',
  'annotation-no-unknown',
  'property-no-unknown',
  'unit-no-unknown'
]

const BUG_CRITICAL = [
  'keyframe-block-no-duplicate-selectors',
  'custom-property-no-missing-var-function',
  'function-linear-gradient-no-nonstandard-direction',
  'declaration-block-no-shorthand-property-overrides',
  'selector-anb-no-unmatchable',
  'selector-type-no-unknown',
  'at-rule-no-vendor-prefix',
  'media-feature-name-no-vendor-prefix',
  'property-no-vendor-prefix',
  'selector-no-vendor-prefix',
  'value-no-vendor-prefix'
]

const BUG_MAJOR = [
  'declaration-block-no-duplicate-custom-properties',
  'declaration-block-no-duplicate-properties',
  'keyframe-declaration-no-important',
  'font-family-no-missing-generic-family-keyword',
  'at-rule-no-unknown',
  'function-no-unknown',
  'media-feature-name-no-unknown',
  'selector-pseudo-class-no-unknown',
  'selector-pseudo-element-no-unknown'
]

const BUG_MINOR = ['no-irregular-whitespace']

const BUG_INFO = []

// code smell
const CODE_SMELL_BLOCKER = []

const CODE_SMELL_CRITICAL = [
  'no-descending-specificity',
  'selector-pseudo-element-colon-notation'
]

const CODE_SMELL_MAJOR = [
  'font-family-no-duplicate-names',
  'no-duplicate-selectors',
  'block-no-empty',
  'string-no-newline',
  'no-empty-source',
  'function-name-case',
  'selector-type-case',
  'value-keyword-case',
  'declaration-block-single-line-max-declarations',
  'number-max-precision',
  'keyframe-selector-notation'
]

const CODE_SMELL_MINOR = [
  'length-zero-no-unit',
  'alpha-value-notation',
  'color-function-notation',
  'color-hex-length',
  'hue-degree-notation',
  'import-notation',
  'media-feature-range-notation',
  'selector-not-notation',
  'custom-media-pattern',
  'custom-property-pattern',
  'keyframes-name-pattern',
  'selector-class-pattern',
  'selector-id-pattern',
  'font-family-name-quotes',
  'function-url-quotes',
  'selector-attribute-quotes',
  'declaration-block-no-redundant-longhand-properties',
  'shorthand-property-no-redundant-values',
  'comment-whitespace-inside',
  'comment-no-empty',
  'at-rule-empty-line-before',
  'comment-empty-line-before',
  'custom-property-empty-line-before',
  'declaration-empty-line-before',
  'rule-empty-line-before'
]

const CODE_SMELL_INFO = []

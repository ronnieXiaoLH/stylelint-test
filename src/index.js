const path = require('path')
const stylelint = require('stylelint')
const {
  getFilesList,
  initCssConfig,
  initScssConfig,
  initLessConfig,
  initVueConfig
} = require('./utils')

const generateStylelintFn = (ext, initConfigFn) => {
  return async (targetPath, ignore, configBasedir) => {
    const files = getFilesList(targetPath, ignore, ext)
    const config = initConfigFn()

    return stylelint.lint({
      configBasedir,
      config,
      files: files.filter((item) => !item.endsWith('scssComp.vue'))
    })
  }
}

const stylelintCss = generateStylelintFn(['.css'], initCssConfig)

const stylelintScss = generateStylelintFn(['.scss'], initScssConfig)

const stylelintLess = generateStylelintFn(['.less'], initLessConfig)

const stylelintVue = generateStylelintFn(['.vue'], initVueConfig)

const stylelintTest = async function (targetPath, ignore) {
  let ruleMap = new Map()
  try {
    console.time('stylelint')
    const configBasedir = path.resolve(__dirname)
    let res = await Promise.all([
      stylelintCss(targetPath, ignore, configBasedir),
      stylelintScss(targetPath, ignore, configBasedir),
      stylelintLess(targetPath, ignore, configBasedir),
      stylelintVue(targetPath, ignore, configBasedir)
    ])
    console.timeEnd('stylelint')
    // console.log('res...', res)
    res.forEach((v) => {
      const ruleMetadata = v.ruleMetadata
      // console.log('ruleMetadata', ruleMetadata)
      const results = v.results.filter((item) => item.warnings.length)
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
    })
    console.log('ruleMap', ruleMap)
  } catch (error) {
    console.error(error.stack)
  }
}

stylelintTest(path.resolve(__dirname))

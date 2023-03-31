import { run } from 'node:test'
import path from 'path'
import { getTestFiles } from './helpers/getTestFiles.js'
import { printTestResult } from './helpers/printTestResult.js'

/**
 * @param testFiles
 * @returns {Promise<{ data: string; pass: boolean }>}
 */
const getTapDataAsync = (testFiles) => {
  let allData = ''
  let pass = true
  return new Promise((resolve, reject) => {
    const stream = run({
      files: testFiles,
    })
    stream.on('data', (data) => (allData += data.toString()))
    stream.on('test:fail', (data) => (pass = false))
    stream.on('close', (data) => resolve({ data: allData, pass }))
    stream.on('error', (err) => reject(err))
  })
}

const testRunner = async (testType = 'integration') => {
  const testFilesPath = `./test/${testType}`
  try {
    const testFiles = (await getTestFiles(path.resolve(testFilesPath)))
      .filter((f) => f.includes('test.js'))
      .map((p) => path.resolve(testFilesPath, p))

    const result = await getTapDataAsync(testFiles)
    if (result) {
      printTestResult(result.data, result.pass)
      if (result.pass) {
        return true
      }
    }
  } catch (err) {
    console.error('mainRunner Error:', err)
  }
  process.exit(1)
}

const testFolder = ['integration', 'e2e'].includes(process.argv[2])
  ? process.argv[2]
  : undefined

testRunner(testFolder).then()

import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from "rollup-plugin-uglify";

const defaultEnv = {
  ENDPOINT_HTTP: 'http://fakehost/{token}',
  ENDPOINT_WEBSOCKET: 'ws://fakehost/{token}',
  ENDPOINT_HEARTBEAT: 5000
}

const replaceEnv = Object.keys(defaultEnv).reduce((accumulator, key) => {
  accumulator['process.env.' + key] = JSON.stringify(process.env[key] || defaultEnv[key])
  return accumulator
}, {})

export default {
  input: './tests/custom/build.test.ts',
  output: {
    file: './build/tracker.js',
    format: 'umd',
    name: '@gauf/tracker',
    sourcemap: true
  },
  plugins: [
    replace(replaceEnv),
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
    uglify()
  ]
}

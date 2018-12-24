import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "./lib/tracker.ts",
  output: {
    file: "./build/tracker.js",
    format: "umd",
    name: "@gauf/tracker",
    sourcemap: true
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
    uglify()
  ]
}

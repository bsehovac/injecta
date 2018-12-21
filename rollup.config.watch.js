import scss from 'rollup-plugin-scss'

export default [
  {
    input: `./script/script.js`,
    plugins: [
      scss({ output: './inject/style.css' })
    ],
    output: {
      format: 'iife',
      file: `./inject/script.js`,
      indent: '\t',
      sourceMap: false,
    },
    watch: {
      exclude: ['node_modules/**', 'inject/**']
    }
  }
];

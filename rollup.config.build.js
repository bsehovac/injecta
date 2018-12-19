import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify-es';
import scss from 'rollup-plugin-scss'

export default [
  {
    input: `./script/script.js`,
    plugins:[
      babel({ exclude: 'node_modules/**' }),
      uglify(),
      scss({ output: './inject/style.css' })
    ],
    output: {
      format: 'iife',
      file: `./inject/script.js`,
      indent: '\t',
      sourceMap: false,
    }
  }
];

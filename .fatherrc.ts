export default {
  esm: 'babel',
  cjs: 'babel',
  umd: {
    name: 'rehox',
    globals: { 'react': 'React' },
  },
  disableTypeCheck: true,
}

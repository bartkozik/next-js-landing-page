module.exports = {
  multipass: true,
  plugins: [
    'removeDimensions',
    'removeViewBox',
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ viewBox: '0 0 24 24' }],
      },
    },
  ],
};

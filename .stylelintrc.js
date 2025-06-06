module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-sass-guidelines'
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order'
  ],
  ignoreFiles: [
    'dist/',
    '**/*.js',
    '**/*.sass',
    'src/sass/foundation/**/*.scss',
    'src/sass/bootstrap/**/*.scss',
    'src/sass/vendor/**/*.scss'
  ],
  rules: {
    'max-nesting-depth': null,
    'no-empty-source': null,
    'no-descending-specificity': null,
    'order/properties-alphabetical-order': null,
    'property-no-vendor-prefix': null,
    'selector-max-compound-selectors': null,
    'scss/at-import-partial-extension-blacklist': null,
    'value-no-vendor-prefix': null,
    'indentation': 2,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['window-inactive']
    }],
    'selector-no-qualifying-type': [true, {
      ignore: ['class']
    }],
    'order/order': [
      [
        { type: 'at-rule', name: 'include', parameter: 'breakpoint' },
        { type: 'at-rule', name: 'include', parameter: 'breakpoint-between' },
        { type: 'at-rule', name: 'include', parameter: 'breakpoint-hover' },
        { type: 'at-rule', name: 'include', parameter: 'media-breakpoint-up' },
        { type: 'at-rule', name: 'include', parameter: 'media-breakpoint-down' },
        { type: 'at-rule', name: 'include', parameter: 'media-breakpoint-only' },
        { type: 'at-rule', name: 'include', parameter: 'media-breakpoint-between' },
        { type: 'at-rule', name: 'include', parameter: 'media-breakpoint-number' }
      ],
      { unspecified: 'ignore' }
    ],
    'order/properties-order': [
      'counter-reset',
      'counter-increment',
      'content',
      'position',
      'z-index',
      'top',
      'bottom',
      'right',
      'left',
      'display',
      'align-items',
      'justify-content',
      'flex',
      'flex-direction',
      'flex-wrap',
      'order',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-bottom',
      'margin-right',
      'margin-left',
      'padding',
      'padding-top',
      'padding-bottom',
      'padding-right',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-style',
      'font-weight',
      'font-variant',
      'line-height',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'text-transform',
      'letter-spacing',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transform',
      'transform-origin',
      'transition'
    ]
  }
};

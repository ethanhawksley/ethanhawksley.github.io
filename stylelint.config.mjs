/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-recess-order'],
  customSyntax: 'postcss-html',
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};

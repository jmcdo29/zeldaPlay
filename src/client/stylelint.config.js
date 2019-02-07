module.exports = {
  extends: [
    "stylelint-config-recommended-scss"
  ],
  rules: {
    "selector-type-no-unknown": [true, {
      ignoreNamespaces: [/^mat-/],
      ignoreTypes: [/^mat-/]
    }
    ]
  }
};

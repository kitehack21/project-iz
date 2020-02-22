module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "jest": true,
      "node": true
    },
    "extends": [
      "airbnb",
      "airbnb/hooks",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/typescript",
      "plugin:jest/recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "prettier",
      "prettier/@typescript-eslint",
      "prettier/react"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2018,
      "jsx": true,
      "sourceType": "module",
      "useJSXTextNode": true
    },
    "plugins": ["@typescript-eslint", "import", "jest", "react", "react-hooks", "prettier"],
    "rules": {
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          "allowExpressions": true,
          "allowTypedFunctionExpressions": true
        }
      ],
      "@typescript-eslint/explicit-member-accessibility": "off",   
      "@typescript-eslint/no-explicit-any": "off", 
      "@typescript-eslint/no-non-null-assertion": "off", 
      "import/order": 2,
      "import/no-extraneous-dependencies": 0,
      "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": [0],
      "jsx-a11y/media-has-caption": "off",
      "no-console": "off",
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
          mjs: 'never',
        },
      ]
    },
    "settings": {
      "react": {
        "version": "detect"
      },
      "import/extensions": [".js",".jsx",".ts",".tsx"],
      "import/resolver": {
        "node": {
          "paths": ["src"],
          "extensions": [".js",".jsx",".ts",".tsx"]
        }
      },
    }
  }
  
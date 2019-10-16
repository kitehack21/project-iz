module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "jest": true,
      "node": true
    },
    "extends": [
      "airbnb",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/typescript",
      "plugin:jest/recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
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
    "plugins": ["@typescript-eslint", "import", "jest", "react", "prettier"],
    "rules": {
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          "allowExpressions": true,
          "allowTypedFunctionExpressions": true
        }
      ],
      "@typescript-eslint/explicit-member-accessibility": "off",    
      "import/no-extraneous-dependencies": 0,
      "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
      "react/prop-types": [0]
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
  
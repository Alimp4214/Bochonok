module.exports = {
    env: {
        es2021: true,
        node: true
    },
    plugins: ["prettier"],
    extends: ["airbnb-base", "prettier", "plugin:prettier/recommended"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        "no-continue": "off",
        "no-plusplus": "off",
        eqeqeq: "off",
        "import/prefer-default-export": "off",
        "lines-between-class-members": "off",
        "no-unused-vars": "warn",
        "no-return-await": "off",
        "class-methods-use-this": "off",
        "import/no-cycle": "off",
        "consistent-return": "off",
        "no-console": "off",
        "no-undef": "error",
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "import-order": "off",
        indent: ["error", 4],
        "import/order": "off",
        "no-restricted-syntax": "off",
        "no-await-in-loop": "off",
        "no-param-reassign": "off",
        "no-underscore-dangle": "off",
        "no-template-curly-in-string": "off",
        "func-names": "off"
    }
};

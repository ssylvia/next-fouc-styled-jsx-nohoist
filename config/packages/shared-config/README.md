# Shared Config

## Install

Install the package

```sh
lerna add shared-config --dev --scope=MONO_REPO_PACKAGE_NAME
```

## Lint and Format Code Automatically

Add the `precommit` script to the `package.json` in package root:

```json
"scripts": {
  "precommit": "lint-staged"
}
```

Set up the following base config files:

- [TSLint](./tslint/README.md)

Add the `lint-staged` section to the `package.json` (modify as needed).

```json
"lint-staged": {
  "linters": {
      "*.{js,jsx,ts,tsx,json,md}": [
        "prettier --write",
        "git add"
      ],
      "*.{js,jsx,ts,tsx}": [
        "tslint --fix",
        "git add"
      ]
    },
    "ignore": [
      ".storybook/build/**/*",
      "coverage/**/*",
      "node_modules/**/*",
      "build/**/*"
    ]
},
```

## Storybook

See [Storybook Docs](./storybook/README.md)

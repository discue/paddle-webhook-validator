# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.5.0](https://github.com/discue/paddle-webhook-validator/compare/v1.4.0...v1.5.0) (2022-12-11)


### Chores

* update module name in log messages ([d7ad0bb](https://github.com/discue/paddle-webhook-validator/commit/d7ad0bb86f5902e53660d61544905649adf2939c))

## [1.4.0](https://github.com/discue/paddle-webhook-validator/compare/v1.3.0...v1.4.0) (2022-11-28)


### Features

* log validation errors ([03a4340](https://github.com/discue/paddle-webhook-validator/commit/03a434082860a8d2043b38fe5420a2a78be67559))
* log verification and validation errors ([245dc1b](https://github.com/discue/paddle-webhook-validator/commit/245dc1bd8da94ceec93c083cc01ee09e54a313a1))


### Chores

* add simple log format ([cffffd4](https://github.com/discue/paddle-webhook-validator/commit/cffffd4c2e770b2113b3b5b8189a71057eaf53a3))
* update logging for failed URI validation ([28db505](https://github.com/discue/paddle-webhook-validator/commit/28db505d9ad6a9279c72114507f30869f76177ca))

## [1.3.0](https://github.com/discue/paddle-webhook-validator/compare/v1.2.0...v1.3.0) (2022-11-27)


### Features

* log if property gets deleted from payload ([80ffbf2](https://github.com/discue/paddle-webhook-validator/commit/80ffbf2d83ffa05353a2a623b034520d79d3a22a))

## [1.2.0](https://github.com/discue/paddle-webhook-validator/compare/v1.1.0...v1.2.0) (2022-11-27)


### Features

* allow all date to optionally contain time ([e4c4762](https://github.com/discue/paddle-webhook-validator/commit/e4c4762dd9b26660d0b3995f8bfeb989c0c01216))
* also validate custom_data properties ([8fc9944](https://github.com/discue/paddle-webhook-validator/commit/8fc9944ec710818edc496f29fbf07e468ad8e151))
* use less loops for validation ([0f6a0f0](https://github.com/discue/paddle-webhook-validator/commit/0f6a0f085ab11ef57bac859c851f9266c749917f))


### Chores

* **deps-dev:** update dependencies ([1228964](https://github.com/discue/paddle-webhook-validator/commit/122896421342b6ba9dbb79fe2ffd883832ad4843))
* update readme ([28136af](https://github.com/discue/paddle-webhook-validator/commit/28136af6855ee1ee91127fbc0d359353429cc5ff))

## [1.1.0](https://github.com/discue/paddle-webhook-validator/compare/v1.0.0...v1.1.0) (2022-10-09)


### Features

* allow all dates to optionally contain time ([a818250](https://github.com/discue/paddle-webhook-validator/commit/a818250afb79c9a75c5dc72c529f9cea3b02719e))
* **verify:** return false immediately if signature is falsy ([aba0b3e](https://github.com/discue/paddle-webhook-validator/commit/aba0b3e2900b539abb7b95a694a317802440b50c))


### Chores

* add badges ([58f0076](https://github.com/discue/paddle-webhook-validator/commit/58f0076f29bc5065d76f1d54cd6744703a8305b5))
* add standard-version config ([a3245e7](https://github.com/discue/paddle-webhook-validator/commit/a3245e75cba3e7ea9a23118caa60d4c60369ab17))
* allow node env in eslint ([3b97fe4](https://github.com/discue/paddle-webhook-validator/commit/3b97fe4358c070d324ce5deac6894c00b9375481))
* **deps-dev:** bump eslint from 8.22.0 to 8.23.0 ([f70efa8](https://github.com/discue/paddle-webhook-validator/commit/f70efa81e9caa99794fdfdd17832a31f1b30f61a))
* **deps-dev:** bump eslint from 8.23.0 to 8.24.0 ([0ca1fc6](https://github.com/discue/paddle-webhook-validator/commit/0ca1fc64ec8ca6fa34cd5504903ad5e2a8961e28))
* **deps-dev:** bump nodemon from 2.0.19 to 2.0.20 ([252bbec](https://github.com/discue/paddle-webhook-validator/commit/252bbec251c0ae09ca50d68a935a5f2c3b64e80d))
* **deps:** bump actions/stale from 5 to 6 ([2724d74](https://github.com/discue/paddle-webhook-validator/commit/2724d748bdbafd944612e85e9779c47eed37a2e8))
* run tests before release ([064d13c](https://github.com/discue/paddle-webhook-validator/commit/064d13ce3769f73044e105742ab0cd06ca50cd10))
* **verify:** convert signature to buffer before verify ([45a4c5a](https://github.com/discue/paddle-webhook-validator/commit/45a4c5a7ceb64afe895a0dec57205181540616f1))

## [1.0.0](https://github.com/discue/paddle-webhook-validator/compare/v0.1.1...v1.0.0) (2022-08-20)


### Features

* allow apps to pass pk also as string ([1b02de9](https://github.com/discue/paddle-webhook-validator/commit/1b02de9a4da82bc911d78e2c2b59d6597358f74a))
* make allowed hosts and public key configurable ([9f24b03](https://github.com/discue/paddle-webhook-validator/commit/9f24b03bdd83c77aaac45994b860c31368b67f83))
* return a plain middleware function ([fa36626](https://github.com/discue/paddle-webhook-validator/commit/fa3662659da86df83d3687b5588914c99b1ddcbd))

## 0.1.1 (2022-08-20)
### Chores
* chore(release): 0.1.1 ([45e5abd](https://github.com/discue/paddle-webhook-validator/commit/45e5abd))
* chore: set version for initial release ([e505225](https://github.com/discue/paddle-webhook-validator/commit/e505225))
* chore: update package name ([77bcdbf](https://github.com/discue/paddle-webhook-validator/commit/77bcdbf))
* chore: add validator code ([95f79fa](https://github.com/discue/paddle-webhook-validator/commit/95f79fa))
* chore: add release notes scripts ([ea46962](https://github.com/discue/paddle-webhook-validator/commit/ea46962))
* chore: add github workflow files ([cfc98b3](https://github.com/discue/paddle-webhook-validator/commit/cfc98b3))
* chore: add gitignore ([6ee0917](https://github.com/discue/paddle-webhook-validator/commit/6ee0917))
* chore: add package files ([c66cc40](https://github.com/discue/paddle-webhook-validator/commit/c66cc40))
* chore: add eslint config ([19add89](https://github.com/discue/paddle-webhook-validator/commit/19add89))
* chore: add license ([6367fd9](https://github.com/discue/paddle-webhook-validator/commit/6367fd9))

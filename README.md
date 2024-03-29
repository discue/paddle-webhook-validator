
<p align="center">
<a href="https://www.discue.io/" target="_blank" rel="noopener noreferrer"><img width="128" src="https://www.discue.io/icons-fire-no-badge-square/web/icon-192.png" alt="Vue logo">
</a>
</p>

<br/>
<div align="center">

[![GitHub tag](https://img.shields.io/github/tag/discue/paddle-webhook-validator?include_prereleases=&sort=semver&color=blue)](https://github.com/discue/paddle-webhook-validator/releases/)
[![Latest Stable Version](https://img.shields.io/npm/v/@discue/paddle-webhook-validator.svg)](https://www.npmjs.com/package/@discue/paddle-webhook-validator)
[![License](https://img.shields.io/npm/l/@discue/paddle-webhook-validator.svg)](https://www.npmjs.com/package/@discue/paddle-webhook-validator)
<br/>
[![NPM Downloads](https://img.shields.io/npm/dt/@discue/paddle-webhook-validator.svg)](https://www.npmjs.com/package/@discue/paddle-webhook-validator)
[![NPM Downloads](https://img.shields.io/npm/dm/@discue/paddle-webhook-validator.svg)](https://www.npmjs.com/package/@discue/paddle-webhook-validator)
<br/>
[![contributions - welcome](https://img.shields.io/badge/contributions-welcome-blue)](/CONTRIBUTING.md "Go to contributions doc")
[![Made with Node.js](https://img.shields.io/badge/Node.js->=12-blue?logo=node.js&logoColor=white)](https://nodejs.org "Go to Node.js homepage")

</div>

# paddle-webhook-validator
NodeJS middleware for validation of Paddle.com [Webhooks](https://developer.paddle.com/webhook-reference/ZG9jOjI1MzUzOTg2-verifying-webhooks).

This module supports validating hook so [Paddle Billing](https://developer.paddle.com/webhooks/overview) and the legacy [Paddle Classic](https://developer.paddle.com/classic/webhook-reference/bd1986c817a40-webhook-reference).

## Installation
```bash
npm install @discue/paddle-webhook-validator
```

## Usage
The validator can be used like any old [ExpressJS](https://expressjs.com/) [middleware](https://expressjs.com/en/guide/using-middleware.html). 
The example below show usage of the validator in conjunction with [ExpressJS Router](http://expressjs.com/en/5x/api.html#router) which is optional.

The library as a whole can be used with CommonJS and ES6.
### Paddle Billing
```js
import factory from '@discue/paddle-webhook-validator/billing'
import express from 'express'

const router = express.Router()
const middleware = factory({ signatureValidation: { secretKey: process.env.PADDLE_HOOK_SECRET_KEY } })

router.use(middleware)

router.use((req, res) => {
    // handle actual payload here
})

export default router
```

### Paddle Classic (Legacy)


```js
import paddleWebhookValidator from '@discue/paddle-webhook-validator'
import express from 'express'
import sendError from '../http/http-errors.js'

const router = express.Router()

router.use(paddleWebhookValidator({
    publicKeyFilePath: './pk.txt',
    allowedHttpHosts: ['paddle.com'],
    allowedHttpsHosts: ['paddle.com']
}))

router.use((_err, _req, res, _next) => {
    sendError.badRequest(res, {
        request: 'Must contain valid payload and signature.'
    })
})

router.use((req,res) => {
    // handle actual payload here
})

export default router
```

### Parameters
- `publicKeyText`: The public key that will be used to [verify the signature](https://developer.paddle.com/webhook-reference/ZG9jOjI1MzUzOTg2-verifying-webhooks) of a webhook. You can find this public key in your Paddle Dashboard under Developer Tools > Public Key. The library expects a PEM encoded string.
- `publicKeyFilePath`: The public key file that will be read and used to [verify the signature](https://developer.paddle.com/webhook-reference/ZG9jOjI1MzUzOTg2-verifying-webhooks) of a webhook. You can find this public key in your Paddle Dashboard under Developer Tools > Public Key. The library expects a PEM encoded string.
- `allowedHttpHosts`: limits domains that can be used in urls like update_url. Most likely you can stick with the default, which is `paddle.com`. 
- `allowedHttpHosts`: limits domains that can be used in urls like update_url. Most likely you can stick with the default, which is `paddle.com`.

## Run Tests

To run tests, run the following command

```bash
  npm run test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)


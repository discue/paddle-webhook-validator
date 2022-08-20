
<p align="center"><a href="https://www.discue.io/" target="_blank" rel="noopener noreferrer"><img width="128" src="https://www.discue.io/icons-fire-no-badge-square/web/icon-192.png" alt="Vue logo"></a></p>

# paddle-webhook-validator

A collection of vue.js components used in discue.io.

## Installation

Install with npm

```bash
  npm install @discue/paddle-webhook-validator
```

## Usage
The validator can be used like any old [ExpressJS](https://expressjs.com/) [middleware](https://expressjs.com/en/guide/using-middleware.html). 
The example below show usage of the validator in conjunction with [ExpressJS Router](http://expressjs.com/en/5x/api.html#router) which is optional.

The library as a whole can be used with CommonJS and ES6.

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
- `allowedHttpHosts`: limits domains that can be used in urls like cancel_url. Most likely you can stick with the default, which is `paddle.com`. To ensure that communication is always encrypted you can also provide an empty array here.
- `allowedHttpHosts`: limits domains that can be used in urls like cancel_url. Most likely you can stick with the default, which is `paddle.com`.

## Run Tests

To run tests, run the following command

```bash
  npm run test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)


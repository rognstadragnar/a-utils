<div align="center">
  <img src="https://raw.githubusercontent.com/rognstadragnar/a-utils/master/logo.png" alt="a-utils">  
</div>

# A-utils

## Motivation

Abort, retry, timeout or delay async functions with less suck

## Usage

```Javascript
npm i a-utils // Soon™
```

#### Timeout

```Javascript
import { timeoutable } from 'a-utils'

const req = timeoutable(fetch('https://something.com'), 2000)
  .then(/* do something */)
  .catch(console.error)

// Throws error if fetch doesn't respond within 2 seconds
```

#### Retry

```Javascript
import { retryable } from 'a-utils'

const req = retryable(fetch('https://something.com'), 3)
  .then(/* do something */)
  .catch(console.error)

// Retries the fetch 3 times before throwing the error
```

#### Abort

```Javascript
import { abortable } from 'a-utils'

const req = abortable(fetch('https://something.com'))

req.exec()
  .then(/* something */)
  .catch(console.error)

// Oh no! Something bad happened somewhere in my app...
req.abort()
// Throws error
```

#### Delay

Will wait a certain amout of time in milliseconds before executing the function:

```Javascript
import { delayable } from 'a-utils'

const req = delayable(fetch('https://something.com'), 2000)
  .then(/* do something */)
  .catch(console.error)

// executes the fetch after 2 seconds
```

Alternatively you can use the `delayable` function in a promise then-chain

```Javascript
import { delayable } from 'a-utils'

const req = fetch('https://something.com')
  .then(res => delayable(res, 2000))
  .then(/* do something */)
  .catch(console.error)

// Executes the fetch right away then waits 2 seconds
```

#### Composability

The beaty with this single purpose approach is that it is composable.

Say you want a do a `fetch` that times out after 2 seconds but retries 3 times before throwing an error. Of course you want to be able to abort the request as well.

```Javascript
import { timeoutable, retryable, abortable } from 'a-utils'

const retryableReq = retryable(fetch('https://something.com'), 3)
const timeoutableReq = timeoutable(retryable, 2000)
const req = abortable(retryable)

req.exec().then(/* do something */).catch(console.error)

// Oh no! Something bad happened somewhere in my app...
req.abort()
```

## License

[MIT](LICENSE).

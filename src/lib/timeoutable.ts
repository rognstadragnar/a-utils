function createTimer(TIMEOUT, cb) {
  return setTimeout(cb, TIMEOUT)
}

const timeoutable = (somethingAsync, time = 0): Promise<any> => {
  let hasTimedout = false
  let timeout = null

  const runFn = (resolve, reject) => {
    const cb = () => {
      hasTimedout = true
      reject(new Error(`Exceeded timelimit of ${time}.`))
    }
    timeout = createTimer(time, cb)
    somethingAsync
      .then(response => {
        clearTimeout(timeout)
        if (!hasTimedout) {
          resolve(response)
        }
        return response
      })
      .catch(err => {
        reject(err)
      })
  }

  // @ts-ignore because tslint bugs out
  return new Promise<any>((resolve, reject) => {
    runFn(resolve, reject)
  })
}

export { timeoutable }

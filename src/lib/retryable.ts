const retryable = (
  somethingAsync: Promise<any>,
  retryCount: number
): Promise<any> => {
  const runFn = (resolve, reject) => {
    somethingAsync
      .then(response => {
        return response
      })
      .catch(err => {
        if (0 < retryCount) {
          runFn(resolve, reject)
          retryCount -= 1
        } else {
          reject(err)
        }
      })
  }

  // @ts-ignore because tslint bugs out
  return new Promise<any>((resolve, reject) => {
    runFn(resolve, reject)
  })
}

export { retryable }

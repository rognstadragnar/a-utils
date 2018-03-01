export interface IAbortable {
  abort: () => void
  exec: () => Promise<any>
}

const abortable = (somethingAsync: Promise<any>): IAbortable => {
  let isCanceled = false
  const exec = () =>
    // @ts-ignore because tslint bugs out
    new Promise((resolve, reject) => {
      somethingAsync
        .then(response => {
          if (isCanceled) {
            reject(new Error('Was aborted'))
          } else {
            resolve(response)
          }
        })
        .catch(err => reject(err))
    })

  return {
    abort: () => {
      isCanceled = true
    },
    exec
  }
}

export { abortable }

const isPromise = (arg: any): boolean =>
  arg && arg.then && typeof arg.then === 'function'

const delayable = (something: any, delay: number): Promise<any> => {
  // @ts-ignore because tslint bugs out
  return new Promise((resolve, reject) => {
    // @ts-ignore because tslint bugs out
    new Promise(innerResolve => setTimeout(() => innerResolve(), delay)).then(
      _ =>
        isPromise(something)
          ? something.then(resolve).catch(reject)
          : resolve(something)
    )
  })
}

export { delayable }

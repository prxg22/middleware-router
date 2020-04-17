const injectState = (middlewares, initial = {}, setState) => {
  let state = initial

  const get = () => {
    return state
  }

  const set = obj => {
    state = { ...state, ...obj }
  }

  const applyToState = ({ getState }) => {
    setState(getState())
  }

  const inject = middleware => args =>
    middleware({
      ...args,
      getState: get,
      setState: set,
    })

  return [...middlewares, applyToState].map(inject)
}

export default injectState

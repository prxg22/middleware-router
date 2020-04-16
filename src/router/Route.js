import * as React from 'react'
import { useHistory, Route as ReactRouterRoute } from 'react-router-dom'

const runMiddlewares = (middlewares, args, i = 0) => {
  const next = () => runMiddlewares(middlewares, args, i + 1)
  const middleware = middlewares[i]

  if (!middleware) return Promise.resolve()
  return (middleware(args) || Promise.resolve()).then(next)
}

class RedirectError extends Error {
  constructor(path) {
    super(`redirecting to ${path}`)
    this.path = path
  }
}

const Route = ({
  middlewares,
  loading = null,
  path,
  component: Component,
  ...props
}) => {
  const [running, toggle] = React.useReducer(state => !state, true)
  const history = useHistory()

  React.useEffect(() => {
    if (!middlewares || !middlewares.length) {
      toggle()
      return
    }

    const evaluateMiddlewares = async () => {
      const redirect = path => {
        throw new RedirectError(path)
      }

      try {
        await runMiddlewares(middlewares, {
          redirect,
          path: history.location.path,
        })

        toggle()
      } catch (e) {
        if (e instanceof RedirectError) {
          history.replace(e.path)
          console.log(e.message)
        } else {
          throw e
        }
      }
    }

    evaluateMiddlewares()
  }, [history])

  if (running) return loading
  return <ReactRouterRoute {...props} />
}

export default Route

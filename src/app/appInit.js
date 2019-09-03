import { createApp } from 'af-core'
import sagaPlugin from "af-saga"
import reduxPlugin from "af-redux"
import routerPlugin from "af-router"
import renderPlugin from "af-render"

function init(opt = {}) {
  let app = createApp()
  app.use({
    hooks: {
      "onError": (e) => {
        console.log("error", e)
      }
    }
  })
  app.use(routerPlugin, {})
  app.use(reduxPlugin, {})
  app.use(sagaPlugin, {})
  app.use(renderPlugin, {})
  app.start(opt)
  return app
}

const app = init()

export default app

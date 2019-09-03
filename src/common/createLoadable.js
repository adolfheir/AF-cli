
import Loadable from 'react-loadable'

let defaultLoadingComponent = () => null
export function setDefaultLoadingComponent (cmp) {
  defaultLoadingComponent = cmp
}

export function createLoadable (loader, options) {
  return Loadable({
    loader,
    loading: defaultLoadingComponent,
    ...options
  })
}

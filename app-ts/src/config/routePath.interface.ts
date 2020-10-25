import IApplicationRoute from './route.interface'

interface IRoutePath {
  readonly path: string,
  readonly router: IApplicationRoute
}

export default IRoutePath

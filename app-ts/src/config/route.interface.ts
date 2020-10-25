import { Router } from 'express'

interface IAppRoute {
  createRouter(router: any): Router
}

export default IAppRoute

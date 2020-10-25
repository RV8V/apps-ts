import { Express, Router } from 'express'
import IRoutePath from '../config/routePath.interface'
import UserRoute from './user.route'

export default class AppRoutes {
  private routeList: IRoutePath[] = [
    { path: '/user', router: UserRoute }
  ]

  public mount(expApp: Express): void {
    this.routeList.forEach(item => {
      expApp.use(
        item.path,
        item.router.createRouter(Router)
      )
    })
  }
}

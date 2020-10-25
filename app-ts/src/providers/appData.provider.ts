import DataProvider from './data.provider'
import UserDataProvider from './user.provider'

export default class ApplicationDataProviders {
  private dataProvidersStorage: DataProvider[]

  public onstructor() {
    this.dataProvidersStorage = this.getProviders()
      .map(provider => new provider())
    }

  public get user(): UserDataProvider {
    return this.getInstanceProvider(UserDataProvider)
  }

  private getInstanceProvider(type: any): any | null {
    const items = this.dataProvidersStorage.filter(provider => {
      if (provider instanceof type) return provider
    })
    return items.length > 0 ? items[0] : null
  }

  private getProviders(): any[] {
    return [UserDataProvider]
  }
}

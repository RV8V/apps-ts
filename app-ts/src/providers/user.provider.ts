import DataProvider from './data.provider'
import User from '../entities/user.entity'

export default class UserDataProvider extends DataProvider {
  public constructor() {
    super('User')
  }

  public select(from: any, onSelect: (err: any, users: User[]) => void) {
    this.db_store.find(from, onSelect)
  }

  public create(data: User, onCreate: (err: any, newData: User) => void) {
    console.log({ data })
    this.db_store.insert(data, onCreate)
  }

  public update(from: any, newData: User, onUpdate?: (err: any, numReplaced: number) => void) {
    this.db_store.update(from, { $set: newData })
  }

  public delete(from: any, onDelete?: (err: any, numRemoved: number) => void) {
    this.db_store.remove(from, { multi: true }, onDelete)
  }

  public findOne(from: any, onSelect: (err: any, user: User) => void) {
    this.db_store.findOne(from, onSelect)
  }

  protected onLoadStore(err: any): void {
    if (err) console.log(err)
  }
}

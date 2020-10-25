import * as path from 'path'
import * as nedb from 'nedb'

export default abstract class DataProvider {
  static readonly DATABASE_STORE = path.normalize(__dirname + '/../../db/');

  protected db_store: nedb
  protected abstract onLoadStore(err: any): void

  public constructor(storeName = 'data') {
    this.db_store = new nedb({
      filename: DataProvider.DATABASE_STORE + storeName + '.db'
    })
    this.db_store.loadDatabase((err: any) => {
      this.onLoadStore(err)
    })
  }

  protected vacuumStore(): void {
    if (this.db_store instanceof nedb) {
      this.db_store.persistence.compactDatafile()
    }
  }
}

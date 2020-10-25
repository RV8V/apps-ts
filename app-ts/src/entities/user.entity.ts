export default class User {
  public _id: string 
  public email: string
  public password: string
  public name: string
  public reated: string
  public lastVisit: string

  private constructor() {
    let date = Date.now().toString()
    this.created = date
    this.lastVisit = date
  }
}

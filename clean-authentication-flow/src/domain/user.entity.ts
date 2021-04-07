export default class UserEntity {
  public constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
    private readonly type: string
  ) {}
}

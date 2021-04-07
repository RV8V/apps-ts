import UserEntity from '../../domain/user.entity.ts'

export default interface IUserReadOnlyRepository {
  public readonly fetch(): Promise<UserEntity>
}

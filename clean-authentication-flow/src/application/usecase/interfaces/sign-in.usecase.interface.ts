import IUserDto from '../dto/user.dto.ts'

export default interface ISignInUseCase {
  public readonly signIn(userDto: IUserDto): Promise<IUserDto>
}

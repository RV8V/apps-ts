import ISignInUseCase from './interfaces/sign-in.usecase.interface.ts'
import IUserDto from './dto/user.dto.ts'
import IUserReadOnlyRepository from '../repositories/user.repository.interface.ts'

export default class SignInUseCase implements ISignInUseCase {
  public constructor(
    private readonly userReadOnlyRepository: IUserReadOnlyRepository
  ) {}

  public async signIn(userDto: IUserDto): Promise<IUserDto> {
    throw new Error('method not implemented')
  }
}

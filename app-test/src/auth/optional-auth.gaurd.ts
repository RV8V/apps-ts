import { AuthGuard } from "@nestjs/passport"

export class OptinalAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    return user
  }
}

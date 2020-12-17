// import {MigrationInterface, QueryRunner} from "typeorm";
//
// export class SeedCategory1608210563097 implements MigrationInterface {
//
//     public async up(queryRunner: QueryRunner): Promise<void> {
//     }
//
//     public async down(queryRunner: QueryRunner): Promise<void> {
//     }
//
// }

import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { UserPermissionSeed } from "./permission.seed";
import { UserRoleSeed } from "./role.seed";

export class SeedPermissionsAndRoles1556357483083
  implements MigrationInterface {
  public async up(_: QueryRunner): Promise<any> {
    const permissions = await getRepository("permissions").save(
      UserPermissionSeed
    );
    const userRoleSeed: any = UserRoleSeed;
    userRoleSeed.permissions = permissions;
    await getRepository("roles").save(userRoleSeed);
  }

  public async down(_: QueryRunner): Promise<any> {
  }
}

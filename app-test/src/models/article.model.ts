import { IsString, IsArray, IsOptional } from 'class-validator'

export class CreateArticleDto {
  @IsString()
  readonly title: string

  @IsString()
  readonly body: string

  @IsString()
  readonly description: string

  @IsArray()
  @IsString({ each: true })
  readonly tagList: string[]
}

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  readonly title: string

  @IsString()
  @IsOptional()
  readonly body: string

  @IsString()
  @IsOptional()
  readonly description: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly tagList: string[]
}

export interface FindFeedQuery {
  readonly limit?: number
  readonly offset?: number
}

export interface FindAllQuery extends FindFeedQuery {
  readonly tag?: string
  readonly author?: string
  readonly favorited?: string
}

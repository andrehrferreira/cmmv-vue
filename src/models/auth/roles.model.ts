/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import * as fastJson from 'fast-json-stringify';

import { Expose, instanceToPlain, plainToInstance } from 'class-transformer';

import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export interface IRoles {
  id?: any;
  name: string;
}

//Model
export class Roles implements IRoles {
  @Expose()
  @IsOptional()
  id?: any;

  @Expose({ toClassOnly: true })
  @IsOptional()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString({ message: 'Invalid name' })
  @MinLength(3, { message: 'Invalid name' })
  @MaxLength(40, { message: 'Invalid name' })
  name: string;

  constructor(partial: Partial<Roles>) {
    Object.assign(this, partial);
  }

  public serialize() {
    return instanceToPlain(this);
  }

  public static fromPartial(partial: Partial<Roles>): Roles {
    return plainToInstance(Roles, partial, {
      exposeUnsetFields: false,
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  public static fromEntity(entity: any): Roles {
    return plainToInstance(this, entity, {
      exposeUnsetFields: false,
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  public toString() {
    return RolesFastSchema(this);
  }
}

// Schema
export const RolesFastSchemaStructure = {
  title: 'Roles Schema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: false,
    },
    name: {
      type: 'string',
      nullable: false,
    },
  },
  required: ['id', 'name'],
};

export const RolesFastSchema = fastJson(RolesFastSchemaStructure);

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

import { Roles, RolesFastSchemaStructure } from '@models/auth/roles.model';

export interface IGroups {
  id?: any;
  name: string;
  roles?: object | string | string[];
}

//Model
export class Groups implements IGroups {
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

  @Expose()
  roles?: Roles[] | string[] | null;

  constructor(partial: Partial<Groups>) {
    Object.assign(this, partial);
  }

  public serialize() {
    return instanceToPlain(this);
  }

  public static fromPartial(partial: Partial<Groups>): Groups {
    return plainToInstance(Groups, partial, {
      exposeUnsetFields: false,
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  public static fromEntity(entity: any): Groups {
    return plainToInstance(this, entity, {
      exposeUnsetFields: false,
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  public toString() {
    return GroupsFastSchema(this);
  }
}

// Schema
export const GroupsFastSchemaStructure = {
  title: 'Groups Schema',
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
    roles: {
      type: 'array',
      nullable: true,
      items: RolesFastSchemaStructure,
    },
  },
  required: ['id', 'name'],
};

export const GroupsFastSchema = fastJson(GroupsFastSchemaStructure);

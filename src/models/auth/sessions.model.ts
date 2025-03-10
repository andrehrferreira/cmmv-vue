/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

import * as fastJson from 'fast-json-stringify';

import { Expose, instanceToPlain, plainToInstance } from 'class-transformer';

import { IsOptional, IsNotEmpty } from 'class-validator';

import { User, UserFastSchemaStructure } from '@models/auth/user.model';

export interface ISessions {
  id?: any;
  uuid: string;
  fingerprint: string;
  user: object | string | string[];
  ipAddress: string;
  device?: string;
  browser?: string;
  os?: string;
  revoked: boolean;
  userAgent?: string;
}

//Model
export class Sessions implements ISessions {
  @Expose()
  @IsOptional()
  id?: any;

  @Expose({ toClassOnly: true })
  @IsOptional()
  id: string;

  @Expose()
  @IsNotEmpty()
  uuid: string;

  @Expose()
  @IsNotEmpty()
  fingerprint: string;

  @Expose()
  @IsNotEmpty()
  user: User | string | null;

  @Expose()
  @IsNotEmpty()
  ipAddress: string;

  @Expose()
  device?: string;

  @Expose()
  browser?: string;

  @Expose()
  os?: string;

  @Expose()
  @IsNotEmpty()
  revoked: boolean = false;

  @Expose()
  userAgent?: string;

  constructor(partial: Partial<Sessions>) {
    Object.assign(this, partial);
  }

  public serialize() {
    return instanceToPlain(this);
  }

  public static fromPartial(partial: Partial<Sessions>): Sessions {
    return plainToInstance(Sessions, partial, {
      exposeUnsetFields: false,
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  public static fromEntity(entity: any): Sessions {
    return plainToInstance(this, entity, {
      exposeUnsetFields: false,
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });
  }

  public toString() {
    return SessionsFastSchema(this);
  }
}

// Schema
export const SessionsFastSchemaStructure = {
  title: 'Sessions Schema',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: false,
    },
    uuid: {
      type: 'string',
      nullable: false,
    },
    fingerprint: {
      type: 'string',
      nullable: false,
    },
    user: {
      type: 'object',
      nullable: false,
    },
    ipAddress: {
      type: 'string',
      nullable: false,
    },
    device: {
      type: 'string',
      nullable: true,
    },
    browser: {
      type: 'string',
      nullable: true,
    },
    os: {
      type: 'string',
      nullable: true,
    },
    revoked: {
      type: 'boolean',
      nullable: false,
      default: false,
    },
    userAgent: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['id', 'uuid', 'fingerprint', 'user', 'ipAddress', 'revoked'],
};

export const SessionsFastSchema = fastJson(SessionsFastSchemaStructure);

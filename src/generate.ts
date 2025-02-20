import { Application } from '@cmmv/core';
import { ProtobufModuleCompiler } from '@cmmv/protobuf';
import { VueModule } from './vue.module';

import {
  GroupsContract,
  RolesContract,
  SessionsContract,
  UserContract,
} from './contracts';

Application.create({
  modules: [ProtobufModuleCompiler, VueModule],
  contracts: [GroupsContract, RolesContract, SessionsContract, UserContract], //Include constracts
});

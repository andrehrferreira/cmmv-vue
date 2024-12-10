import { Application } from '@cmmv/core';
import { ProtobufModule } from '@cmmv/protobuf';
import { VueModule } from './vue.module';

Application.create({
  modules: [ProtobufModule, VueModule],
  contracts: [], //Include constracts
});

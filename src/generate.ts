import { Application } from "@cmmv/core";
import { ProtobufModule } from "@cmmv/protobuf";
import { TasksContract } from "./contracts/tasks.contract";
import { VueModule } from "./vue.module";

Application.create({ 
    modules: [
        ProtobufModule,
        VueModule
    ],
    contracts: [TasksContract] 
});
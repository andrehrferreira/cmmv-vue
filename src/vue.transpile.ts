import * as fs from 'node:fs';
import * as path from 'node:path';
import * as UglifyJS from 'uglify-js';

import { ITranspile, Logger, Scope, Module, IContract } from '@cmmv/core';

import { ProtobufTranspile } from '@cmmv/protobuf';

export class VueTranspile implements ITranspile {
  private logger: Logger = new Logger('VueTranspile');

  async run(): Promise<void> {
    const hasProtobuf = Module.hasModule('protobuf');
    const contracts = Scope.getArray<any>('__contracts');

    if (hasProtobuf) {
      const protobufTranspile =
        Module.loadTranspile<ProtobufTranspile>(ProtobufTranspile);

      protobufTranspile.returnContractJs().then((contractsString: string) => {
        const contractsParsed = JSON.parse(contractsString);
        this.generateRPC(contractsParsed);
        this.generateRest(contractsParsed, contracts);
      });
    }
  }

  private generateRPC(contracts: any): void {
    const content = fs.readFileSync(
      path.resolve(__dirname, './rpc.mixins.cjs'),
      'utf-8',
    );
    const composableContent = fs.readFileSync(
      path.resolve(__dirname, './rpc.composable.cjs'),
      'utf-8',
    );

    const basePath = path.resolve('public/assets');

    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

    const mixinsOutputFile = path.resolve('public/rpc-mixins.js');
    const composableOutputFile = path.resolve('public/rpc-composable.js');

    const rpcFunctions = Object.keys(contracts.index)
      .map((contractName) => {
        const types = contracts.index[contractName]?.types || {};
        return Object.keys(types)
          .map((typeName) => {
            const methodName = typeName.replace(/Request|Response/, '');

            if (typeName.endsWith('Request')) {
              if (methodName.startsWith('Add')) {
                return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', { item: data });
            this.send(buffer);
        },`;
              } else if (methodName.startsWith('Update')) {
                return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', { id: data._id || data.id, item: data });
            this.send(buffer);
        },`;
              } else if (methodName.startsWith('Delete')) {
                return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', { id: data._id || data.id });
            this.send(buffer);
        },`;
              } else if (methodName.startsWith('Get')) {
                return `
        ${methodName}Request() {
            const buffer = this.pack('${contractName}', '${typeName}');
            this.send(buffer);
        },`;
              } else {
                return `
        ${methodName}Request(data) {
            const buffer = this.pack('${contractName}', '${typeName}', data);
            this.send(buffer);
        },`;
              }
            }
            return '';
          })
          .join('\n');
      })
      .join('\n');

    const rpcFunctionsComposable = Object.keys(contracts.index)
      .map((contractName) => {
        const types = contracts.index[contractName]?.types || {};
        return Object.keys(types)
          .map((typeName) => {
            const methodName = typeName.replace(/Request|Response/, '');

            if (typeName.endsWith('Request')) {
              if (methodName.startsWith('Add')) {
                return `
    ${methodName}Request(data) {
        const buffer = pack('${contractName}', '${typeName}', { item: data });
        send(buffer);
    },`;
              } else if (methodName.startsWith('Update')) {
                return `
    ${methodName}Request(data) {
        const buffer = pack('${contractName}', '${typeName}', { id: data._id || data.id, item: data });
        send(buffer);
    },`;
              } else if (methodName.startsWith('Delete')) {
                return `
    ${methodName}Request(data) {
        const buffer = pack('${contractName}', '${typeName}', { id: data._id || data.id });
        send(buffer);
    },`;
              } else if (methodName.startsWith('Get')) {
                return `
    ${methodName}Request() {
        const buffer = pack('${contractName}', '${typeName}');
        send(buffer);
    },`;
              } else {
                return `
    ${methodName}Request(data) {
        const buffer = pack('${contractName}', '${typeName}', data);
        send(buffer);
    },`;
              }
            }
            return '';
          })
          .join('\n');
      })
      .join('\n');

    const mixinTemplate = `
        // Generated automatically by CMMV

        ${content
          .replace('//%CONTRATCTS%', JSON.stringify(contracts))
          .replace('//%RPCFUNCTIONS%', rpcFunctions)}`;

    fs.writeFileSync(mixinsOutputFile, mixinTemplate, 'utf8');
    //this.logger.log(`RPC mixins generated successfully at ${mixinsOutputFile}`);

    const composableTemplate = `
        // Generated automatically by CMMV
        
        ${composableContent
          .replace('//%CONTRATCTS%', JSON.stringify(contracts))
          .replace('//%RPCFUNCTIONS_COMPOSABLE%', rpcFunctionsComposable)}`;

    fs.writeFileSync(composableOutputFile, composableTemplate, 'utf8');

    const minifiedMixin = UglifyJS.minify(mixinTemplate, {
      sourceMap: {
        filename: 'rpc-mixins.js',
        url: 'inline',
      },
    });

    fs.writeFileSync(
      mixinsOutputFile.replace('.js', '.min.js'),
      minifiedMixin.code,
      'utf8',
    );

    const minifiedComposable = UglifyJS.minify(composableTemplate, {
      sourceMap: {
        filename: 'rpc-composable.js',
        url: 'inline',
      },
    });

    fs.writeFileSync(
      `${composableOutputFile.replace('.js', '.min.js')}`,
      minifiedComposable.code,
      'utf8',
    );
  }

  private generateRest(contracts: IContract, contractsMeta: any) {
    const content = fs.readFileSync(
      path.resolve(__dirname, './rest.mixins.cjs'),
      'utf-8',
    );
    const composableContent = fs.readFileSync(
      path.resolve(__dirname, './rest.composable.cjs'),
      'utf-8',
    );

    const basePath = path.resolve('public/assets');

    if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

    const mixinsOutputFile = path.resolve('public/rest-mixins.js');
    const composableOutputFile = path.resolve('public/rest-composable.js');

    const restFunctions = Object.keys(contracts.index)
      .map((contractName) => {
        const types = contracts.index[contractName]?.types || {};
        return Object.keys(types)
          .map((typeName) => {
            const methodName = typeName.replace(/Request|Response/, '');

            if (typeName.endsWith('Request')) {
              if (methodName.startsWith('Add')) {
                return `
        ${methodName}Request(data) {
            
        },`;
              } else if (methodName.startsWith('Update')) {
                return `
        ${methodName}Request(data) {
            
        },`;
              } else if (methodName.startsWith('Delete')) {
                return `
        ${methodName}Request(data) {
            
        },`;
              } else if (methodName.startsWith('Get')) {
                return `
        ${methodName}Request() {
            
        },`;
              } else {
                return `
        ${methodName}Request(data) {
            
        },`;
              }
            }
            return '';
          })
          .join('\n');
      })
      .join('\n');

    const restFunctionsComposable = Object.keys(contracts.index)
      .map((contractName) => {
        const types = contracts.index[contractName]?.types || {};
        const contract = contractsMeta.find((contractData) => {
          return (
            contractData.controllerName.toLocaleLowerCase() === contractName
          );
        });
        const controllerPath = contract.controllerCustomPath
          ? contract.controllerCustomPath
          : contract.controllerName.toLowerCase();

        return Object.keys(types)
          .map((typeName) => {
            const methodName = typeName.replace(/Request|Response/, '');

            if (
              typeName.endsWith('Request') &&
              methodName.includes(contract.controllerName)
            ) {
              if (methodName.startsWith('Add')) {
                return `
        async ${methodName}(data) { return await authRequest("${controllerPath}", "POST", data); },`;
              } else if (methodName.startsWith('Update')) {
                return `
        async ${methodName}(id, data) { return await authRequest(\`${controllerPath}/\$\{id\}\`, "PUT", data); },`;
              } else if (methodName.startsWith('Delete')) {
                return `
        async ${methodName}(id) { return await authRequest(\`${controllerPath}/\$\{id\}\`, "DELETE"); },`;
              } else if (methodName.startsWith('Get')) {
                return `
        async ${methodName}() { return await authRequest("${controllerPath}", "GET"); },`;
              }
            }
            return '';
          })
          .join('');
      })
      .join('\n');

    const mixinTemplate = `/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

        ${content.replace('//%API_FUNCTIONS_MIXIN%', restFunctions)}`;

    fs.writeFileSync(mixinsOutputFile, mixinTemplate, 'utf8');

    const composableTemplate = `/**                                                                               
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually, 
    as it may be overwritten by the application.
    **********************************************
**/

${composableContent.replace(
  '//%API_FUNCTIONS_COMPOSABLE%',
  restFunctionsComposable,
)}`;

    fs.writeFileSync(composableOutputFile, composableTemplate, 'utf8');

    const minifiedMixin = UglifyJS.minify(mixinTemplate, {
      sourceMap: {
        filename: 'rest-mixins.js',
        url: 'inline',
      },
    });

    fs.writeFileSync(
      mixinsOutputFile.replace('.js', '.min.js'),
      minifiedMixin.code,
      'utf8',
    );

    const minifiedComposable = UglifyJS.minify(composableTemplate, {
      sourceMap: {
        filename: 'rest-composable.js',
        url: 'inline',
      },
    });

    fs.writeFileSync(
      `${composableOutputFile.replace('.js', '.min.js')}`,
      minifiedComposable.code,
      'utf8',
    );
  }
}

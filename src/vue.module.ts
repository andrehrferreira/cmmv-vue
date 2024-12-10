import { Module } from '@cmmv/core';
import { VueTranspile } from './vue.transpile';

export const VueModule = new Module('vue', {
    transpilers: [VueTranspile],
});

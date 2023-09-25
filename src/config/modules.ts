import type { BaseModuleProps } from '@kreatif/starter/utils/module';
import Text from '@modules/Text.astro';
import Privacy from '@modules/Privacy.astro';

export interface ModuleProps extends BaseModuleProps {}
export const moduleToComponent = new Map<string, any>([
    ['text', Text],
    ['privacy', Privacy],
]);

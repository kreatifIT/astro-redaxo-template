import Text from '@modules/Text.astro';
import Privacy from '@modules/Privacy.astro';
import type {BaseModuleProps} from '@kreatif/starter/utils/module';

export interface ModuleProps extends BaseModuleProps {

}
export const moduleToComponent = new Map<string, any>([
    ['text', Text],
    ['privacy', Privacy],
]);

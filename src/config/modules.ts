import Text from '@modules/Text.astro';
import Privacy from '@modules/Privacy.astro';

export const moduleToComponent = new Map<string, any>([
    ['text', Text],
    ['privacy', Privacy],
]);

import {
    type BaseModuleProps,
    type ModuleToMediaTypeMapping,
    MediaSource,
} from '@kreatif/starter/utils/modules';
import Text from '@modules/Text.astro';
import Privacy from '@modules/Privacy.astro';

export interface ModuleProps extends BaseModuleProps {}
export const moduleToComponent = new Map<string, any>([
    ['text', Text],
    ['privacy', Privacy],
]);

export const moduleToMediaType: ModuleToMediaTypeMapping = {
    text_media: [
        {
            source: MediaSource.MEDIA,
            id: 1,
            mediaType: 'image_small',
        },
        {
            source: MediaSource.MEDIA_LIST,
            id: 1,
            mediaType: 'image_small',
        },
        {
            source: MediaSource.VALUES,
            id: 2,
            mediaTypes: [
                {
                    source: MediaSource.MEDIA,
                    id: 1,
                    mediaType: 'image_small',
                },
            ],
        },
    ],
};

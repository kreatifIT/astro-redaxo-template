import { GenericRedaxoAdapter } from '../generic-redaxo-adapter';
import { REX_PROJECT_SETTINGS_QRY } from '@adapters/redaxo/queries/project-settings';
import type {
    ProjectSettings,
    ProjectSettingsIncludes,
} from '@adapters/redaxo/@types';
import { REX_FOOTER_ARTICLE_QRY } from './queries/footer-article';
import type { Article } from '../generic-redaxo-adapter/@types';

export class RedaxoAdapter extends GenericRedaxoAdapter {
    public static async getProjectSettings(
        clangId: string,
        includes?: ProjectSettingsIncludes,
    ) {
        const { data } = await this.redaxo.query(
            REX_PROJECT_SETTINGS_QRY,
            {
                includeOrganization: includes?.organization || false,
                includeContact: includes?.contact || false,
                includeIubenda: includes?.iubenda || false,
                includeTokens: includes?.tokens || false,
            },
            clangId,
        );
        return data.projectSettings as ProjectSettings;
    }

    public static async getFooterArticle(clangId: string) {
        const { data } = await this.redaxo.query(
            REX_FOOTER_ARTICLE_QRY,
            {},
            clangId,
        );
        return data.footerArticle as Article;
    }
}

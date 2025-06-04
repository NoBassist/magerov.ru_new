// /globals/Pages.ts
import type { GlobalConfig } from 'payload';
import { pack, unpack } from './i18nHooks';

const Pages: GlobalConfig = {
  slug: 'pages',                 // /api/globals/translations
  label: 'Pages',
  access: { read: () => true },      // public read, no auth needed for Next
  hooks: {
    beforeChange: [pack],   // собираем fields → raw
    afterRead: [unpack], // raw → fields (для UI)
  },
  fields: [
      {
        name: 'raw',          // скрытый JSON-объект, реальное хранилище
        type: 'json',
        localized: true,
        admin: { hidden: true },
      },
      {
      type: 'tabs',
      tabs: [
        // ---------- HERO ----------
        {
          label: 'Hero',
          fields: [
            {
              type: 'group',
              name: 'hero',
              label: 'Hero',
              fields: [
                {
                  type: 'group',
                  name: 'section1',
                  label: 'Section 1',
                  fields: [
                    { name: 'text1', type: 'richText', localized: true },
                    {
                      type: 'array',
                      name: 'text2',          // hero.section1.text2[]
                      label: 'Looping text',
                      localized: true,
                      labels: { singular: 'Phrase', plural: 'Phrases' },
                      minRows: 1,
                      fields: [
                        { name: 'value', label: 'Phrase', type: 'text' },
                      ],
                    },
                    { name: 'text3', type: 'text', localized: true },
                  ],
                },
                {
                  type: 'group',
                  name: 'section2',
                  label: 'Section 2',
                  fields: [
                    { name: 'text1', type: 'richText', localized: true },
                  ],
                },
              ],
            },
          ],
        },

        // ---------- ABOUT ----------
        {
          label: 'About',
          fields: [
            {
              type: 'group',
              name: 'about',
              label: 'About',
              fields: [
                { name: 'title', type: 'text', localized: true },
                { name: 'text', type: 'richText', localized: true },
              ],
            },
          ],
        },

        // --- add more tabs/groups for other sections here ---
      ],
    },
  ],
};

export default Pages;
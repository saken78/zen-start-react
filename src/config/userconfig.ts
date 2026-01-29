import { Config } from '@/types/config';
import { palettes } from '@/lib/palette';

export const defaultConfig: Config = {
  overrideStorage: true,
  temperature: {
    location: 'Surabaya',
    scale: 'C',
  },
  clock: {
    format: 'h:i p',
    iconColor: palettes.macchiato.maroon,
  },
  disabled: [],
  fastlink: '',
  openLastVisitedTab: false,
  currentPalette: 'macchiato',
  palette: palettes.macchiato,
  tabs: [
    {
      name: 'personal',
      background_url: '/images/banners/cbg-07.gif',
      categories: [
        {
          name: 'Media',
          links: [
            {
              name: 'mastodon',
              url: 'https://mastodon.social',
              icon: 'brand-mastodon',
              icon_color: palettes.macchiato.green,
            },
            {
              name: 'reddit',
              url: 'https://www.reddit.com/',
              icon: 'brand-reddit',
              icon_color: palettes.macchiato.peach,
            },
            {
              name: 'youtube',
              url: 'https://www.youtube.com/',
              icon: 'brand-youtube',
              icon_color: palettes.macchiato.red,
            },
            {
              name: 'twitch',
              url: 'https://www.twitch.tv/',
              icon: 'brand-twitch',
              icon_color: palettes.macchiato.blue,
            },
            {
              name: 'hacker-news',
              url: 'https://news.ycombinator.com/ask',
              icon: 'news',
              icon_color: palettes.macchiato.mauve,
            },
            {
              name: 'lemmy',
              url: 'https://lemmy.ml/',
              icon: 'users',
              icon_color: palettes.macchiato.sky,
            },
          ],
        },
        {
          name: 'workspace',
          links: [
            {
              name: 'mail',
              url: 'https://mail.proton.me',
              icon: 'brand-campaignmonitor',
              icon_color: palettes.macchiato.green,
            },
            {
              name: 'calendar',
              url: 'https://calendar.proton.me',
              icon: 'calendar-filled',
              icon_color: palettes.macchiato.peach,
            },
            {
              name: 'vault',
              url: 'https://vault.bitwarden.com',
              icon: 'lock',
              icon_color: palettes.macchiato.red,
            },
            {
              name: 'drive',
              url: 'https://drive.proton.me',
              icon: 'cloud',
              icon_color: palettes.macchiato.blue,
            },
          ],
        },
      ],
    },
    {
      name: 'dev',
      background_url: '/images/banners/cbg-08.gif',
      categories: [
        {
          name: 'Media',
          links: [
            {
              name: 'github',
              url: 'https://github.com',
              icon: 'brand-github',
              icon_color: palettes.macchiato.green,
            },
            {
              name: 'dev-community',
              url: 'https://dev.to/',
              icon: 'article',
              icon_color: palettes.macchiato.peach,
            },
            {
              name: 'wakatime',
              url: 'https://wakatime.com',
              icon: '24-hours',
              icon_color: palettes.macchiato.red,
            },
            {
              name: 'dotfyle',
              url: 'https://dotfyle.com/',
              icon: 'puzzle',
              icon_color: palettes.macchiato.blue,
            },
          ],
        },
      ],
    },
  ],
};

import * as AppData from './app.json';

const siteConfig = {
  seo: {
    title: AppData['app-name'],
    titleTemplate: `%s | ${AppData['app-name']}`,
    description: AppData.description,
    siteUrl: 'https://six-pack-champsss-frontend.vercel.app/',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://six-pack-champsss-frontend.vercel.app/',
      title: AppData['app-name'],
      description: AppData.description,
      site_name: AppData['app-name'],
    },
  },
  repo: {
    url: 'https://github.com/sshyam-gupta/six-pack-champsss-frontend',
  },
  copyright: `Copyright © ${new Date().getFullYear()}. All Rights Reserved.`,
};

export default siteConfig;

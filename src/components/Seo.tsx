import { NextSeo, NextSeoProps } from 'next-seo';
import siteConfig from '../constants/site-config';

export type SEOProps = Pick<NextSeoProps, 'title' | 'description'>;

const SEO = ({ title, description }: SEOProps) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ title, description }}
    titleTemplate={siteConfig.seo.titleTemplate}
  />
);

export default SEO;

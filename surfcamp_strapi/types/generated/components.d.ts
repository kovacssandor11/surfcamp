import type { Schema, Attribute } from '@strapi/strapi';

export interface BlogArticleHeadline extends Schema.Component {
  collectionName: 'components_blog_article_headlines';
  info: {
    displayName: 'headline';
  };
  attributes: {
    headline: Attribute.String & Attribute.Required;
    slug: Attribute.String & Attribute.Required;
  };
}

export interface BlogArticleHeadline3 extends Schema.Component {
  collectionName: 'components_blog_article_headline3s';
  info: {
    displayName: 'headline3';
  };
  attributes: {
    headline: Attribute.String & Attribute.Required;
    slug: Attribute.String & Attribute.Required;
  };
}

export interface BlogArticleLandscapeImage extends Schema.Component {
  collectionName: 'components_blog_article_landscape_images';
  info: {
    displayName: 'landscapeImage';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    imageCaption: Attribute.Text;
  };
}

export interface BlogArticleParagraphWithImage5 extends Schema.Component {
  collectionName: 'components_blog_article_paragraph_with_image5s';
  info: {
    displayName: 'paragraphWithImage5';
  };
  attributes: {
    paragraph: Attribute.String & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
    isLandscape: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    imageShowsRight: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    imageCaption: Attribute.String;
  };
}

export interface BlogArticleParagraph extends Schema.Component {
  collectionName: 'components_blog_article_paragraphs';
  info: {
    displayName: 'paragraph';
  };
  attributes: {
    paragraph: Attribute.RichText;
  };
}

export interface InfoBlockButton extends Schema.Component {
  collectionName: 'components_info_block_buttons';
  info: {
    displayName: 'button';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    color: Attribute.Enumeration<['turquoise', 'orange', 'beige']> &
      Attribute.Required &
      Attribute.DefaultTo<'turquoise'>;
    slug: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blog-article.headline': BlogArticleHeadline;
      'blog-article.headline3': BlogArticleHeadline3;
      'blog-article.landscape-image': BlogArticleLandscapeImage;
      'blog-article.paragraph-with-image5': BlogArticleParagraphWithImage5;
      'blog-article.paragraph': BlogArticleParagraph;
      'info-block.button': InfoBlockButton;
    }
  }
}

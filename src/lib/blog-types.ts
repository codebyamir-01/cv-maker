import React from 'react';

export type FAQ = {
  question: string;
  answer: string;
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  slug: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  bannerImage: string;
  bannerAlt: string;
  relatedSlugs: string[];
  faqs?: FAQ[];
  fullContent: React.ReactNode;
};

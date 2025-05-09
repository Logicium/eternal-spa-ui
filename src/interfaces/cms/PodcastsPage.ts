import type { ImageFormat } from './SharedInterfaces';

export interface PodcastsPageResponse {
  data: PodcastsPageData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  };
}

export interface PodcastsPageData {
  id: number;
  documentId: string;
  name: string;
  description: string;
  transcript: TranscriptItem[];
  isFeatured: boolean | null;
  podcastId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ImageData;
  audioFile: AudioFileData;
  tags: TagData[];
}

export interface TranscriptItem {
  type: string;
  children: TranscriptChild[];
}

export interface TranscriptChild {
  text: string;
  type: string;
}

export interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}


export interface AudioFileData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TagData {
  id: number;
  tagName: string;
}

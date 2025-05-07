export interface AboutPageResponse {
  data: AboutPageData;
  meta: Record<string, unknown>;
}

export interface AboutPageData {
  id: number;
  documentId: string;
  title: string;
  aboutFull: AboutContent[];
  aboutSpaceFull: AboutContent[];
  aboutMissionFull: AboutContent[];
  aboutTeamFull: AboutContent[];
  subtitle: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  bannerImage: BannerImage;
  sections: any[]; // Using any[] as the sections array was empty in the example
}

export interface AboutContent {
  type: string;
  children: AboutContentChild[];
}

export interface AboutContentChild {
  text: string;
  type: string;
}

export interface BannerImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    small: ImageFormat;
    thumbnail: ImageFormat;
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

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

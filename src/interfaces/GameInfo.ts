export interface GameInfo {
  name: string;
  route: string;
  thumbnailImgSrc: string;
  thumbnailImgAlt: string;
  releaseDate: string;
  googlePlayStoreLink?: string;
  description: {
    mainDescription: string;
    madeWith: string[];
    support?: string[];
  };
}

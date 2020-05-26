export interface GameInfo {
  name: string;
  route: string;
  thumbnailImgSrc: string;
  thumbnailImgAlt: string;
  releaseDate: string;
  description: {
    mainDescription: string;
    madeWith: string[];
    support?: string[];
  };
}

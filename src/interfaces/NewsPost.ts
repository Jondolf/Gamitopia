export interface NewsPost {
  id?: number | string;
  tags: string[];
  title: string;
  bodyAsMarkdown: string;
  bodyAsHTML: string;
  date: string;
}

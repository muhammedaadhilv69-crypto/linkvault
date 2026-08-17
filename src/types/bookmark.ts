export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  tags: string[];
  favorite: boolean;
  createdAt: string;
  folderId?: string;
}

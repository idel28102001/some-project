export interface FileType {
  url: string;
  name: string;
  originalName: string;
  extension: string;
  size: string;
}

export interface GalleryItemType {
  file: FileType;
}

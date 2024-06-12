export interface IGenre {
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface GenreListResponse {
  genres: IGenre[];
}

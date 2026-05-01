export interface PhotoOverView {
  id: number;
  title: string;
  thumbnail: string;
  posted_at: string;
}

export interface Photo {
  id: number;
  title: string;
  comment: string;
  image: string;
  location: string;
  posted_at: string;
}

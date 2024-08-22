export interface Post {
    id: number;
    title: string;
    teamdescription: string;
    description: string;
    imageUrl: string;
    iconUrl: string;
    likes: number;
    comments: number;
    date: string;
  }
  
export interface Menu {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  calorie: number;
  protein: number;
}
export interface IUrl {
  url: string;
}

export interface CourseProps{
  id: string;
  userId: string;
  name: string;
  description: string;
  image: IUrl;
  categories: CategoryProps[];
  isPremium: boolean;
  teacher: string;
  hour: string;
  ranting: string;
  chapter: ChapterProps[];
  video: IUrl;
}

export interface MyCoursesProps{
  id: string;
  image: string;
  name: string;
}

export interface ChapterProps{
  id: string;
  name: string;
  description: string;
  video: string;
}

export interface CategoryProps {
  id: string;
  name: string;
  courses: CourseProps[];
}

export interface NoteProps{
  id: string;
  title: string;
  content?: string;
}

export interface SubscriptionProps {
  id: string;
  userId: string;
  status: string;
}

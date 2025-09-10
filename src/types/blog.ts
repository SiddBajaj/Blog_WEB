export interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  excerpt?: string;
}

export interface CreateBlogPostData {
  title: string;
  content: string;
}
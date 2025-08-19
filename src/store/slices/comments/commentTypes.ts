import { CommentGet } from '@/types/comment';

export interface CommentsState {
  comments: CommentGet[];
  isLoading: boolean;
  error: string | null;
  isPosting: boolean;
  postError: string | null;
}

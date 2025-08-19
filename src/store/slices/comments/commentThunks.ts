import { createAsyncThunk } from '@reduxjs/toolkit';

import { FETCH_COMMENTS, POST_COMMENT } from '@/store/actionTypes/comments';
import { CommentGet, CommentPost } from '@/types/comment';
import { ThunkError } from '@/types/errors';
import { api } from '@/utils/api';
import { handleError } from '@/utils/handleError';

export const fetchComments = createAsyncThunk<
  CommentGet[],
  { id: string },
  { rejectValue: ThunkError }
>(FETCH_COMMENTS, async ({ id }, thunkAPI) => {
  try {
    const { data } = await api.get<CommentGet[]>(`/comments/${id}`);
    return data;
  } catch (error) {
    handleError(error, 'Failed to load comments');
    return thunkAPI.rejectWithValue({ message: 'Failed to load comments' });
  }
});

export const postComment = createAsyncThunk<
  CommentGet,
  { id: string; commentData: CommentPost },
  { rejectValue: ThunkError }
>(POST_COMMENT, async ({ id, commentData }, thunkAPI) => {
  try {
    const { data } = await api.post<CommentGet>(`/comments/${id}`, commentData);
    return data;
  } catch (error) {
    handleError(error, 'Failed to post comment');
    return thunkAPI.rejectWithValue({ message: 'Failed to post comment' });
  }
});

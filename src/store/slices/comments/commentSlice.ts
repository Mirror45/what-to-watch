import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CommentGet } from '@/types/comment';

import { fetchComments, postComment } from './commentThunks';
import { CommentsState } from './commentTypes';

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
  isPosting: false,
  postError: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<CommentGet[]>) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to load comments';
      })
      .addCase(postComment.pending, (state) => {
        state.isPosting = true;
        state.postError = null;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<CommentGet>) => {
        state.isPosting = false;
        state.comments.unshift(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.isPosting = false;
        state.postError = action.payload?.message || 'Failed to post comment';
      });
  },
});

export default commentsSlice.reducer;

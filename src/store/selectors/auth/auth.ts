import { RootState } from '@/store';

export const selectIsAuthorized = (state: RootState): boolean => !!state.auth.user;

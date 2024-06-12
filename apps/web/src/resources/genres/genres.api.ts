import { useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import { GenreListResponse } from './genres.interface';

export const useList = () => {
  const list = () => apiService.get('/genres');

  return useQuery<GenreListResponse>({
    queryKey: ['genres', 'list'],
    queryFn: list,
    select({ genres }) {
      return {
        genres: genres.slice(0, 4),
      };
    },
  });
};

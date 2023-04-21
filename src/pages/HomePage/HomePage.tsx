import React, { memo, useState } from 'react';
import { useQuery } from 'react-query';
import { NewsListItem } from '../../components/NewsListItem/NewsListItem';
import List from '@mui/material/List';
import { Box, CircularProgress, Container, IconButton } from '@mui/material';
import {
  getNewsListItem,
  getStories,
  NEWS_LIST_ITEM,
  STORIES_LIST,
} from '../../store/api/api';
import { Update } from '@mui/icons-material';

export const HomePage = memo(() => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { data: stories, isLoading } = useQuery({
    queryFn: () => getStories(),
    queryKey: [STORIES_LIST, isUpdate],
    cacheTime: 1000,
    refetchInterval: 60000,
  });

  const { data: news, isLoading: isLoadingNews } = useQuery({
    queryFn: () => getNewsListItem(stories!),
    queryKey: [NEWS_LIST_ITEM, stories],
  });

  return (
    <Container maxWidth="md">
      {isLoading || isLoadingNews ? (
        <CircularProgress sx={{ marginTop: '200px' }} />
      ) : (
        <List sx={{ width: '100%', maxWidth: 1200, bgcolor: 'background.paper' }}>
          {news?.map(news => (
            <NewsListItem key={news.id} news={news} />
          ))}
        </List>
      )}

      <Box sx={{ position: 'fixed', left: '20px', top: '80px' }}>
        <IconButton
          value="data-testid"
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => {
            setIsUpdate(update => !update);
          }}
        >
          <Update />
        </IconButton>
      </Box>
    </Container>
  );
});

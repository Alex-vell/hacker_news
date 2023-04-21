import React, { memo, useState } from 'react';
import { useQuery } from 'react-query';
import { NavLink, useParams } from 'react-router-dom';
import { getNewsInfo, NEWS_INFO } from '../../store/api/api';
import { CommentsList } from '../../components/CommentsList/CommentsList';
import s from './NewsPage.module.scss';
import { Box, CircularProgress, Divider, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { ArrowBack, Update } from '@mui/icons-material';
import { PATH } from '../../routes/Routes';

export const NewsPage = memo(() => {
  const [isUpdate, setIsUpdate] = useState(false);
  const { id } = useParams();

  const { data: news, isLoading: isLoadingNews } = useQuery({
    queryFn: () => getNewsInfo(Number(id)),
    queryKey: [NEWS_INFO, id, isUpdate],
  });

  return (
    <div className={s.container}>
      {isLoadingNews ? (
        <CircularProgress sx={{ marginTop: '200px' }} />
      ) : (
        <>
          <Box sx={{ position: 'fixed', left: '20px' }}>
            <NavLink to={PATH.HOME}>
              <ArrowBack color="primary" sx={{ fontSize: 32 }} />
            </NavLink>
          </Box>
          <Box>
            <Typography variant="h3" fontSize={32} marginBottom={2}>
              {news?.title}
            </Typography>
          </Box>

          <Divider />
          <Box marginTop={2}>
            <Typography variant="body1" fontSize={18} display="flex" alignItems="center">
              <Typography variant="body1" fontSize={16} marginRight="6px">
                Author:
              </Typography>
              {news?.by}
            </Typography>
            {news?.time && (
              <Typography
                variant="body1"
                fontSize={18}
                display="flex"
                alignItems="center"
              >
                <Typography variant="body1" fontSize={16} marginRight="6px">
                  Published:
                </Typography>
                {dayjs(news.time * 1000).format('DD.MM.YYYY H:mm')}
              </Typography>
            )}
            <Typography variant="body1" fontSize={18}>
              <a className={s.url} href={news?.url}>
                {news?.url}
              </a>
            </Typography>

            <Box display="flex" alignItems="center" columnGap="20px">
              <Typography
                variant="body1"
                fontSize={18}
                display="flex"
                alignItems="center"
              >
                <Typography variant="body1" fontSize={16} marginRight="6px">
                  Comments:
                </Typography>
                {news?.kids?.length || 0}
              </Typography>
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
          </Box>
          <Divider />
          <Box maxWidth="600px" marginTop={2}>
            {news?.kids && <CommentsList commentsItems={news.kids} />}
          </Box>
        </>
      )}
    </div>
  );
});

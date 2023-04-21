import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { COMMENTS_LIST, getComments } from '../../store/api/api';
import { CommentListItem } from '../CommentListItem/CommentListItem';
import { CircularProgress } from '@mui/material';

interface ICommentsList {
  commentsItems: number[];
}

export const CommentsList: FC<ICommentsList> = ({ commentsItems }) => {
  const { data: comments, isLoading } = useQuery([COMMENTS_LIST, commentsItems], () =>
    getComments(commentsItems),
  );

  return (
    <>
      {isLoading && <CircularProgress sx={{ margin: '40px' }} />}
      {comments?.map(comment => (
        <CommentListItem comment={comment} key={comment.id} />
      ))}
    </>
  );
};

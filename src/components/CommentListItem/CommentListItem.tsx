import React, { FC, memo, useState } from 'react';
import s from './CommentListItem.module.scss';
import { Button } from '@mui/material';
import { IComment } from '../../models/models';
import dayjs from 'dayjs';
import { CommentsList } from '../CommentsList/CommentsList';

interface CommentListItemProps {
  comment: IComment;
}

export const CommentListItem: FC<CommentListItemProps> = memo(({ comment }) => {
  const { by, kids, time, text } = comment;

  const [comments, setComments] = useState<number[] | undefined>(undefined);
  const [isShowKids, setIsShowKids] = useState(false);

  return (
    <>
      <div
        className={s.comment}
        onClick={() => {
          if (kids && !isShowKids) {
            setComments(kids);
            setIsShowKids(true);
          }
        }}
      >
        <div className={s.infoBlock}>
          <span className={s.author}>{by}</span>
        </div>
        <div className={s.message} dangerouslySetInnerHTML={{ __html: text }} />

        <div className={s.dateWrap}>
          <span className={s.date}>{dayjs(time * 1000).format('DD.MM.YYYY H:mm')}</span>
        </div>
        {kids && !isShowKids && (
          <Button
            onClick={() => {
              setComments(kids);
              setIsShowKids(true);
            }}
            variant="text"
          >
            Show replies
          </Button>
        )}
      </div>
      {comments && (
        <div className={s.comments}>
          <CommentsList commentsItems={comments} />
        </div>
      )}
    </>
  );
});

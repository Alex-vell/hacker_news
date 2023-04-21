import React, { FC } from 'react';
import { INews } from '../../models/models';
import dayjs from 'dayjs';
import s from './NewsListItem.module.scss';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../routes/Routes';

interface INewsProps {
  news: INews;
}

export const NewsListItem: FC<INewsProps> = ({ news }) => {
  const { id, time, title, score, by, kids } = news;
  return (
    <NavLink to={`${PATH.HOME}${id}`} className={s.container}>
      <h4 className={s.title}>{title}</h4>

      <div className={s.infoBlock}>
        <div>
          <p className={s.author}>Author: {by}</p>
          <span className={s.date}>{dayjs(time * 1000).format('DD.MM.YYYY H:mm')}</span>
          <span className={s.comment}>{kids?.length || 0} comments</span>
          <span className={s.comment}>{score} points</span>
        </div>
      </div>
    </NavLink>
  );
};


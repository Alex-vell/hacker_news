import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/HomePage';
import { NewsPage } from '../pages/NewsPage/NewsPage';
import React from 'react';
import { NotFound } from '../pages/NotFound/NotFound';

export const PATH = {
  HOME: '/',
  NEWS_PAGE: '/:id/',
};

export const RouteComponent = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={PATH.NEWS_PAGE} element={<NewsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

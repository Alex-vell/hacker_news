import { IComment, INews } from '../../models/models';
import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
  return config;
});

export const STORIES_LIST = 'STORIES_LIST';
export const getStories = (): Promise<number[]> => {
  return api
    .get<number[]>(`/newstories.json`)
    .then(res => res.data.slice(res.data.length - 100, res.data.length));
};

export const NEWS_LIST_ITEM = 'NEWS_LIST_ITEM';
export const getNewsListItem = async (stories: number[]) => {
  const promises = stories
    ? stories.map(item => api.get<INews>(`/item/${item}.json`))
    : [];
  return Promise.all(promises).then(res => res.map(item => item.data));
};

export const NEWS_INFO = 'NEWS_INFO';
export const getNewsInfo = (id: number) => {
  return api.get<INews>(`/item/${id}.json`).then(res => res.data);
};

export const COMMENTS_LIST = 'COMMENTS_LIST';

export const getComments = (commentIds: number[]) => {
  const promises = commentIds
    ? commentIds.map(item => api.get<IComment>(`/item/${item}.json`))
    : [];
  return Promise.all(promises).then(res => res.map(item => item.data));
};



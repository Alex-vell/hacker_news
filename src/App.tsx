import React from 'react';
import { Header } from './components/Header/Header';
import s from './App.module.scss';
import { RouteComponent } from './routes/Routes';

const App = () => {
  return (
    <div className={s.container}>
      <Header />
      <main className={s.main}>
        <RouteComponent />
      </main>
    </div>
  );
};

export default App;

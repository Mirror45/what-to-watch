'use client';

import { JSX } from 'react';

import { FilmHero } from '@/components/FilmHero';
import { FilmInfo } from '@/components/FilmInfo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Loading } from '@/components/Loading';
import { MoreLikeThis } from '@/components/MoreLikeThis';
import { useAppSelector } from '@/store/hooks';

export default function FilmContainer(): JSX.Element {
  const { currentFilm, isCurrentFilmLoading, currentFilmError } = useAppSelector(
    (state) => state.films,
  );

  if (isCurrentFilmLoading) {
    return <Loading />;
  }

  if (currentFilmError) {
    return (
      <div className="user-page">
        <Header />
        <h1 className="page-title">Error: {currentFilmError}</h1>
        <Footer />
      </div>
    );
  }

  if (!currentFilm) {
    return (
      <div className="user-page">
        <Header />
        <h1 className="page-title">Film not found</h1>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="film-card film-card--full">
        <FilmHero film={currentFilm} />
        <FilmInfo film={currentFilm} />
      </section>

      <div className="page-content">
        <MoreLikeThis />
      </div>
      <Footer />
    </>
  );
}

'use client';

import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchComments } from '@/store/slices/comments/commentThunks';
import { Film } from '@/types/film';

import { Review } from '../Review';

interface FilmInfoProps {
  film: Film;
}

// Вспомогательная функция для форматирования времени из минут в "1h 30m"
const formatRunTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

// Вспомогательная функция для получения текстового рейтинга
const getRatingLevel = (rating: number): string => {
  if (rating >= 10) return 'Awesome';
  if (rating >= 8) return 'Very good';
  if (rating >= 5) return 'Good';
  if (rating >= 3) return 'Normal';
  return 'Bad';
};

export function FilmInfo({ film }: FilmInfoProps) {
  // Состояние для хранения имени активной вкладки
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('Overview');

  // Получаем данные о комментариях из Redux
  const { comments, isLoading: areCommentsLoading } = useAppSelector((state) => state.comments);

  // Загружаем комментарии при монтировании компонента
  useEffect(() => {
    dispatch(fetchComments({ id: film.id }));
  }, [film.id, dispatch]);

  // Функция для отрисовки содержимого в зависимости от активной вкладки
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <>
            <div className="film-rating">
              <div className="film-rating__score">{film.rating.toFixed(1)}</div>
              <p className="film-rating__meta">
                <span className="film-rating__level">{getRatingLevel(film.rating)}</span>
                <span className="film-rating__count">{film.scoresCount} ratings</span>
              </p>
            </div>
            <div className="film-card__text">
              <p>{film.description}</p>
              <p className="film-card__director">
                <strong>Director: {film.director}</strong>
              </p>
              <p className="film-card__starring">
                <strong>Starring: {film.starring.join(', ')} and other</strong>
              </p>
            </div>
          </>
        );

      case 'Details':
        return (
          <div className="film-card__text film-card__row">
            <div className="film-card__text-col">
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Director</strong>
                <span className="film-card__details-value">{film.director}</span>
              </p>
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Starring</strong>
                <span className="film-card__details-value">
                  {film.starring.map((actor) => (
                    <Fragment key={actor}>
                      {actor},<br />
                    </Fragment>
                  ))}
                </span>
              </p>
            </div>
            <div className="film-card__text-col">
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Run Time</strong>
                <span className="film-card__details-value">{formatRunTime(film.runTime)}</span>
              </p>
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Genre</strong>
                <span className="film-card__details-value">{film.genre}</span>
              </p>
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Released</strong>
                <span className="film-card__details-value">{film.released}</span>
              </p>
            </div>
          </div>
        );

      case 'Reviews':
        if (areCommentsLoading) {
          return <p>Loading reviews...</p>;
        }
        return (
          <div className="film-card__reviews film-card__row">
            <div className="film-card__reviews-col">
              {comments.map((comment) => (
                <Review key={comment.id} review={comment} />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">
        <div className="film-card__poster film-card__poster--big">
          <Image src={film.posterImage} alt={`${film.name} poster`} width={218} height={327} />
        </div>

        <div className="film-card__desc">
          <nav className="film-nav film-card__nav">
            <ul className="film-nav__list">
              {['Overview', 'Details', 'Reviews'].map((tab) => (
                <li
                  key={tab}
                  className={`film-nav__item ${activeTab === tab ? 'film-nav__item--active' : ''}`}
                >
                  <a
                    href="#"
                    className="film-nav__link"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(tab);
                    }}
                  >
                    {tab}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

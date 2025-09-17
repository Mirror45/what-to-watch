'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { FILM_TABS, FilmTab } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchComments } from '@/store/slices/comments/commentThunks';
import { Film } from '@/types/film';

import { DetailsTab } from './tabs/DetailsTab';
import { OverviewTab } from './tabs/OverviewTab';
import { ReviewsTab } from './tabs/ReviewsTab';

interface FilmInfoProps {
  film: Film;
}

export function FilmInfo({ film }: FilmInfoProps) {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<FilmTab>('Overview');

  const { comments, isLoading: areCommentsLoading } = useAppSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments({ id: film.id }));
  }, [film.id, dispatch]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab film={film} />;
      case 'Details':
        return <DetailsTab film={film} />;
      case 'Reviews':
        return <ReviewsTab comments={comments} isLoading={areCommentsLoading} />;
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
              {FILM_TABS.map((tab) => (
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

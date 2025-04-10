import React, { ReactNode } from 'react';
import styles from './InformationCard.module.scss';
import { useSkeleton } from '../../hooks/skeleton';

interface CardProps {
    title: string
    value: string
    description: string
    icon?: ReactNode
    isLoading?: boolean
}

const InformationCard: React.FC<CardProps> = ({ title, value, description, icon, isLoading}: CardProps) => {
    const ref = useSkeleton(isLoading ?? false);

    return (
        <article ref={ref} className={styles.card}>
            <header className={styles['card__header']}>
            { icon && <span className={styles['card__header-icon']} aria-hidden="true">{icon}</span> }
            <h2 className={styles['card__header-title']}>{title}</h2>
            </header>
            <section className={styles['card__content']}>
            <h3 className={styles['card__content-value']}>{ value }</h3>
            <p className={styles['card__content-description']}>{ description }</p>
            </section>
        </article>
    )
};

export default InformationCard;
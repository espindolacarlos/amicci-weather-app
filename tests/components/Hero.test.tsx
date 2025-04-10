import { render } from '@testing-library/react';
import { Hero, HeroProps } from '../../src/components/Hero/Hero';
import { weatherData } from '../mocks/weatherData';
import { describe, it, expect } from 'vitest';
import { Commons } from '../../src/utils/commons.utils';

const renderSut = (props: HeroProps) => {
    return render(<Hero {...props} />);
}

describe('Hero', () => {
    it('should render the Hero component with correct weather data', () => {
        const props: HeroProps = {
            data: weatherData
        };
        const sut = renderSut(props);
        expect(sut.getByTestId('hero-temp')).toHaveTextContent('23.0°');
        expect(sut.getByTestId('hero-title')).toHaveTextContent('Predominantemente nublado');
        expect(sut.getByTestId('hero-weekday')).toHaveTextContent('Blumenau');
        expect(sut.getByTestId('hero-datetime')).toHaveTextContent(Commons.formatDateTime(new Date()).datetime);
        expect(sut.getByTestId('hero-description')).toHaveTextContent('Céu predominantemente nublado, com cobertura significativa de nuvens. Raros períodos de abertura e pouca incidência solar.');
    });
});
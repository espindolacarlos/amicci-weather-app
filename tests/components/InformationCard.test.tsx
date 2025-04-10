import { render } from '@testing-library/react';
import { weatherData } from '../mocks/weatherData';
import { describe, it, expect } from 'vitest';
import InformationCard, { InformationCardProps } from '../../src/components/InformationCard/InformationCard';

const renderSut = (props: InformationCardProps) => {
    return render(<InformationCard {...props} />);
}

describe('InformationCard', () => {
    it('should render the InformationCard component with correct weather details', () => {
        const props: InformationCardProps = {
            title: 'Temperature',
            value: `${weatherData.main.temp.toFixed(1)}°`,
            description: 'Current temperature',
            isLoading: false,
        };
        const sut = renderSut(props);
        expect(sut.getByText('Temperature')).toBeInTheDocument();
        expect(sut.getByText('Current temperature')).toBeInTheDocument();
        expect(sut.getByText('23.0°')).toBeInTheDocument();
        expect(sut.getByRole('article')).not.toHaveClass('skeleton');
    });
});
import {render, screen} from '@testing-library/react';
import App, {TemperatureState} from './App';

describe('<App />', () => {
    it('renders without errors', () => {
        render(<App />)
    });
});

describe('Test temperature state', () => {

    it('should give "too low" if temperature is below minimum ',async ()=>{

        render(<TemperatureState current={0} minimum={1} maximum={10} />);
        const span = await screen.getByText('too low');
        expect(span).toBeInTheDocument();
    });
    it('should give "too high" if temperature is below minimum ',async ()=>{

        render(<TemperatureState current={11} minimum={1} maximum={10} />);
        const span = await screen.getByText('too high');
        expect(span).toBeInTheDocument();
    });
    it('should give "all good" if temperature is below minimum ',async ()=>{

        render(<TemperatureState current={5} minimum={1} maximum={10} />);
        const span = await screen.getByText('all good');
        expect(span).toBeInTheDocument();
    });
});

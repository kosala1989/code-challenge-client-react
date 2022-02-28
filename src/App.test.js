import {render, screen} from '@testing-library/react';
import App from './App';
import React, { useState as useStateMock } from 'react'

describe('<App />', () => {
    it('renders without errors', () => {
        render(<App />)
    });
});

describe('Test temperature state', () => {

    it('should give "too low" if temperature is below minimum ',async ()=>{

        const itemsMock = [{
            id: '1',
            name: 'Pilsner',
            temperature: 0,
            status: 'all good',
            minimumTemperature: 1,
            maximumTemperature: 10,
        }];
        jest.spyOn(React, 'useState').mockImplementationOnce(() => useStateMock( itemsMock ));


        render(<App />);
        const span = await screen.getByText('too low');
        expect(span).toBeInTheDocument();
    });
    it('should give "too high" if temperature is below minimum ',async ()=>{

        const itemsMock = [{
            id: '1',
            name: 'Pilsner',
            temperature: 11,
            status: 'all good',
            minimumTemperature: 1,
            maximumTemperature: 10,
        }];
        jest.spyOn(React, 'useState').mockImplementationOnce(() => useStateMock( itemsMock ));


        render(<App />);
        const span = await screen.getByText('too high');
        expect(span).toBeInTheDocument();
    });
    it('should give "all good" if temperature is below minimum ',async ()=>{

        const itemsMock = [{
            id: '1',
            name: 'Pilsner',
            temperature: 5,
            status: 'all good',
            minimumTemperature: 1,
            maximumTemperature: 10,
        }];
        jest.spyOn(React, 'useState').mockImplementationOnce(() => useStateMock( itemsMock ));


        render(<App />);
        const span = await screen.getByText('all good');
        expect(span).toBeInTheDocument();
    });
});

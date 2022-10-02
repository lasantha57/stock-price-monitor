import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import PriceMonitor from './index';

afterEach(cleanup)

describe('Testing PriceMonitor', () => {
    it('Component should render correctly', () => {
        const tree = renderer
            .create(
                <Router>
                    <PriceMonitor />
                </Router>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
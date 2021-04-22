import { render, screen } from '@testing-library/react';
import Tree from './Tree';

// Mock Data
const data = [{
    id: 1,
    name: 'Test Node',
    children: []
}]
const selected = [1, 2, 3];
let getOnChange = jest.fn();

// Renders the components

test('renders tree data', () => {
    render(<Tree data={data} getOnChange={getOnChange} selected={selected} />);
    const linkElement = screen.getByText("Test Node");
    expect(linkElement).toBeInTheDocument();
});
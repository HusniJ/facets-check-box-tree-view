import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import TreeNode from './TreeNode';

// Mock Data
const node = {
    id: 1,
    name: 'Test Node',
    children: []
}
const selected = [1, 2, 3];
let getOnChange = jest.fn();

// Renders the components

test('renders tree node label', () => {
    render(<TreeNode node={node} getOnChange={getOnChange} selected={selected} />);
    const linkElement = screen.getByText("Test Node");
    expect(linkElement).toBeInTheDocument();
});

test('verify if the checkbox is checked', () => {
    const { getByTestId } = render(<TreeNode node={node} getOnChange={getOnChange} selected={selected} />);
    const checkBox = getByTestId('checkbox-1').querySelector('input[type="checkbox"]');
    expect(checkBox).toHaveProperty('checked', true)
});

test('verify if the checkbox is not checked', () => {
    const { getByTestId } = render(<TreeNode node={node} getOnChange={getOnChange} selected={[4, 5, 6]} />);
    const checkBox = getByTestId('checkbox-1').querySelector('input[type="checkbox"]');
    expect(checkBox).toHaveProperty('checked', false)
})

test('verify if the checkbox is calling onChange function when clicked', () => {
    const { getByTestId } = render(<TreeNode node={node} getOnChange={getOnChange} selected={[4, 5, 6]} />);
    const checkBox = getByTestId('checkbox-1').querySelector('input[type="checkbox"]');
    fireEvent.click(checkBox);
    expect(getOnChange).toHaveBeenCalledTimes(1);
})

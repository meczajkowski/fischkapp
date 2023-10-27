import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Button from '../components/UI/Button';
import styles from './../components/UI/Button.module.css'



describe('Button', () => {
  it('should render the button with the correct text', () => {
    const { getByText } = render(<Button variant="primary">Click me!</Button>);
    expect(getByText('Click me!')).toBeInTheDocument();
  });

  it('should call the onClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button variant="primary" onClick={handleClick}>Click me!</Button>);
    fireEvent.click(getByText('Click me!'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have the primary class when variant is primary', () => {
    const { getByText } = render(<Button variant="primary">Click me!</Button>);
    expect(getByText('Click me!')).toHaveClass(`${styles.primary}`);
    // expect(getByText('Click me!')).toHaveClass(styles.primary); //why this fails the test?
  });

  it('should not have the primary class when variant is secondary', () => {
    const { getByText } = render(<Button variant="secondary">Click me!</Button>);
    expect(getByText('Click me!')).not.toHaveClass('primary');
  });
});

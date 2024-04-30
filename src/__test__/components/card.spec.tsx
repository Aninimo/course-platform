import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Card } from '../../components/card';

describe('Card', () => {
  it('renders number and description correctly', () => {
    const number = 42;
    const description = 'Test Description';

    render(<Card number={number} description={description} />);

    expect(screen.getByText(number.toString())).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});

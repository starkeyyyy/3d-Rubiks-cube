import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import RubiksCube from './RubiksCube';

describe('RubiksCube component', () => {
  it('should rotate the cube when up arrow key is pressed', async () => {
    const { getByText } = render(<RubiksCube />);
    const cubeElement = getByText('Cube');
    fireEvent.keyDown(cubeElement, { key: 'ArrowUp' });
    await waitFor(() => expect(getByText('Cube')).toHaveStyle('transform: rotateY(90deg);'));
  });

  it('should rotate the cube when down arrow key is pressed', async () => {
    const { getByText } = render(<RubiksCube />);
    const cubeElement = getByText('Cube');
    fireEvent.keyDown(cubeElement, { key: 'ArrowDown' });
    await waitFor(() => expect(getByText('Cube')).toHaveStyle('transform: rotateY(-90deg);'));
  });

  it('should rotate the cube when left arrow key is pressed', async () => {
    const { getByText } = render(<RubiksCube />);
    const cubeElement = getByText('Cube');
    fireEvent.keyDown(cubeElement, { key: 'ArrowLeft' });
    await waitFor(() => expect(getByText('Cube')).toHaveStyle('transform: rotateX(90deg);'));
  });

  it('should rotate the cube when right arrow key is pressed', async () => {
    const { getByText } = render(<RubiksCube />);
    const cubeElement = getByText('Cube');
    fireEvent.keyDown(cubeElement, { key: 'ArrowRight' });
    await waitFor(() => expect(getByText('Cube')).toHaveStyle('transform: rotateX(-90deg);'));
  });
});
import { CurrentStreak } from "./calendar";
import { render, screen } from '@testing-library/react';

describe('CurrentStreak', () => {
    it('displays the correct streak when streak is greater than 1', () => {
        const {getByTestId} = render(<CurrentStreak />);
        expect(screen.getByText('0 Days')).toBeInTheDocument();
    });
});

test('test', () => {
    expect(true).toBe(true);
})
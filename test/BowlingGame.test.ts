class Game {
    points: number;

    roll(number: number) {
        this.points = number
    }

    score(): number {
        return this.points;
    }
}

describe('Given a bowling game', () => {
    let game: Game;
    beforeEach(() => {
        game = new Game();
    })

    it('when rolling 2 pins, the score should be 2 ', () => {
        game.roll(2)
        expect(game.score()).toBe(2);
    })

    it('when rolling 7 pins, the score should be 7 ', () => {
        game.roll(7)
        expect(game.score()).toBe(7);
    })
})

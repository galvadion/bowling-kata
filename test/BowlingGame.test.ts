class Game {
    rolls: number[] = [];

    roll(number: number) {
        this.rolls.push(number)
    }

    score(): number {
        let points = 0
        let frameIndex = 0
        for(let frame = 0; frame<10 ; frame++){
            if(this.isStrike(frameIndex)){
                points += 10 + this.strikeBonus(frameIndex)
                frameIndex +=1
            }else if(this.isSpare(frameIndex)){
                points += 10 + this.spareBonus(frameIndex)
                frameIndex +=2
            }else{
                points += this.rolls[frameIndex] + this.rolls[frameIndex+1]
                frameIndex +=2
            }
        }
        return points;
    }

    private spareBonus(frameIndex: number) {
        return this.rolls[frameIndex + 2];
    }

    private strikeBonus(frameIndex: number) {
        return this.rolls[frameIndex + 1] + this.rolls[frameIndex + 2];
    }

    private isStrike(frameIndex: number) {
        return this.rolls[frameIndex] == 10;
    }

    private isSpare(frameIndex: number) {
        return this.rolls[frameIndex] + this.rolls[frameIndex + 1] == 10;
    }
}

describe('Given a bowling game', () => {
    let game: Game;
    beforeEach(() => {
        game = new Game();
    })

    const rollMany = (points: number, rolls: number) => {
        for (let i = 0; i<rolls;i++){
            game.roll(points)
        }
    }

    const rollASpare = () =>{
        game.roll(7)
        game.roll(3)
    }

    it('a gutter game should have a score of 0', ()=>{
        rollMany(0,20)
        expect(game.score()).toBe(0)
    })

    it('a game of all 1s  should have a score of 20', ()=>{
        rollMany(1,20)
        expect(game.score()).toBe(20)
    })

    it('when rolling 2 pins, the score should be 2 ', () => {
        game.roll(2)
        rollMany(0,19)
        expect(game.score()).toBe(2);
    })

    it('when rolling 7 pins, the score should be 7 ', () => {
        game.roll(7)
        rollMany(0,19)
        expect(game.score()).toBe(7);
    })

    it('when rolling the two rolls of a frame, the score should be sum of both', () => {
        game.roll(7)
        game.roll(2)
        rollMany(0,18)
        expect(game.score()).toBe(9);
    })

    it('when rolling a spare, and then rolled a 2, the points should be 14', () => {
        rollASpare()
        game.roll(2)
        rollMany(0,17)
        expect(game.score()).toBe(14);
    })

    it('when rolling a strike, and then rolled a 2 and a 5, the points should be 24', () => {
        game.roll(10)
        game.roll(2)
        game.roll(5)
        rollMany(0,16)
        expect(game.score()).toBe(24);
    })
    it('when rolling full strikes, the score should be 300', () => {
        rollMany(10,12)
        expect(game.score()).toBe(300);
    })
})

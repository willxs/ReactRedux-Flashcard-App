import md5 from "md5"

class Card {
    constructor(front, back, deckID) {
        this.front = front
        this.back = back
        this.deckID = deckID
        this.cardID = md5(front + back + deckID)
        this.EF = 2.5 // E-Factor
        this.n = 1 // used to get # days b4 next repition interval
        this.lastModified = Date.now()
    }
    // setting attributes of the object from storage
    setFromObject(ob) {
        //this.front = ob.front
        //this.back = ob.back
        //this.deckID = ob.deckID
        //this.cardID = ob.id
        this.EF = ob.EF
        this.n = ob.n
        this.lastModified = ob.lastModified
    }
    
    // creating the object from storage
    static fromObject(ob) {
        let c = new Card(ob.front, ob.back, ob.deckID)
        c.setFromObject(ob)
        return c
    }

    updateModification() {
        this.lastModified = Date.now()
    }

    // quality of score is 0 - 5
    updateEF(quality_of_response) {
        console.log('update ef?')
        // potentially new EF
        let newEF = this.EF - 0.8 + 0.28 * quality_of_response - 0.02 * quality_of_response * quality_of_response
        // user failed to memorize the card, reset intervals back to 1, but don't hurt the EF.
        if (quality_of_response < 3) {
            this.n = 1
            return
        }
        // increase interval to next repetition
        this.n += 1

        if (newEF < 1.3) {
            this.EF = 1.3
        } else {
            this.EF = newEF
        }
    }

    // interrepition interval
    getInterval() {
        return this.getIntervalHelper(this.n)
    }

    getIntervalHelper(n) {
        // base cases
        if (n <= 1) {
            return 1
        }

        if (n === 2) {
            return 6
        }

        // recurse
        return Math.ceil(this.EF * this.getIntervalHelper(n - 1))
    }
}

export default Card
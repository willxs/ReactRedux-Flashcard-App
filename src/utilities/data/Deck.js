import md5 from "md5"
import Card from "./Card"

class Deck {
    constructor(title, subtitle) {
        // should be stored
        this.title = title
        this.subtitle = subtitle
        this.cards = []
        this.lastReviewed = Date.now()
        this.creationDate = Date.now()
        this.id = md5(title + this.creationDate) // transaction-id
        this.lastModified = Date.now()
        this.synced = false
    }
    // For loading a deck from storage
    setFromObject(ob) {
        //this.title = ob.title
        //this.subtitle = ob.subtitle

        this.cards = ob.cards.map(card => {
            return Card.fromObject(card)
        })

        this.id = ob.id
        this.lastReviewed = ob.lastReviewed
        this.creationDate = ob.creationDate
    }

    static fromObject(ob) {
        let d = new Deck(ob.title, ob.subtitle)
        d.setFromObject(ob)
        return d
    }

    addCard(card) {
        //console.log('adding card')
        this.cards = this.cards.concat(card)
    }

    updateReview() {
        this.lastReviewed = Date.now()
    }

    updateModification() {
        this.lastModified = Date.now()
    }

    // days elapsed since deck was created, 1 day = 1 interval unit
    getInterval() {
        let now = new Date()
        let old = new Date(this.creationDate)
        let difference = now.getTime() - old.getTime()
        return Math.ceil(difference / (1000 * 3600 * 24))
    }

    // you have x cards due
    getDueCards() {
        let interval = this.getInterval()
        //console.log(this.id, this.title)
        let count = this.cards.filter( card => {
                        //console.log("cardName: ", card.front, "cardID:", card.cardID)
                        return (card.getInterval() <= interval && card.EF < 4)
                    }).length
        return count
    }

    // you are learning ... cards
    getUnmemorizedCards() {
        let count = this.cards.filter(card => {
                        return (card.EF < 4)
                    }).length
        return count
    }

    // you have memorized ... cards
    getMemorizedCards() {
        return this.cards.length - this.getUnmemorizedCards()
    }

    
}

export default Deck
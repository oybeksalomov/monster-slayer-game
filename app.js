function getAttackValue(min, max) {
    return Math.floor(Math.random() * (max-min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        }
    },
    computed: {
        monsterBarStyle() {
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyle() {
            return {width: this.playerHealth + '%'}
        },
        useSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                //draw
                this.winner = 'draw'
            } else if(value <= 0) {
                //player lost
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                //draw
                this.winner = 'draw'
            } else if(value <= 0) {
                // monster lost
                this.winner = 'player'
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++
            const attackValue = getAttackValue(5, 12)
            this.monsterHealth -= attackValue
            this.attackPlayer()
        },
        attackPlayer() {
            const attackValue = getAttackValue(8, 15)
            this.playerHealth -= attackValue   
        },
        specialAttack() {
            this.currentRound++
            const attackValue = getAttackValue(10, 25)
            this.monsterHealth -= attackValue
            this.attackPlayer()
        },
        healPlayer() {
            this.currentRound++
            const healValue = getAttackValue(8, 20)
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue
            }
            this.attackPlayer()
        }
    }
})

app.mount('#game')


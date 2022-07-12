new Vue({
    el:'#app',
    data:{
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs:[]
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods:{
        startGame(){
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        getRandom(min, max){
            const value = Math.random() * (max - min) + min  //multiplico o valor randomico com o resultado do max e min.
            return Math.round(value) // arendodo o valor randomico.
        },
        attack(especial){
            this.hurt('playerLife', 7, 12, false, 'Monster', 'Player', 'monster') 
            //'Monster' = quem originou o evento. 'Player' = quem recebeu o evento. 'player' = classe CSS
            if(this.monsterLife > 0)
                this.hurt('monsterLife', 5, 10, especial, 'Player', 'Monster', 'player') // monstro ta sujeito a um ataque especial.
        },
        hurt(atr,min, max, especial, source, target, clas){ // atr é o nome que está em this.hurt
            const plus = especial ? 5 : 0  //ao clicar em special attack é adicionado um plus.
            const hurt = this.getRandom(min + plus, max + plus)
            this[atr]= Math.max(this[atr] - hurt, 0) // utilizando o math.max para evitar que fique negativo
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, clas)
        },
        heal(min, max){
            const heal = this.getRandom(min,max) 
            this.playerLife = Math.min(this.playerLife + heal, 100) // usando o min para não ter o acrescimo de vida maior que 100.
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },
        healAndHurt(){ //Depois que o player se cura, ele pode receber ataque.
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false, 'Monster', 'Player', 'monster') //Apenas o player pode ser ferido com ataque especial, por isso, false.
        },
        registerLog(text, clas){
            this.logs.unshift({text, clas})
        }
    },
    watch:{
        hasResult(value){
            if(value) this.running = false
        }
    }
})


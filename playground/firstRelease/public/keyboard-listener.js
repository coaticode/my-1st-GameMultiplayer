export default function createKeyboardListener(document) {

    const state = {
        observers: []
    }
 
    function subscribe(observeFunction){
        state.observers.push(observeFunction)

    }
    function notifyAll(command) {
        console.log('keyboardListener -> Notifying ${state.observers.length} observers')
        
        for(const observeFunction of state.observers){
            observeFunction(command)
        }
    }
    document.addEventListener('keydown', handKeydown)

    function handKeydown(event) {
        const keyPressed = event.key

        const command = {
            playerId: 'player1',
            keyPressed
        }
        notifyAll(command)
 
    }

    return {
        subscribe
    }
}
export class ReactiveBox {
    constructor(value) {
        this.listeners = new Set([])
        this.value = value
    }

    subscribe(listener) {
        this.listeners.add(listener)
    }

    unsubscribe(listener) {
        this.listeners.delete(listener)
    }

    update(value) {
        this.value = value

        this.listeners.forEach((listener) => listener())
    }
}


const hello1 = new ReactiveBox('hello')

hello1.subscribe(() => {
    console.log(hello1.value)
})

hello1.update('bye')


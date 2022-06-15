const testAsyncFunction = async (initCount: number) => {
    let definedMouseListener = false

    const onMouseDown = (e: MouseEvent) => {
        console.debug({MOUSE_DOWN: e})
        const origin = {
            x: e.pageX / document.body.offsetWidth,
            y: e.pageY / document.body.offsetHeight
        }
        fireNow(initCount, {origin})
    }

    const randomMinMax = (min: number, max: number) => {
        return Math.random() * (max - min) + min
    }

    const fire = function (count: number, particleRatio: number, opts: object) {
        const defaults = {
            origin: {y: 0.7}
        }
        // @ts-ignore
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }))
    }

    const fireNow = (count: number = 200, opts: object = {}) => {
        fire(count, 0.25, {
            spread: 26,
            startVelocity: 55,
            ...opts,
        })

        fire(count, 0.2, {
            spread: 60,
            ...opts,
        })
        fire(count, 0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
            ...opts,
        })
        fire(count, 0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
            ...opts,
        })
        fire(count, 0.1, {
            spread: 120,
            startVelocity: 45,
            ...opts,
        })
    }

    const waitAndFire = async (min: number = 0, max: number = 0) => {
        let wait = Math.round(randomMinMax(min, max))
        console.debug(`Wait for ${wait} seconds`)
        await setTimeoutAsync(wait)
        console.debug('start firing')
        fireNow(initCount)
    }

    const setTimeoutAsync = async (seconds: number) => {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000))
    }

    const fireEveryMinute = async () => {
        console.debug(`Init fire [${initCount} COUNT]`)
        if (!definedMouseListener && window) {
            window.addEventListener("mousedown", onMouseDown)
            console.debug('CLICK ANYWHERE ON PAGE TO BURST')
            definedMouseListener = true
        }
        console.debug('Start firing [1]')
        await waitAndFire()
        await waitAndFire(5, 15)
        await waitAndFire(2, 5)
        await waitAndFire(10, 20)
        console.debug(`end fire`)


        const wait = Math.round(randomMinMax(30, 90))
        console.debug(`Wait for ${wait} seconds for the next round, meanwhile try clicking anywhere on page`)
        await setTimeoutAsync(wait)

        // start over again
        await fireEveryMinute()
    }


    // main code
    try {
        console.debug('START')
        await fireEveryMinute()
    } catch (e) {
        console.error('Error', [e])
    }
    console.debug('DONE!')
    return initCount
}

export default testAsyncFunction
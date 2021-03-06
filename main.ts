ng.onButtonPressed(ng.NGButton.A, function () {
    if (ng.hasStarted()) {
        if (turning) {
            changeDrivingMode(drivingMode)
            turning = false
        } else {
            turning = true
            goLeft()
        }
    }
})
function goForward () {
    basic.showLeds(`
        . . # . .
        . # # # .
        # # . # #
        # . . . #
        . . . . .
        `)
    pins.servoWritePin(AnalogPin.P14, 90 + speed)
    pins.servoWritePin(AnalogPin.P15, 90 - speed)
}
function goBackward () {
    basic.showLeds(`
        . . . . .
        # . . . #
        # # . # #
        . # # # .
        . . # . .
        `)
    pins.servoWritePin(AnalogPin.P14, 90 - speed)
    pins.servoWritePin(AnalogPin.P15, 90 + speed)
}
ng.onButtonPressed(ng.NGButton.B, function () {
    if (ng.hasStarted()) {
        if (turning) {
            changeDrivingMode(drivingMode)
            turning = false
        } else {
            turning = true
            goRight()
        }
    }
})
function goLeft () {
    basic.showLeds(`
        . . # # .
        . # # . .
        # # . . .
        . # # . .
        . . # # .
        `)
    offset = 90 - speed / 2
    pins.servoWritePin(AnalogPin.P14, offset)
    pins.servoWritePin(AnalogPin.P15, offset)
}
function goRight () {
    basic.showLeds(`
        . # # . .
        . . # # .
        . . . # #
        . . # # .
        . # # . .
        `)
    offset = 90 + speed / 2
    pins.servoWritePin(AnalogPin.P14, offset)
    pins.servoWritePin(AnalogPin.P15, offset)
}
ng.onButtonPressed(ng.NGButton.AB, function () {
    if (drivingMode == 0) {
        if (previousDrivingMode > 0) {
            drivingMode = -1
        } else {
            drivingMode = 1
        }
    } else {
        previousDrivingMode = drivingMode
        drivingMode = 0
    }
    changeDrivingMode(drivingMode)
})
function changeDrivingMode (mode: number) {
    if (mode > 0) {
        goForward()
    } else if (mode < 0) {
        goBackward()
    } else {
        goNowhere()
    }
}
function goNowhere () {
    basic.showLeds(`
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        `)
    pins.servoWritePin(AnalogPin.P14, 90)
    pins.servoWritePin(AnalogPin.P15, 90)
}
function toggleLights () {
    if (ng.hasStarted()) {
        goNowhere()
        if (lightsOn) {
            ng.neopixels().clear()
            ng.neopixels().show()
            lightsOn = false
        } else {
            ng.neopixels().showColor(neopixel.colors(NeoPixelColors.White))
            lightsOn = true
        }
        changeDrivingMode(drivingMode)
    }
}
input.onGesture(Gesture.Shake, function () {
    toggleLights()
})
radio.onReceivedString(function (receivedString) {
    toggleLights()
})
let offset = 0
let speed = 0
let lightsOn = false
let previousDrivingMode = 0
let drivingMode = 0
let turning = false
ng.startWithIcon(IconNames.Rabbit)
turning = false
drivingMode = 0
changeDrivingMode(drivingMode)
previousDrivingMode = -1
lightsOn = false
if (ng.hardWasChosen()) {
    speed = 60
} else {
    speed = 20
}

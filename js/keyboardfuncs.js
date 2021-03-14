var CurrentHeldKeys = [];
var AltOn = false;

window.onkeydown = function(e) {
    if (CurrentHeldKeys[e.keyCode] === undefined || CurrentHeldKeys[e.keyCode] === false) {
        CurrentHeldKeys[e.keyCode] = true;
    }
}

window.onkeyup = function(e) {
    if (CurrentHeldKeys[e.keyCode] === true) {
        CurrentHeldKeys[e.keyCode] = false;
    }
}

window.onblur = function(e) {
    CurrentHeldKeys = [];
}

function IsKeyDown(keyCode) {
    if (CurrentHeldKeys[keyCode] === undefined) {
        return false;
    }
    else {
        return CurrentHeldKeys[keyCode];
    }
}
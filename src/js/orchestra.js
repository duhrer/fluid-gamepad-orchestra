(function (fluid) {
    "use strict";

    // The outermost component that manages adding/removing gamepads and relaying changes such as button presses.
    fluid.defaults("fluid.gamepad.orchestra", {
        gradeNames: ["fluid.modelComponent"],
        model: {
            gamepads: {
                0: { connected: false },
                1: { connected: false },
                2: { connected: false },
                3: { connected: false },
                4: { connected: false },
                5: { connected: false },
                6: { connected: false },
                7: { connected: false },
                8: { connected: false },
                9: { connected: false },
                10: { connected: false },
                11: { connected: false },
                12: { connected: false },
                13: { connected: false },
                14: { connected: false },
                15: { connected: false }

            },
            poll: false
        },
        components: {
            poller: {
                type: "berg.clock.raf",
                options: {
                    freq: 5, // times per second
                    listeners: {
                        "onTick.pollGamepads": {
                            funcName: "fluid.gamepad.orchestra.pollGamepads",
                            args: ["{fluid.gamepad.orchestra}"]
                        }
                    }
                }
            }
        },
        invokers: {
            handleGamepadConnected: {
                funcName: "fluid.gamepad.orchestra.startPollingIfGamepadsConnected",
                args: ["{that}"]
            },
            handleGamepadDisconnected: {
                funcName: "fluid.gamepad.orchestra.handleGamepadDisconnected",
                args: ["{that}"]
            }
        },
        listeners: {
            "onCreate.bindGamepadListeners": {
                funcName: "fluid.gamepad.orchestra.bindGamepadListeners",
                args: ["{that}"]
            },
            "onCreate.startPollingIfGamepadsConnected": {
                funcName: "fluid.gamepad.orchestra.startPollingIfGamepadsConnected",
                args: ["{that}"]
            }
        },
        modelListeners: {
            poll: {
                funcName: "fluid.gamepad.orchestra.togglePolling",
                args: ["{that}"]
            }
        }
    });

    fluid.gamepad.orchestra.bindGamepadListeners = function (that) {
        // When a gamepad is connected
        window.addEventListener("gamepadconnected", that.handleGamepadConnected);

        // When gamepad is disconnected
        window.addEventListener("gamepaddisconnected", that.handleGamepadDisconnected());
    };

    // Some browsers include an array of gamepads with null entries, we filter to the non-null values while preserving the indexes.
    fluid.gamepad.getGamepads = function () {
        var nullSafeMap = {};
        var rawGamepads = navigator.getGamepads();

        for (var a = 0; a < 16; a++) {
            nullSafeMap[a] = rawGamepads[a] || { id: "Not connected", connected: false, buttons: [], axes: [] }
        }

        return nullSafeMap;
    };

    fluid.gamepad.orchestra.startPollingIfGamepadsConnected = function (that) {
        var gamepads = fluid.gamepad.getGamepads();
        if (Object.keys(gamepads).length) {
            that.applier.change("poll", true);
        }
    };

    fluid.gamepad.orchestra.handleGamepadDisconnected = function (that) {
        var gamepads = fluid.gamepad.getGamepads();
        if (!Object.keys(gamepads).length) {
            that.applier.change("poll", false);
        }
    };

    fluid.gamepad.orchestra.togglePolling = function (that) {
        if (that.model.poll) {
            that.poller.start();
        }
        else {
            that.poller.stop();
        }
    };

    fluid.gamepad.orchestra.pollGamepads = function (that) {
        var gamepads = fluid.gamepad.getGamepads();

        that.applier.change("gamepads", gamepads);
    };

    // The default "onscreen" grade that displays active buttons/axes, shows/hides gamepads.
    fluid.defaults("fluid.gamepad.orchestra.onscreen", {
        gradeNames: ["fluid.gamepad.orchestra", "fluid.gamepad.templateRenderer"],
        markup: {
            container: "<div class='gamepad-orchestra-pit'></div>"
        },
        components: {
            gamepads: {
                container: "{that}.container",
                type: "fluid.gamepad.gamepads.onscreen",
                options: {
                    model: {
                        gamepads: "{fluid.gamepad.orchestra}.model.gamepads"
                    }
                }
            }
        }
    });
})(fluid);

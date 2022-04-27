(function (fluid) {
    "use strict";

    fluid.defaults("fluid.gamepad.orchestra.examples.sequencer.step", {
        gradeNames: ["fluid.gamepad.templateRenderer"],
        markup: {
            container: "<div class='fluid-gamepad-sequence-step' id='fluid-gamepad-sequence-step-%col'></div>"
        },
        model: {
            activeStep: -1,
            col: "@expand:parseInt({that}.options.col)", // Obviously problematic, but required if we want to set col using a dynamic component.
            // col: 0,
            focusedStep: 0,
            vibration : {
                weak: 0,
                strong: 0
            }
        },
        modelListeners: {
            vibration: {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.step.toggleActiveness",
                args: ["{that}"]
            },
            focusedStep: {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.step.toggleFocus",
                args: ["{that}"]
            },
            focusedRow: {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.step.toggleFocus",
                args: ["{that}"]
            },
            activeStep: {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.step.toggleActiveStep",
                args: ["{that}"]
            }
        }
    });

    fluid.gamepad.orchestra.examples.sequencer.step.toggleActiveness = function (that) {
        var hasVibration = (fluid.get(that, "model.vibration.weak") + fluid.get(that, "model.vibration.strong")) > 0;
        that.container.toggleClass("fluid-gamepad-sequence-step--hasVibration", hasVibration);
    };

    fluid.gamepad.orchestra.examples.sequencer.step.toggleFocus = function (that) {
        var isFocused = fluid.get(that, "model.focusedStep") === fluid.get(that, "model.col");
        that.container.toggleClass("fluid-gamepad-sequence-step--isFocused", isFocused);
    };

    fluid.gamepad.orchestra.examples.sequencer.step.toggleActiveStep = function (that) {
        var isActiveStep = fluid.get(that, "model.activeStep") === fluid.get(that, "model.col");
        that.container.toggleClass("fluid-gamepad-sequence-step--isActiveStep", isActiveStep);
    };

    // onscreen display for per-sequencer gamepad.  Varies enough from fluid.gamepad.onscreen to use its own setup.
    fluid.defaults("fluid.gamepad.orchestra.examples.sequencer.gamepad", {
        gradeNames: ["fluid.gamepad", "fluid.gamepad.templateRenderer"],
        markup: {
            container: "<div class='gamepad gamepad-%gamepadIndex'><h4 class='gamepad-id'>%gamepad.id</h4><div class='gamepad-sequencer'><div class='gamepad-sequencer-steps'></div><div class='gamepad-sequencer-bpm-container'><div class='gamepad-sequencer-bpm'></div></div></div>"
        },
        selectors: {
            bpm: ".gamepad-sequencer-bpm",
            idLabel: ".gamepad-id",
            sequencer: ".gamepad-sequencer",
            steps: ".gamepad-sequencer-steps"
        },
        minBpm: 10,
        maxBpm: 300,
        members: {
            currentBpm: 90
        },
        // dynamic component sources apparently can't be arrays if you expect to access {sourcePath} in the way we need.
        // sequenceDefs: [
        //     true, true, true, true, true, true, true, true,
        //     true, true, true, true, true, true, true, true,
        //     true, true, true, true, true, true, true, true,
        //     true, true, true, true, true, true, true, true,
        //     true, true, true, true, true, true, true, true,
        //     true, true, true, true, true, true, true, true
        // ],
        // Thankfully, the same as a map works well enough.
        sequenceDefs: {
             0: true,  1: true,  2: true,  3: true,  4: true,  5: true,  6: true,  7: true,
             8: true,  9: true, 10: true, 11: true, 12: true, 13: true, 14: true, 15: true,
            16: true, 17: true, 18: true, 19: true, 20: true, 21: true, 22: true, 23: true,
            24: true, 25: true, 26: true, 27: true, 28: true, 29: true, 30: true, 31: true,
            32: true, 33: true, 34: true, 35: true, 36: true, 37: true, 38: true, 39: true,
            40: true, 41: true, 42: true, 43: true, 44: true, 45: true, 46: true, 47: true
        },
        model: {
            bpm: 90,
            running: false,
            activeStep: 0,
            focusedStep: 0,
            // 48 empty steps, each of which will be paired with its own component.
            sequence: [
                {}, {}, {}, {}, {}, {}, {}, {},
                {}, {}, {}, {}, {}, {}, {}, {},
                {}, {}, {}, {}, {}, {}, {}, {},
                {}, {}, {}, {}, {}, {}, {}, {},
                {}, {}, {}, {}, {}, {}, {}, {},
                {}, {}, {}, {}, {}, {}, {}, {}
            ]
        },
        modelListeners: {
            "bpm": {
                this: "{that}.dom.bpm",
                method: "text",
                args: ["{that}.model.bpm"]
            },
            "gamepad.id": {
                this: "{that}.dom.idLabel",
                method: "text",
                args: ["{that}.model.gamepad.id"]
            },
            "gamepad.connected": {
                this: "{that}.container",
                method: "toggle",
                args: ["{change}.value"]
            },
            "running": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.startStopScheduler",
                args: ["{that}"]
            },
            "sequence.*" : {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.toggleSchedulerIfNeeded",
                args: ["{that}"]
            },
            "connected": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.toggleSchedulerIfNeeded",
                args: ["{that}"]
            },

            // Move focus based on d-pad entries.
            // up: 12
            "gamepad.buttons.12.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.updateFocusedStep",
                args: ["{that}", -8, "{change}.value"]
            },
            // down: 13
            "gamepad.buttons.13.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.updateFocusedStep",
                args: ["{that}", 8, "{change}.value"]
            },
            // left: 14
            "gamepad.buttons.14.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.updateFocusedStep",
                args: ["{that}", -1, "{change}.value"]
            },
            // right: 15
            "gamepad.buttons.15.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.updateFocusedStep",
                args: ["{that}", 1, "{change}.value"]
            },

            // TODO: Model listener to move focus based on axis changes (don't fire on every change or we'll move too quickly).
            // left  stick left/right: 0
            // left  stick up/down: 1
            // right stick left/right: 2
            // right stick up/down: 3

            // TODO: Face buttons to set canned vibration values:
            // 0: strong/weak to 1
            "gamepad.buttons.0.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.setVibration",
                args: ["{that}", "{change}.value", { weak: 1, strong: 1 }] // buttonValue, vibrationDef
            },
            // 1: strong/weak to 0
            "gamepad.buttons.1.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.setVibration",
                args: ["{that}", "{change}.value", { weak: 0, strong: 0 }] // buttonValue, vibrationDef
            },
            // 2: strong to 1
            "gamepad.buttons.2.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.setVibration",
                args: ["{that}", "{change}.value", { weak: 0, strong: 1 }] // buttonValue, vibrationDef
            },
            // 3: weak to 1
            "gamepad.buttons.3.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.setVibration",
                args: ["{that}", "{change}.value", { weak: 1, strong: 0 }] // buttonValue, vibrationDef
            },

            // bumpers to decrease / increase BPM
            "gamepad.buttons.4.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.incrementBpm",
                args: ["{that}", "{change}.value", -10] // buttonValue, increment
            },
            "gamepad.buttons.5.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.incrementBpm",
                args: ["{that}", "{change}.value", 10] // buttonValue, increment
            },

            // thumb stick press to play / pause
            "gamepad.buttons.10.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.playPause",
                args: ["{that}", "{change}.value"] // buttonValue
            },
            "gamepad.buttons.11.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.playPause",
                args: ["{that}", "{change}.value"] // buttonValue
            },

            // TODO: Model listener to update step weak/strong vibration based on left (6) and right (7) triggers.
        },
        dynamicComponents: {
            step: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                sources: "{that}.options.sequenceDefs",
                options: {
                    col: "{sourcePath}", // Works, and is fine since we don't need it to actually relay.

                    modelRelay: [
                        {
                            source: {
                                context: "gamepad",
                                segs: ["sequence", "{sourcePath}"]
                            },
                            target: "vibration"
                        }
                    ],

                    model: {
                        // col: "{sourcePath}", // Fails.
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep"
                    }
                }
            }
        },
        components: {
            scheduler: {
                type: "berg.scheduler",
                options: {
                    components: {
                        clock: {
                            type: "berg.clock.raf",
                            options: {
                                //freq: 17 // Times per second, enough to poll for 999 bpm / 60 seconds.
                                freq: 50 // times per second, enough to handle 3000 bpm / 60 seconds.
                            }
                            // TODO: pair with Colin and get this working
                            //type: "berg.clock.autoAudioContext"
                        }
                    }
                }
            }
        },

        listeners: {
            "onCreate.scheduleSequence": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.scheduleSequence",
                args: ["{that}", "{scheduler}"]
            }
        },

        invokers: {
            processStep: {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.processStep",
                args: ["{that}"]
            }
        }
    });

    fluid.gamepad.orchestra.examples.sequencer.gamepad.updateFocusedStep = function (that, increment, buttonValue) {
        if (buttonValue) {
            var newFocusedStep = (that.model.focusedStep + increment) % 48;
            that.applier.change("focusedStep", newFocusedStep);
        }
    };

    fluid.gamepad.orchestra.examples.sequencer.gamepad.playPause = function (that, buttonValue) {
        if (buttonValue) {
            that.applier.change("running", !that.model.running);
        }
    };

    fluid.gamepad.orchestra.examples.sequencer.gamepad.incrementBpm = function (that, buttonValue, increment) {
        if (buttonValue) {
            var newBpm = Math.max(that.options.minBpm, Math.min(that.options.maxBpm, that.model.bpm + increment));
            that.applier.change("bpm", newBpm);
        }
    };

    fluid.gamepad.orchestra.examples.sequencer.gamepad.setVibration = function (that, buttonValue, vibrationDef) {
        if (buttonValue) {
            that.applier.change(["sequence", that.model.focusedStep], vibrationDef);
        }
    };

    fluid.gamepad.orchestra.examples.sequencer.gamepad.toggleSchedulerIfNeeded = function (that) {
        if (that.model.gamepad.connected) {
            var firstStepWithVibration = fluid.find(that.model.sequence, function (singleStep) {
                return (singleStep.weak || singleStep.strong) ? true : undefined;
            });
            if (!firstStepWithVibration) {
                that.applier.change("running", false);
            }
        }
        else {
            that.applier.change("running", false);
        }
    };


    fluid.gamepad.orchestra.examples.sequencer.gamepad.startStopScheduler = function (that) {
        if (that.model.running) {
            that.scheduler.start();
        }
        else {
            that.applier.change("activeStep", -1);
            that.scheduler.stop();
        }
    };

    fluid.gamepad.orchestra.examples.sequencer.gamepad.scheduleSequence = function (that, scheduler) {
        scheduler.schedule({
            type: "repeat",
            freq: 1,
            callback: that.processStep
        });

        fluid.gamepad.orchestra.examples.sequencer.gamepad.updateBpm(that);
    };

    fluid.gamepad.orchestra.examples.sequencer.gamepad.updateBpm = function (that) {
        that.currentBpm = that.model.bpm;
        that.scheduler.setTimeScale(60 / that.currentBpm);
    };

    fluid.gamepad.orchestra.examples.sequencer.gamepad.processStep = function (that) {
        if (that.currentBpm !== that.model.bpm) {
            fluid.gamepad.orchestra.examples.sequencer.gamepad.updateBpm(that);
        }

        var nextActiveStep = (that.model.activeStep + 1) % 48;
        that.applier.change("activeStep", nextActiveStep);

        // Play exactly until time for the next step, so that repeated vibrations of the same strength appear
        // continuous.
        //
        // TODO: Detect "tied" steps if this approach doesn't work for neighbouring steps with the same vibration.
        var strongMagnitude = fluid.get(that,["model", "sequence", that.model.activeStep, "strong"]) || 0;
        var weakMagnitude = fluid.get(that,["model", "sequence", that.model.activeStep, "weak"]) || 0;
        // prior vibrations will fade on their own, so we don't need to send zeroes to stop anything.
        if (strongMagnitude || weakMagnitude) {
            var duration = 60000 / that.currentBpm;

            that.vibrate({
                duration: duration,
                startDelay: 0,
                strongMagnitude: strongMagnitude,
                weakMagnitude: weakMagnitude
            });
        }
    };

    fluid.defaults("fluid.gamepad.orchestra.examples.sequencer.gamepads", {
        gradeNames: ["fluid.gamepad.gamepads.onscreen"],
        components: {
            gamepad0: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad1: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad2: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad3: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad4: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad5: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad6: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad7: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad8: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad9: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad10: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad11: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad12: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad13: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad14: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            },
            gamepad15: {
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepad"
            }
        }
    });

    fluid.defaults("fluid.gamepad.orchestra.examples.sequencer", {
        gradeNames: ["fluid.gamepad.orchestra", "fluid.gamepad.templateRenderer"],
        markup: {
            container: "<div class='gamepad-orchestra-pit'></div>"
        },
        components: {
            gamepads: {
                container: "{that}.container",
                type: "fluid.gamepad.orchestra.examples.sequencer.gamepads",
                options: {
                    model: {
                        gamepads: "{fluid.gamepad.orchestra}.model.gamepads"
                    }
                }
            }
        }
    });
})(fluid);

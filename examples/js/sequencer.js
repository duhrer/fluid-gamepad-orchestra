(function (fluid) {
    "use strict";

    fluid.defaults("fluid.gamepad.orchestra.examples.sequencer.step", {
        gradeNames: ["fluid.gamepad.templateRenderer"],
        markup: {
            container: "<div class='fluid-gamepad-sequence-step' id='fluid-gamepad-sequence-step-%col'></div>"
        },
        model: {
            activeStep: -1,
            col: 0,
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
        model: {
            bpm: 90,
            running: false,
            activeStep: 0,
            focusedStep: 0,
            // 24 empty steps
            sequence: [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ]
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
                args: ["{that}", -6, "{change}.value"]
            },
            // down: 13
            "gamepad.buttons.13.pressed": {
                funcName: "fluid.gamepad.orchestra.examples.sequencer.gamepad.updateFocusedStep",
                args: ["{that}", 6, "{change}.value"]
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
        components: {
            // TODO: Try accomplishing this with dynamic components and sources.
            step0: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 0,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.0"
                    }
                }
            },
            step1: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 1,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.1"
                    }
                }
            },
            step2: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 2,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.2"
                    }
                }
            },
            step3: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 3,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.3"
                    }
                }
            },
            step4: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 4,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.4"
                    }
                }
            },
            step5: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 5,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.5"
                    }
                }
            },
            step6: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 6,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.6"
                    }
                }
            },
            step7: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 7,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.7"
                    }
                }
            },
            step8: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 8,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.8"
                    }
                }
            },
            step9: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 9,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.9"
                    }
                }
            },
            step10: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 10,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.10"
                    }
                }
            },
            step11: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 11,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.11"
                    }
                }
            },
            step12: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 12,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.12"
                    }
                }
            },
            step13: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 13,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.13"
                    }
                }
            },
            step14: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 14,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.14"
                    }
                }
            },
            step15: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 15,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.15"
                    }
                }
            },
            step16: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 16,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.16"
                    }
                }
            },
            step17: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 17,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.17"
                    }
                }
            },
            step18: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 18,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.18"
                    }
                }
            },
            step19: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 19,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.19"
                    }
                }
            },
            step20: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 20,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.20"
                    }
                }
            },
            step21: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 21,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.21"
                    }
                }
            },
            step22: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 22,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.22"
                    }
                }
            },
            step23: {
                type: "fluid.gamepad.orchestra.examples.sequencer.step",
                container: "{that}.dom.steps",
                options: {
                    model: {
                        col: 23,
                        activeStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.activeStep",
                        focusedStep: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.focusedStep",
                        vibration: "{fluid.gamepad.orchestra.examples.sequencer.gamepad}.model.sequence.23"
                    }
                }
            },

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
            var newFocusedStep = (that.model.focusedStep + increment) % 24;
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

        var nextActiveStep = (that.model.activeStep + 1) % 24;
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

(function (fluid) {
    "use strict";

    fluid.defaults("fluid.gamepad.orchestra.examples.hug", {
        gradeNames: ["fluid.gamepad.orchestra.onscreen"],

        components: {
            gamepads: {
                options: {
                    components: {
                        gamepad0: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad1: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad2: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad3: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad4: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad5: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad6: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad7: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad8: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad9: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad10: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad11: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad12: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad13: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad14: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        },
                        gamepad15: {
                            options: {
                                modelListeners: {
                                    "gamepad.buttons.*": {
                                        excludeSource: "init",
                                        funcName: "fluid.gamepad.orchestra.examples.hug.vibrate",
                                        args: ["{fluid.gamepad}"]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    fluid.gamepad.orchestra.examples.hug.vibrate = function (that) {
        var buttonsPressed = 0;
        fluid.each(that.model.gamepad.buttons, function (singleButton) {
            if (singleButton.pressed) {
                buttonsPressed++;
            }
        });

        // playEffect (type, params)
        // 	1. type:  "dual-rumble" or "vibration"
        // 		1. Try each to see if there is an appreciable difference.
        // 	2. params
        // 		1. duration: The duration of the effect in milliseconds.
        // 		2. startDelay: The delay in milliseconds before the effect is started.
        // 		3. strongMagnitude: Rumble intensity of the low-frequency (strong) rumble motors, normalized to the range between 0.0 and 1.0.
        // 		4. weakMagnitude: Rumble intensity of the high-frequency (weak) rumble motors, normalized to the range between 0.0 and 1.0.

        var percentPressed = buttonsPressed / that.model.gamepad.buttons.length;

        that.vibrate({
            duration: 1000,
            startDelay: 0,
            strongMagnitude: percentPressed,
            weakMagnitude: percentPressed
        });
    };
})(fluid);

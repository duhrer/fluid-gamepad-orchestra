(function (fluid) {
    "use strict";
    fluid.defaults("fluid.gamepad.orchestra.examples.axes", {
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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
                                        funcName: "fluid.gamepad.orchestra.examples.axes.vibrate",
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

    fluid.gamepad.orchestra.examples.axes.vibrate = function (that) {
        var weakDeflection = fluid.gamepad.orchestra.examples.axes.calculateDeflection(that.model.gamepad.axes[0], that.model.gamepad.axes[1]);
        var strongDeflection = fluid.gamepad.orchestra.examples.axes.calculateDeflection(that.model.gamepad.axes[2], that.model.gamepad.axes[3]);

        that.vibrate({
            duration: 1000,
            startDelay: 0,
            strongMagnitude: strongDeflection,
            weakMagnitude: weakDeflection
        });
    };

    fluid.gamepad.orchestra.examples.axes.calculateDeflection = function (axisValue1, axisValue2) {
        var sumOfSquares = Math.pow(axisValue1, 2) + Math.pow(axisValue2, 2);
        var deflection = Math.min(1, Math.sqrt(sumOfSquares));

        // Cutoff to reduce jitter, less than Math.sqrt(0.02), i.e. both axes were less than 0.1.
        if (deflection > 0.14142135623731) {
            return deflection;
        }
        else {
            return 0;
        }
    };
})(fluid);

(function (fluid) {
    "use strict";

    // TODO: add support and onscreen elements for axes and onscreen elements.

    // TODO: Make an example where axes control vibrations on a single pad, axes 1/2 for weak, axes 3/4 for strong, based on deflection only.
    // TODO: Make an example where each gamepad contributes energy that vibrates all pads.

    // TODO: Make a sequencer example where the gamepad creates patterns of vibration.
    // labels to identify what controller this is, ideally somewhat simplified. (function to generate label from Gamepad.id (test with multiples of the same type of pad)).
    // grid of toggles for "steps"
    // controls for number of steps
    // controls for BPM
    // "start" / "stop" controls.

    // The onscreen representation of a single gamepad.
    fluid.defaults("fluid.gamepad", {
        gradeNames: ["fluid.modelComponent"],
        model: {
            gamepad: {
                connected: false,
                id: "Not connected",
                gamepadIndex: "disconnected",

                // Placeholder model data.
                axes: [{}, {}, {}, {}, {}, {}],
                buttons: [
                    {}, {}, {}, {}, {}, {}, {}, {}, {},
                    {}, {}, {}, {}, {}, {}, {}, {}, {}
                ]
            }
        },
        invokers: {
            vibrate: {
                funcName: "fluid.gamepad.vibrate",
                args: ["{that}", "{arguments}.0"] // vibrationEffectDef
            }
        }
    });

    fluid.gamepad.vibrate = function (that, vibrationEffectDef) {
        // console.log("buzz");
        var vibrationActuator = fluid.get(that, "model.gamepad.vibrationActuator");
        if (vibrationActuator) {
            // playEffect (type, params)
            // 	1. type:  "dual-rumble" or "vibration"
            // 		1. Try each to see if there is an appreciable difference.
            // 	2. params
            // 		1. duration: The duration of the effect in milliseconds.
            // 		2. startDelay: The delay in milliseconds before the effect is started.
            // 		3. strongMagnitude: Rumble intensity of the low-frequency (strong) rumble motors, normalized to the range between 0.0 and 1.0.
            // 		4. weakMagnitude: Rumble intensity of the high-frequency (weak) rumble motors, normalized to the range between 0.0 and 1.0.
            vibrationActuator.playEffect(vibrationActuator.type, vibrationEffectDef);
        }
    };


    // The onscreen representation of a single gamepad.
    fluid.defaults("fluid.gamepad.onscreen", {
        gradeNames: ["fluid.gamepad", "fluid.gamepad.templateRenderer"],
        markup: {
            container: "<div class='gamepad gamepad-%gamepadIndex'><h4 class='gamepad-id'>%gamepad.id</h4><div class='gamepad-buttons-and-axes'><div><h5>Buttons</h5><div class='gamepad-buttons'></div></div><div><h5>Axes</h5><div class='gamepad-axes'></div></div></div></div>"
        },
        selectors: {
            axes: ".gamepad-axes",
            buttons: ".gamepad-buttons",
            idLabel: ".gamepad-id"
        },
        modelListeners: {
            "gamepad.id": {
                this: "{that}.dom.idLabel",
                method: "text",
                args: ["{that}.model.gamepad.id"]
            },
            "gamepad.connected": {
                this: "{that}.container",
                method: "toggle",
                args: ["{change}.value"]
            }
        },
        components: {
            // TODO: Talk with Antranig about simplifying axes and buttons into a single pattern used for 0, 1, 2, etc.
            axis0: {
                type: "fluid.gamepad.axis",
                container: "{that}.dom.axes",
                options: {
                    model: {
                        axisIndex: 0,
                        value: "{fluid.gamepad}.model.gamepad.axes.0"
                    }
                }
            },
            axis1: {
                type: "fluid.gamepad.axis",
                container: "{that}.dom.axes",
                options: {
                    model: {
                        axisIndex: 1,
                        value: "{fluid.gamepad}.model.gamepad.axes.1"
                    }
                }
            },
            axis2: {
                type: "fluid.gamepad.axis",
                container: "{that}.dom.axes",
                options: {
                    model: {
                        axisIndex: 2,
                        value: "{fluid.gamepad}.model.gamepad.axes.2"
                    }
                }
            },
            axis3: {
                type: "fluid.gamepad.axis",
                container: "{that}.dom.axes",
                options: {
                    model: {
                        axisIndex: 3,
                        value: "{fluid.gamepad}.model.gamepad.axes.3"
                    }
                }
            },

            button0: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 0,
                        button: "{fluid.gamepad}.model.gamepad.buttons.0"
                    }
                }
            },
            button1: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 1,
                        button: "{fluid.gamepad}.model.gamepad.buttons.1"
                    }
                }
            },
            button2: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 2,
                        button: "{fluid.gamepad}.model.gamepad.buttons.2"
                    }
                }
            },
            button3: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 3,
                        button: "{fluid.gamepad}.model.gamepad.buttons.3"
                    }
                }
            },
            button4: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 4,
                        button: "{fluid.gamepad}.model.gamepad.buttons.4"
                    }
                }
            },
            button5: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 5,
                        button: "{fluid.gamepad}.model.gamepad.buttons.5"
                    }
                }
            },
            button6: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 6,
                        button: "{fluid.gamepad}.model.gamepad.buttons.6"
                    }
                }
            },
            button7: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 7,
                        button: "{fluid.gamepad}.model.gamepad.buttons.7"
                    }
                }
            },
            button8: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 8,
                        button: "{fluid.gamepad}.model.gamepad.buttons.8"
                    }
                }
            },
            button9: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 9,
                        button: "{fluid.gamepad}.model.gamepad.buttons.9"
                    }
                }
            },
            button10: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 10,
                        button: "{fluid.gamepad}.model.gamepad.buttons.10"
                    }
                }
            },
            button11: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 11,
                        button: "{fluid.gamepad}.model.gamepad.buttons.11"
                    }
                }
            },
            button12: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 12,
                        button: "{fluid.gamepad}.model.gamepad.buttons.12"
                    }
                }
            },
            button13: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 13,
                        button: "{fluid.gamepad}.model.gamepad.buttons.13"
                    }
                }
            },
            button14: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 14,
                        button: "{fluid.gamepad}.model.gamepad.buttons.14"
                    }
                }
            },
            button15: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 15,
                        button: "{fluid.gamepad}.model.gamepad.buttons.15"
                    }
                }
            },
            button16: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 16,
                        button: "{fluid.gamepad}.model.gamepad.buttons.16"
                    }
                }
            },
            button17: {
                type: "fluid.gamepad.button",
                container: "{that}.dom.buttons",
                options: {
                    model: {
                        buttonIndex: 17,
                        button: "{fluid.gamepad}.model.gamepad.buttons.17"
                    }
                }
            }
        }
    });
})(fluid);

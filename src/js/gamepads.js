(function (fluid) {
    "use strict";

    // A "grouping" component that (re)creates the set of gamepads based on the output of `navigator.getGamepads()`.
    fluid.defaults("fluid.gamepad.gamepads.onscreen", {
        gradeNames: ["fluid.gamepad.templateRenderer"],
        markup: {
            container: "<div class='gamepads'></div>"
        },
        model: {
            gamepads: [
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false },
                { connected: false }
            ]
        },
        components: {
            gamepad0: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 0,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.0"
                    }
                }
            },
            gamepad1: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 1,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.1"
                    }
                }
            },
            gamepad2: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 2,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.2"
                    }
                }
            },
            gamepad3: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 3,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.3"
                    }
                }
            },
            gamepad4: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 4,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.4"
                    }
                }
            },
            gamepad5: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 5,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.5"
                    }
                }
            },
            gamepad6: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 6,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.6"
                    }
                }
            },
            gamepad7: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 7,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.7"
                    }
                }
            },
            gamepad8: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 8,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.8"
                    }
                }
            },
            gamepad9: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 9,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.9"
                    }
                }
            },
            gamepad10: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 10,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.10"
                    }
                }
            },
            gamepad11: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 11,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.11"
                    }
                }
            },
            gamepad12: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 12,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.12"
                    }
                }
            },
            gamepad13: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 13,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.13"
                    }
                }
            },
            gamepad14: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 14,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.14"
                    }
                }
            },
            gamepad15: {
                type: "fluid.gamepad.onscreen",
                container: "{that}.container",
                options: {
                    model: {
                        gamepadIndex: 15,
                        gamepad: "{fluid.gamepad.gamepads.onscreen}.model.gamepads.15"
                    }
                }
            }
        }
        // TODO: Revisit this pattern later.
        // // Adapted from: https://github.com/fluid-project/infusion/blob/466f09760ca4a8984a56ad37f6abd526287cee12/tests/framework-tests/core/js/DataBindingTests.js#L1950
        // dynamicComponents: {
        //     gamepad: {
        //         type: "fluid.gamepad",
        //         container: "{that}.container",
        //         sources: "{that}.options.gamepadDefs",
        //         options: {
        //             modelRelay: {
        //                 source: {
        //                     context: "gamepads",
        //                     segs: ["gamepads", "{sourcePath}"]
        //                 },
        //                 target: "gamepad"
        //             }
        //         }
        //     }
        // }
    });
})(fluid);

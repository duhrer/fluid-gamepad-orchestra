(function (fluid) {
    "use strict";

    fluid.defaults("fluid.gamepad.button", {
        gradeNames: ["fluid.gamepad.templateRenderer"],
        markup: {
            container: "<div class='gamepad-button'><div class='button-label'>%buttonIndex</div></div>"
        },
        model: {
            buttonIndex: ".",
            button: {}
        },
        modelListeners: {
            "button.pressed": {
                this: "{that}.container",
                method: "toggleClass",
                args: ["gamepad-button--pressed", "{change}.value"]
            }
        }
    });
})(fluid);

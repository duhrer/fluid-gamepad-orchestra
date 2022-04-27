(function (fluid) {
    "use strict";
    fluid.defaults("fluid.gamepad.axis", {
        gradeNames: ["fluid.gamepad.templateRenderer"],
        markup: {
            container: "<div class='gamepad-axis'><h5 class='gamepad-axis-label'>%axisIndex</h5><div class='gamepad-axis-value-bar'><div class='gamepad-axis-value-bar-position-indicator'><div class='gamepad-axis-value'>%value</div></div></div></div>"
        },
        model: {
            value: 0,
            roundedValue: 0
        },
        selectors: {
            "value": ".gamepad-axis-value",
            "positionIndicator": ".gamepad-axis-value-bar-position-indicator"
        },
        modelListeners: {
            "value": [
                // Text Displayed
                // Can't use because the raw number is rounded awfully.
                // {
                //     this: "{that}.dom.value",
                //     method: "text",
                //     args: ["{that}.model.value"]
                // },
                {
                    funcName: "fluid.gamepad.axis.updateDisplayedValue",
                    args: ["{that}"]
                },
                {
                    funcName: "fluid.gamepad.axis.updatePositionIndicator",
                    args: ["{that}"]
                }
            ]
        }
    });

    fluid.gamepad.axis.updatePositionIndicator = function (that) {
        var positionIndicatorElement = that.locate("positionIndicator");

        // TODO: Come up with a less janky way of handling this.
        // -1: margin-top: 0rem;
        //  0: margin-top: 6rem;
        //  1: margin-1op: 12rem;

        // To reduce jitter.
        var roundedValue = Math.round(that.model.value * 10) / 10;


        var marginTopInRems = 6 + (roundedValue * 6);
        positionIndicatorElement.css('margin-top', marginTopInRems + "rem");
    };

    fluid.gamepad.axis.updateDisplayedValue = function (that) {
        var labelElement = that.locate("value");
        var roundedValue = Math.round(that.model.value * 10) / 10;
        var postDecimal = roundedValue % 1;
        var preDecimal = roundedValue - postDecimal;
        var leader = roundedValue >= 0 ? "+ " : "- ";
        var label = leader + Math.abs(preDecimal).toString().padStart(1, "0") + "." + (Math.abs(postDecimal) * 100).toString().padEnd(2, "0");
        labelElement.text(label);
    };
})(fluid);

(function (fluid) {
    "use strict";
    fluid.defaults("fluid.gamepad.templateRenderer", {
        gradeNames: ["fluid.containerRenderingView"],
        markup: {
            container: ""
        },
        model: {},
        invokers: {
            // TODO: Look at fluid-osk for rebinding logic after (re)render.
            renderMarkup: {
                funcName: "fluid.gamepad.templateRenderer.render",
                args: ["{that}", "{that}.options.markup.container", "{that}.model"]
            }
        }
    });

    fluid.gamepad.templateRenderer.render = function (that, markupTemplate, model) {
        var renderedContent = fluid.stringTemplate(markupTemplate, model);
        return renderedContent;
    };
})(fluid);

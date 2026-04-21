sap.ui.define(
  ["sap/ui/core/UIComponent", "jodobeers/model/models", "sap/ui/Device"],
  (UIComponent, models, Device) => {
    "use strict";

    return UIComponent.extend("jodobeers.Component", {
      metadata: {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      init() {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // enable routing
        this.getRouter().initialize();
      },
      getContentDensityClass: function () {
        if (!this._sContentDensityClass) {
          if (Device.support.touch) {
            this._sContentDensityClass = "sapUiSizeCozy";
          } else {
            this._sContentDensityClass = "sapUiSizeCompact";
          }
        }
        return this._sContentDensityClass;
      },
    });
  },
);

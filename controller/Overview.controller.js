sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, syncStyleClass, JSONModel, Fragment, MessageToast) {
    "use strict";

    return Controller.extend("jodobeers.controller.Overview", {
      onInit: function () {
        //var oModel = new JSONModel();
        //this.getView().setModel(oModel, "jododata");
        var oOktoberModel = new JSONModel(
            sap.ui.require.toUrl("jodobeers/model/oktoberfest.json"),
          ),
          oPitorro = new JSONModel(
            sap.ui.require.toUrl("jodobeers/model/pitorro.json"),
          ),
          oPus = new JSONModel(
            sap.ui.require.toUrl("jodobeers/model/pus.json"),
          );

        this.getView()
          .setModel(oOktoberModel, "Oktoberfest")
          .setModel(oPitorro, "Pitorro")
          .setModel(oPus, "Pus");
      },
      openQuickView: function (oEvent, oModel) {
        var oButton = oEvent.getSource(),
          oView = this.getView();

        if (!this._pQuickView) {
          this._pQuickView = Fragment.load({
            id: oView.getId(),
            name: "jodobeers.view.QuickView",
            controller: this,
          }).then(function (oQuickView) {
            oView.addDependent(oQuickView);
            return oQuickView;
          });
        }
        this._pQuickView.then(function (oQuickView) {
          oQuickView.setModel(oModel);
          oQuickView.openBy(oButton);
        });
      },
      onPressTile: function (oEvent) {
        var oBindingContext = oEvent.getSource().getBindingContext();
        var identificador = oBindingContext.getProperty("identificador");
        var oModel = this.getView().getModel(identificador);
        this.openQuickView(oEvent, oModel);

        var detalle = oBindingContext.getProperty("detalle");
      },
    });
  },
);

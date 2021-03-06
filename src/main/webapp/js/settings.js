var BookIt = BookIt || {};
BookIt.Settings = BookIt.Settings || {};
BookIt.Settings.signUpUrl = "/rest/register"; // "https://127.0.0.1:30000/api/account/register";
BookIt.Settings.signInUrl = "/rest/login/login";
BookIt.Settings.getUser = "/rest/login/login";
BookIt.Settings.powerContract = "/rest/power/type/%TYPEID%/contract";
BookIt.Settings.deleteSessionUrl = "/rest/login/session";
BookIt.Settings.measurePowerURL = "/rest/power/type/%TYPEID%/measure";
BookIt.Settings.powerMeasureTypes = "/rest/power/powermeasuretypes";
BookIt.Settings.powerMeasureType = "/rest/power/powermeasuretype";
BookIt.Settings.measurePowerHistoryURL = "/rest/power/type/%TYPEID%/measure/history";
BookIt.Settings.getLastPowerMeasureURL = "/rest/power/measure/last";
BookIt.Settings.getMeasureByIDURL = "/rest/power/measure/";
BookIt.Settings.getAllPowerMeasureURL = "/rest/power/type/%TYPEID%/measure";
BookIt.Settings.getAllPowerMeasureGraph = "/rest/power/type/%TYPEID%/measuregraph";
BookIt.Settings.getAllPowerSuppliesURL = "/rest/power/type/%TYPEID%/supplies";
BookIt.Settings.getSupplySettings = "/rest/power/type/%TYPEID%/supply/settings";
BookIt.Settings.getMenuList = "/rest/power/menulist";

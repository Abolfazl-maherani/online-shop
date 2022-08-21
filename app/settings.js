const IpPanel = require("./utils/api/IpPanelApi");

const ipPanel = new IpPanel(process.env.API_KEY_SMS);
ipPanel.setPttern("9m68xwmh9hb85ko");
module.exports = {
  ipPanel,
};

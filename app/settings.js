const IpPanel = require("./utils/api/IpPanelApi");

const ipPanel = new IpPanel(process.env.API_KEY_SMS);
module.exports = {
  ipPanel,
};

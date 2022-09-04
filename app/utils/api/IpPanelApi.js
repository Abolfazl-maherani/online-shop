//TODO: Must create Error handler for this section
const { default: axios } = require("axios");
const { phoneIsValid, normalizePhone } = require("../functions");

class IpPanel {
  #apiKey;
  _statusOk = "OK";
  _pattern = null;

  constructor(apiKey, fromNumber = "+983000505") {
    if (!typeof apiKey === "string") return;
    this.number = fromNumber;
    this.#apiKey = apiKey.trim();
    this._prefixApi = "AccessKey";
    this._baseUrl = "http://rest.ippanel.com/v1";
    this._configApi();
    this._endPoints = this._configEndpoint();
  }
  _configApi() {
    axios.defaults.baseURL = this._baseUrl;
    axios.defaults.headers.common["Authorization"] = this._prefixApi.concat(
      " ",
      this.#apiKey
    );
    axios.defaults.headers.post["Content-Type"] = ["application/json"];
    return {};
  }
  _configEndpoint() {
    const endPoint = {
      getAuthorizedUser: {
        endPoint: "/user",
        method: "get",
      },
      credit: {
        endPoint: "/credit",
        method: "get",
      },
      message: {
        endPoint: "/messages",
        method: "post",
      },
      createPattern: {
        endPoint: "/messages/patterns",
        method: "post",
      },
      sendPattern: {
        endPoint: "/messages/patterns/send",
        method: "post",
      },
      getSms: {
        endPoint: "/messages/{bllk_id}",
        method: "get",
        setParam: true,
      },
      getMessageRecipientsStatus: {
        endPoint: "/messages/{bulk_id}/recipients",
        method: "get",
        setParam: true,
      },
      fetchInboxMessages: {
        endPoint: "/messages/inbox",
        method: "get",
      },
    };
    endPoint.replaceParam = function (prop, ...params) {
      if (!(prop in this)) return;

      if (typeof prop !== "string") return;
      prop = prop.trim();
      const obj = this[prop];

      if (!obj.hasOwnProperty("setParam")) return obj.endPoint;
      let index = 0;
      const match = /\{[^]+\}/;
      let endpointUrl = obj["endPoint"];

      while (endpointUrl.match(match)) {
        endpointUrl = endpointUrl.replace(match, params[index]);
        index++;
      }

      return endpointUrl;
    };
    return this;
  }
  setPttern(pattern) {
    if (!pattern || typeof pattern !== "string")
      throw "pattern must be a string";
    return (this._pattern = pattern);
  }
  async InboxMessages(page = 0, limit = 10) {
    try {
      if (!Number.isInteger(page) && !Number.isInteger(limit))
        throw "page or limit must be a number";
      const { endPoint } = this._endPoints.fetchInboxMessages;
      const { data: result } = await axios.get(endPoint, {
        params: {
          page,
          limit,
        },
      });
      return result?.status === this._statusOk ? result.data : false;
    } catch (error) {
      console.log(error.message);
    }
  }
  async getSmsById(id) {
    try {
      if (!Number.isInteger(id) || !id) throw "Enter Id for get sms";
      const endPoint = this._endPoints.replaceParam("getSms", id);
      const { data: result } = await axios.get(endPoint);
      return result?.status === this._statusOk ? result.data : false;
    } catch (error) {
      console.log(error.message);
    }
  }
  async getMsgRecipientsStatusById(id) {
    try {
      if (!Number.isInteger(id) || !id)
        throw "Enter Id for get RecipientsStatus";
      const endPoint = this._endPoints.replaceParam(
        "getMessageRecipientsStatus",
        id
      );

      const { data: result } = await axios.get(endPoint);
      return result?.status === this._statusOk ? result.data : false;
    } catch (error) {
      console.log(error.message);
    }
  }
  async getUser() {
    try {
      const { endPoint, method } = this._endPoints.getAuthorizedUser;
      const { data: result } = await axios.get(endPoint);
      return result?.status === this._statusOk ? result.data : false;
    } catch (error) {
      console.log(error);
    }
  }
  async getCredit() {
    try {
      const { endPoint, method } = this._endPoints.credit;
      const { data: result } = await axios.get(endPoint);
      return result?.status === this._statusOk ? result.data : false;
    } catch (error) {
      console.log(error);
    }
  }
  async sendSms(content, ...numbers) {
    try {
      const { endPoint } = this._endPoints.message;
      if (typeof content !== "string") throw "The content sms must be a string";
      if (!numbers.every((el) => typeof el === "string"))
        throw "The number must be Array of string";

      if (!numbers.every((el) => phoneIsValid(el)))
        throw "The number is not valid";
      numbers = numbers.map((el) => normalizePhone(el));
      console.log(numbers);
      const { data: result } = await axios.post(endPoint, {
        originator: this.number, //Must be changed
        recipients: numbers,
        message: content.trim(),
      });
      return result?.code === this._statusOk ? result?.data : false;
    } catch (error) {
      console.log(error);
    }
  }
  async createPattern(pattern, option = undefined) {
    //FIX: this method is correct but the service is deactived
    try {
      const { endPoint } = this._endPoints.createPattern;
      if (typeof pattern !== "string") throw "The pattern must be a string";
      const { description = "", is_shared = false } = option ? option : {};
      const { data: result } = await axios.post(endPoint, {
        pattern,
      });
      return result?.code === this._statusOk ? result?.data : false;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.toJSON());
    }
  }
  async sendSmsWithPattern(number, objVariable) {
    try {
      const { endPoint } = this._endPoints.sendPattern;
      const { _pattern: patternCode } = this;
      if (!patternCode) throw "Enter the pattern code";
      if (!number) throw "Enter the number";
      if (typeof patternCode !== "string" || typeof number !== "string") return;
      if (!phoneIsValid(number)) throw "The Number is not valid";
      console.log(objVariable);
      const { data: result } = await axios.post(endPoint, {
        pattern_code: patternCode, //Must be changed
        originator: this.number,
        recipient: normalizePhone(number),
        values: objVariable,
      });
      return result?.code === this._statusOk ? result?.data : false;
    } catch (error) {
      console.log(error.response);
    }
  }
}
const ipPanel = new IpPanel(process.env.API_KEY_SMS);
ipPanel.setPttern("9m68xwmh9hb85ko");
module.exports = ipPanel;

const moment = require("moment");
require("moment-duration-format")

function formatMoment(val) {
  return moment.duration(val).format("D[d] H[h] m[m] s[s]")
}

module.exports = formatMoment;
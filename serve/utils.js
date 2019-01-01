
const utils = {
  formatDB(rowDataPacket) {
    if (rowDataPacket.length == 0) {
      return [];
    }
    let string = JSON.stringify(rowDataPacket);
    let data = JSON.parse(string);
    return data;
  } 
}
module.exports = utils
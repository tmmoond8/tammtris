class MapDataManager {
  static ITEMS = {
    '+': 11,
    '#': 13,
    '-': 12,
    '=': 14,
    '~': 15,
    '*': 16
  }
  static getTestMap() {
    const mapData = 
     `0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      0|0|0|0|0|0|0|0|0|0
      1|1|1|+|0|1|-|1|1|1
      1|1|1|=|0|1|*|1|1|1`;

    const coreMapDat = mapData.replace(/ /g, '').split(String.fromCharCode(10))
                      .map(line => line.split('|'));

    return coreMapDat.map(line => (line.map(item => {
        item = MapDataManager.ITEMS[item] ? MapDataManager.ITEMS[item] : item
        return parseInt(item, 10)
      })
    ));
  }
  
}

export default MapDataManager;
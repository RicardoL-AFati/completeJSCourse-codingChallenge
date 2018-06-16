class Town {
    constructor(parks, streets) {
      this.parks = parks;
      this.streets = streets;    
    }

    getTotalStLengths () {
      return this.streets.reduce((total, street) => total + street.length, 0);
    }

    getAvgStLength () {
      return this.getTotalStLengths() / this.streets.length;
    }

    getAvgParkAge () {
      const totalAge = this.parks.reduce((total, park) => total + park.calcParkAge(), 0)
      return (totalAge / this.parks.length).toFixed(2);  
    }

    getParkMTrees () {
      return this.parks.find(park => park.numberOfTrees > 1000);    
    }

    getParksReport () {
      const parksReport = new Map();    
      parksReport.set('avgAge', 
        `Our ${this.parks.length} parks have an average age of ${this.getAvgParkAge()} years`
      );
      this.parks.forEach(park => {
        parksReport.set(`${park.name}`,
          `${park.name} has an average tree density of ${park.calcTreeDensity()} trees per acre`
        );
      });
      parksReport.set('parkM',
        `${this.getParkMTrees().name} has over 1000 trees`
      );      
      return parksReport;
    }

    getStreetsReport () {
        const streetsReport = new Map();    
        streetsReport.set('avgLength', 
          `Our ${this.streets.length} streets have an average length of ${this.getAvgStLength()} miles`
        );
        this.streets.forEach(street => {
            streetsReport.set(`${street.name}`,
            `${street.name} built in ${street.buildYear}, is a ${street.size} street.`
          );
        });    
        return streetsReport;
      }
}

class TownElement {
    constructor (name, buildYear) {
      this.name = name;
      this.buildYear = buildYear;
    }
}

class Street extends TownElement {
    constructor (name, buildYear, length, size = 'normal') {
      super(name, buildYear);
      this.length = length;
      this.size = size;    
    }
}

class Park extends TownElement {
    constructor (name, buildYear, numberOfTrees, parkArea) {
      super(name, buildYear);
      this.numberOfTrees = numberOfTrees;
      this.parkArea = parkArea;    
    }

    calcTreeDensity () {
      return this.numberOfTrees / this.parkArea;    
    }

    calcParkAge () {
      return new Date().getFullYear() - this.buildYear;
    }
}

const parks = [
  new Park('City Park', 1912, 1001, 44),
  new Park('Edora Park', 1971, 130, 65),
  new Park('Rolland Moore Park', 1974, 102, 68),
];

const streets = [
  new Street('Laurel', 1922, 5),
  new Street('College', 1915, 15, 'huge'),
  new Street('Shields', 1945, 20, 'big'),
  new Street('East Swallow', 1976, 10, 'small'),
];

const fortCollins = new Town(parks, streets);
console.log('----------Parks Report-----------------');
fortCollins.getParksReport().forEach((value, key) => console.log(value));
console.log('----------Streets Report-----------------');
fortCollins.getStreetsReport().forEach((value, key) => console.log(value));

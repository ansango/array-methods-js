const { animals } = require("./data");
const data = require("./data");

function entryCalculator(entrants) {
  if (typeof entrants === "undefined" || Object.keys(entrants).length === 0) {
    return 0;
  } else {
    const prices = data.prices;
    const totalPriceAdult = prices.Adult * entrants.Adult;
    const totalPriceChild = prices.Child * entrants.Child;
    const totalPriceSenior = prices.Senior * entrants.Senior;
    return totalPriceAdult + totalPriceChild + totalPriceSenior;
  }
}
function schedule(dayName) {
  const toHumanReadable = (open, close) => {
    if (open === 0 && close === 0) {
      return `CLOSED`;
    }
    return `Open from ${open}am until ${close % 12}pm`;
  };

  if (typeof dayName === "undefined") {
    const schedule = JSON.parse(JSON.stringify(data.hours));
    const days = Object.keys(schedule);
    days.map((x) => {
      schedule[x] = toHumanReadable(schedule[x].open, schedule[x].close);
    });

    return schedule;
  } else {
    const schedule = JSON.parse(JSON.stringify(data.hours));
    const days = Object.keys(schedule);

    days.map((x) => {
      schedule[x] = toHumanReadable(schedule[x].open, schedule[x].close);
    });

    const filter = [dayName];
    const filtered = Object.keys(schedule)
      .filter((x) => filter.includes(x))
      .reduce((obj, key) => {
        obj[key] = schedule[key];
        return obj;
      }, {});

    return filtered;
  }
}

schedule("Monday");

function animalCount(species) {
  const allAnimals = data.animals.reduce((acc, el) => {
    acc[el.name] = el.residents.length;
    return acc;
  }, {});

  if (typeof species === "undefined") {
    return allAnimals;
  } else {
    const countAnimal = data.animals.filter(
      (animal) => animal.name === species
    )[0].residents.length;
    return countAnimal;
  }
}

function animalMap(options) {
  const animals = JSON.parse(JSON.stringify(data.animals));
  if (typeof options === "undefined") {    
    return animals.map((e) => {
      return {
        name: e.name,
        location: e.location
      }
    }).reduce((a, e) => {
      if(Array.isArray(a[e.location])) {
        a[e.location].push(e.name);
      } else {
        a[e.location] = [e.name];
      }
      return a;
    }, {});
  } else {
    return animals.map((e) => {
      return {
        name: e.name,
        location: e.location,
        residents: e.residents.map(e => e.name)
      }
    }).reduce((a, e) => {
      let obj = {};
      if(!Array.isArray(a[e.location])) a[e.location] = [];
      obj[e.name] = e.residents;
      a[e.location].push(obj);
      return a;
    }, {});
  }
}

function animalPopularity(rating) {
  const animals = JSON.parse(JSON.stringify(data.animals));
  if (typeof rating === "undefined") { 
    return animals.map((e) => {
      return {
        name: e.name,
        popularity: e.popularity
      }
    }).reduce((a, e) => {
      if(!Array.isArray(a[e.popularity])) a[e.popularity] = [];
      a[e.popularity].push(e.name);
      return a;
    }, {});
  } else {
    return animals.filter(e => e.popularity === rating).map(e => e.name);
  }
}

function animalsByIds(ids) {
  if (typeof ids === "undefined") {
    return [];
  } else if (typeof ids === "string") {
    return data.animals.filter((x) => x.id === ids);
  } else{

    return animals.filter(e => ids.includes(e.id))
                  .map((e) => {
                    return e;
                  });
    /*
    {
          id: '0938aa23-f153-4937-9f88-4858b24d6bce',
          name: 'lions',
          popularity: 4,
          location: 'NE',
          residents: [
            { name: 'Zena', sex: 'female', age: 12 },
            { name: 'Maxwell', sex: 'male', age: 15 },
            { name: 'Faustino', sex: 'male', age: 7 },
            { name: 'Dee', sex: 'female', age: 14 }
          ]
        },
        {
          id: 'e8481c1d-42ea-4610-8e11-1752cfc05a46',
          name: 'tigers',
          popularity: 5,
          location: 'NW',
          residents: [
            { name: 'Shu', sex: 'female', age: 19 },
            { name: 'Esther', sex: 'female', age: 17 }
          ]
        }
      ]
    */
  }
}

function animalByName(animalName) {
  if (typeof animalName === "undefined") {
    return {};
  }
}

function employeesByIds(ids) {
  // your code here
}

function employeeByName(employeeName) {
  // your code here
}

function managersForEmployee(idOrName) {
  // your code here
}

function employeeCoverage(idOrName) {
  // your code here
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage,
};

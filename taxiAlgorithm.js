const taxiky = [
    { id: 1, x: 0, y: 0, dostupnostOd: 8.0, dostupnostDo: 12.0 },
    { id: 2, x: 15, y: 20, dostupnostOd: 7.5, dostupnostDo: 11.0 },
    { id: 3, x: 30, y: 5, dostupnostOd: 9.0, dostupnostDo: 14.0 },
    { id: 4, x: 50, y: 50, dostupnostOd: 8.0, dostupnostDo: 13.0 }
  ];
  let pasazieri = [
    { id: 'A', x: 2, y: 2, cielX: 6, cielY: 6, casVyzdvihnutia: 9.0, dostupneTaxiky:[], vyslednyTaxik : ""},
    { id: 'B', x: 10, y: 25, cielX: 20, cielY: 30, casVyzdvihnutia: 9.5, dostupneTaxiky:[], vyslednyTaxik : ""},
    { id: 'C', x: 35, y: 5, cielX: 40, cielY: 10, casVyzdvihnutia: 10.0, dostupneTaxiky:[], vyslednyTaxik : ""},
    { id: 'D', x: 48, y: 52, cielX: 60, cielY: 60, casVyzdvihnutia: 10.5, dostupneTaxiky:[], vyslednyTaxik : ""},
    { id: 'E', x: 5, y: 5, cielX: 12, cielY: 8, casVyzdvihnutia: 8.5, dostupneTaxiky:[], vyslednyTaxik : ""}
  ];
const getFreeTaxis = (someTaxis , somePassengers) => {
  somePassengers.map(pasazier => {
        for(let i = 0; i < someTaxis.length; i++){
            const vzdialenostPrijazdu = Math.abs(pasazier.x - someTaxis[i].x) + Math.abs(pasazier.y - someTaxis[i].y)
            const vzdialenostDoCiela = Math.abs(pasazier.cielX - pasazier.x) + Math.abs(pasazier.cielY - pasazier.y);
            const casNaPrijazd = vzdialenostPrijazdu * 1 / 50;
            const casNaDojazd = vzdialenostDoCiela * 1 / 50;
            const celkovyCas = casNaDojazd  + casNaPrijazd;
            if(someTaxis[i].dostupnostOd + celkovyCas <= someTaxis[i].dostupnostDo - 10 / 60){
                pasazier.dostupneTaxiky.push(someTaxis[i])
            }
        }
  })
}
const getTaxis = (somePassengers) => {
  
 somePassengers = sortPassengersByNumberOfFreeTaxis(somePassengers)
 sortTaxisByDistanceForEachPassenger(somePassengers)
 for (let i = 0; i < somePassengers.length; i++) {
  if (somePassengers[i].dostupneTaxiky.length > 0) {
    somePassengers[i].vyslednyTaxik = somePassengers[i].dostupneTaxiky[0];
    const idPriradenehoTaxika = somePassengers[i].dostupneTaxiky[0].id;
    somePassengers.forEach(pasazier => {
      pasazier.dostupneTaxiky = pasazier.dostupneTaxiky.filter((taxi) => taxi.id !== idPriradenehoTaxika);
    });
  } else {
    somePassengers[i].vyslednyTaxik = null;
  }
}
  console.log(somePassengers)
} 
const sortPassengersByNumberOfFreeTaxis = (somePassengers) => {
  return somePassengers.sort((a , b) =>  a.dostupneTaxiky.length - b.dostupneTaxiky.length)
}
const sortTaxisByDistanceForEachPassenger = (somePassengers) => {
  somePassengers.forEach(pasazier => {
    pasazier.dostupneTaxiky.sort((a, b) => {
      const vzdialenostA = Math.abs(pasazier.x - a.x) + Math.abs(pasazier.y - a.y);
      const vzdialenostB = Math.abs(pasazier.x - b.x) + Math.abs(pasazier.y - b.y);
      return vzdialenostA - vzdialenostB;
    });
  });
};

  
  const taxiAlgorithm = () => {
    getFreeTaxis(taxiky , pasazieri) 
    getTaxis(pasazieri)}

  export default taxiAlgorithm;
  
  
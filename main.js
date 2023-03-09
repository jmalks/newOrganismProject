// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (_specimenNum, _dna) => { 
  return {
  _specimenNum,
  _dna,
  mutate() {
    const selector = Math.floor(Math.random() * this._dna.length);
    let randBase = returnRandBase(); 
    while (randBase === this._dna[selector]) {
      randBase = returnRandBase();
    };
    this._dna[selector] = randBase;
    return this._dna; 
  },
  compareDNA(otherAequor) {
    let numSame = 0;
    this._dna.forEach((elementChecker, i) => {
      if (elementChecker === otherAequor._dna[i]) {
        numSame += 1;
      }
    })
    const percentCommonDNA = ((numSame/15) * 100); 
    console.log(`Specimen #${this._specimenNum} and specimen #${otherAequor._specimenNum} have ${percentCommonDNA}% DNA in common.`)
  },
  willLikelySurvive() {
    let numCAndG = 0;
    this._dna.forEach((dnaChecker, i) => {
      if ((dnaChecker[i] === 'C') || (dnaChecker[i] === 'G')) {
        ++numCAndG;
      }
    })
    const percentCAndG = numCAndG/15;
    if (percentCAndG >= 0.6) {
      return true;
    } else {
      return false; 
    }
  }
  }
};

const pAequorSpecimens = [];
for (let i = 1; i < 31; i++) {
  pAequorSpecimens.push(pAequorFactory(i, mockUpStrand()));
}
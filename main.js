const fs = require('fs');
const path = require('path');
const conv = require('./data/convertion');

const filePath = path.join(__dirname, 'data', 'adn');
let dataCodons = [];



function cutDataStrToList(datastr, len)
{
    let dataTemp = [];
    let temp = '';

    for (let i = 0; i < datastr.length; i++) {
        temp += datastr[i];
        if ((i + 1) % len === 0) {
            dataTemp.push(temp);
            temp = '';
        }
    }
    if (temp.length > 0) {
        dataTemp.push(temp);
    }
    return dataTemp;
}


function getDataCodons() {
    let dataTemp = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        dataTemp = cutDataStrToList(data, 3)
    } catch (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
    }
    return dataTemp;
}

dataCodons = getDataCodons();
console.log('dataCodons', dataCodons);

function getConvCodons(dataC)
{
    let tempConvCodons = '';
    try {
        dataC.forEach(element => {
        
            tempConvCodons += conv[element];
        
        });
    } catch (error) {
        console.error('Erreur lors de la conversion des codons :', error);
        return "";
    }
    return tempConvCodons;
}
const ConvCodons = getConvCodons(dataCodons)
console.log('ConvCodons', ConvCodons);

function getSequencesCodon(dataConvCodons)
{
    let dataTemp = [];
    try {
        dataTemp = cutDataStrToList(dataConvCodons, 25)
    } catch (err) {
        console.error('Erreur cut dataConvCodons:', err);
    }
    return dataTemp;
}

const sequencesCodon = getSequencesCodon(ConvCodons);
console.log('sequencesCodon', sequencesCodon);


function getSubSequencesCodon(dataSequencesCodon)
{
    let dataTemp = [];
    try {
        dataSequencesCodon.forEach(element => {
            dataTemp.push(cutDataStrToList(element, 5))
        });
        
    } catch (err) {
        console.error('Erreur cut SubSequencesCodon:', err);
    }
    return dataTemp;
}

const SubSequencesCodon = getSubSequencesCodon(sequencesCodon);
console.log('SubSequencesCodon', SubSequencesCodon);
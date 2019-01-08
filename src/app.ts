const fs = require('fs');
import * as CSV from './CSV_ops'
const csv = CSV.loader(process.argv[2])
csv.shift()

export const writeCSV = async (args: any) => {
    fs.writeFile(args.filename, args.file, function(err) {
        if(err) {
           console.log(err)
        }
        console.log(`Finished converting ${process.argv[2]} to ${process.argv[3]}`)
    }); 
}

const makeColumns = (csv) => {
    const verbs = csv.reduce((hist,current) => {
        if (!hist.includes(current[2])) {
            return [...hist, current[2]]
        } else {
            return hist
        }
    },[] )

    const columns = ['name', ...verbs]
    return columns
}

const makeNames = (csv) => {
    const names = csv.reduce((hist,current) => {
        if (!hist.includes(current[1])) {
            return [...hist, current[1]]
        } else {
            return hist
        }
    },[] )
    return names
}


const addValuesToColumns = (csv, columns, names) => {
    const results = names.map( name => {
        const CSVrow = Array(col.length).fill(0)
        csv.forEach((row,i) => {
            if (row[1] === name){
                const e=  col.findIndex((val) => val === row[2]) 
                CSVrow[e] = CSVrow[e] + 1
            }
        })
        CSVrow[0]=name
        return CSVrow
    })
    results.unshift(columns)
  return results
}

const col = makeColumns(csv)
const names = makeNames(csv)
const contents = addValuesToColumns(csv,col,names)
CSV.convertToCSV(contents)
    .then(file => writeCSV({ 
        filename: process.argv[3], 
        file: file
    }))


console.log(process.argv[2], process.argv[3])

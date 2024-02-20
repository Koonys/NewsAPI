let names = [
    "Steven Paul Jobs",
    "Bill Gates",
    "Mark Elliot Zuckerberg",
    "Elon Musk",
    "Jeff Bezos",
    "Warren Edward Buffett",
    "Larry Page",
    "Larry Ellison",
    "Tim Cook",
    "Lloyd Blankfein",
  ];

let someName = names.some(name => {
    let spName = name.split(" ");
    spName.pop();
    return spName.some(item=>item.toLowerCase().includes("p"));
})

console.log(someName);

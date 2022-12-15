export const hasDuplicateInArray = arr => {
  return new Set(arr).size !== arr.length
}

export const hasDuplicates = list => {
  const nameList = list.map(person => person.name)
  const emailList = list.map(person => person.email)
  return hasDuplicates(nameList) || hasDuplicates(emailList)
}

export const matchPeople = people => {
  // Return an array of randomly matched up people.
  // The array should have objects with the following structure:
  // { giver: {name: 'NAME_HERE, email: 'EMAIL_HERE'}, receiver: {name: 'NAME_HERE, email: 'EMAIL_HERE'}}

  // Rules:
  // 1. For every person there has to be a giver
  // 2. A person cannot be their own giver

  const giverList = [...people]
  const receiverList = [...people]

  let secretSantaList =  giverList.reduce((pV, cV) => {
    const giver = { name: cV.name, email: cV.email }
    let receiverIndex = Math.floor(Math.random() * receiverList.length)
    while(receiverList[receiverIndex].email === giver.email && receiverList.length !== 1) {
      receiverIndex = Math.floor(Math.random() * receiverList.length)
    }
    const receiver = { name: receiverList[receiverIndex].name, email: receiverList[receiverIndex].email }
    receiverList.splice(receiverIndex, 1)
    return [...pV, { giver, receiver }]
  }, [])

  const hasDuplicate = () => {
    return secretSantaList.filter(pair => pair.giver.email === pair.receiver.email).length > 0
  }

  if (hasDuplicate()) {
    return [
      ...secretSantaList.splice(0, secretSantaList.length - 2),
      { 
        giver: secretSantaList[secretSantaList.length - 2].giver,
        receiver: secretSantaList[secretSantaList.length - 1].receiver
      },
      { 
        giver: secretSantaList[secretSantaList.length - 1].giver,
        receiver: secretSantaList[secretSantaList.length - 2].receiver
      }
    ]
  }
  return secretSantaList
}

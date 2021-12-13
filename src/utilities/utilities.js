export const sortEvents = (first, second) => {
  if(Number(first.schedule.slice(0, 2)) > Number(second.schedule.slice(0, 2))) {
    return 1 //first
  } else if (Number(first.schedule.slice(0, 2)) < Number(second.schedule.slice(0, 2))) {
    return -1 //second
  } else {
    if (Number(first.schedule.slice(3,5)) > Number(second.schedule.slice(3,5))) {
      return 1 //second
    } else {
      return -1 //first
    }
  }
}

export const modul = number => Math.sign(number) === -1 ? number * -1 : number
function getGreetings() {
  const curHr = new Date().getHours();

  if (curHr < 12) {
    return 'Good morning';
  } else if (curHr < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

export default getGreetings;

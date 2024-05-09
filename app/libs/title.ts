const title = (title: string) => {
  if (title.length <= 34) {
    return title;
  }
  return title.slice(0, 34) + "...";
};

export default title;

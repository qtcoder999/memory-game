export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const duplicateElements = arr => {
  return arr.reduce(function(res, current, index, array) {
    return res.concat([current, current]);
  }, []);
};

export const findIndexInArrayOfObjects = (arr, property, value) => {
  const foundObject = arr.find(o => o[property] === value);

  const foundIndex = arr.indexOf(foundObject);

  return foundIndex;
};

export const isEmptyObject = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

const printAlphabet = () => {
  let result = [];
  for (var i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
    result.push(String.fromCharCode(i));
  }

  return result;
};

export default printAlphabet;

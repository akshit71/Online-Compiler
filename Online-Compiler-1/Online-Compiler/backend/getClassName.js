const getClassName = (javaCode) => {
    // \s+ - Matches one or more whitespace characters (spaces, tabs, line breaks) that may appear between the "class" keyword and the class name.
// (\w+) - Capturing group that matches one or more word characters (letters, digits, or underscores). This captures the class name.
    const classNameRegex = /class\s+(\w+)/;
    const matches = javaCode.match(classNameRegex);
    if (matches && matches.length >= 2) {
      return matches[1];
    }
    return null;
  };
  
  
  

  module.exports={
    getClassName
  }
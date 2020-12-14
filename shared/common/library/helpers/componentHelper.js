const componentHelper = {
  getFieldNames: (fieldNames, defaultFieldNames) => {
    defaultFieldNames = defaultFieldNames ? defaultFieldNames : {};
    let _values = {};
    const fieldnameMap = { ...defaultFieldNames, ...fieldNames };
    for (const key in fieldnameMap) {
      if (typeof fieldnameMap[key] === 'string') {
        _values[key] = fieldnameMap[key];
      } else if (typeof fieldnameMap[key] === 'object') {
        const field = fieldnameMap[key];
        if (field.hasOwnProperty('name')) {
          _values[key] = field.name;
        } else {
          _values[key] = key;
        }
      }
    }
    return _values;
  },
  getRules: (fieldName, fieldNames, defaultFieldNames) => {
    defaultFieldNames = defaultFieldNames ? defaultFieldNames : {};
    const fieldnameMap = { ...defaultFieldNames, ...fieldNames };
    if (typeof fieldnameMap[fieldName] === 'object') {
      const field = fieldnameMap[fieldName];
      if (field.hasOwnProperty('rules')) {
        return field.rules;
      }
    }
    return undefined;
  },
  convertFieldData: (data, removeName) => {
    let newData = {};
    const object = { ...data };
    for (const key in object) {
      if (data.hasOwnProperty(key)) {
        const element = object[key];
        const newField = key.replace(removeName, '');
        newData[newField] = element;
      }
    }
    return newData;
  },
};

export default componentHelper;

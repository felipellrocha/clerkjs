class Schema {
  constructor (key, id = 'id') {
    this.key = key;
    this.id = id;
    this.relations = {};
  }

  relation(key, schema) {
    this.relations[key] = schema;
  }
}

const clerkedArray = function (arr, schema, bag) {
  const length = arr.length

  return new Proxy(arr, {
    get: function(target, property) {
      const element = target[property];

      if (property === 'length') return length;
      if (property === 'object_type') return schema.key;
      if (property in target) return bag[schema.key][element.id];
      if (property in Array.prototype) return Array.prototype[property];
    },
    set: function(target, key, value) {
      target[key] = visit(value, schema, bag); // eslint-disable-line no-use-before-define

      return true;
    },
  })
};

const clerkedObject = function (obj, schema, bag) {
  return new Proxy(obj, {
    get: function(target, key) {
      const attr = target[key];

      return ((key in schema.relations) && (!Array.isArray(attr))) ?
        bag[attr.object][attr.id] :
        attr;
    },
    set: function(target, key, value) {
      if (key in schema.relations) {
        const relationSchema = schema.relations[key];
        target[key] = visit(value, relationSchema, bag); // eslint-disable-line no-use-before-define

        return true;
      }

      target[key] = value;
      return true;
    }
  })
};

const visitObject = function(data, schema, bag) {
  // move the object to the bag
  const dataId = data[schema.id];
  if (!bag[schema.key]) bag[schema.key] = {};
  bag[schema.key][dataId] = clerkedObject(data, schema, bag);
  // move the object to the bag

  for (const key in data) {

    if (key in schema.relations) {
      const relationSchema = schema.relations[key];

      data[key] = visit(data[key], relationSchema, bag) // eslint-disable-line no-use-before-define
    }
  }

  return {
    id: dataId,
    object: schema.key,
  };
}

const visit = function(data, schema, bag) {
  if (Array.isArray(data)) {
    const visitList = data.map((d) => visit(d, schema, bag));
    return clerkedArray(visitList, schema, bag);
  }
  else return visitObject(data, schema, bag);
}

const normalize = function(data, schema) {
  let bag = {};
  const result = visit(data, schema, bag);

  return {
    result,
    entities: bag,
  };
}

export { Schema, normalize };

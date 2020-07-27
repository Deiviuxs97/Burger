interface utility{}

export const updateObject = (oldObject: utility, updatedProperties: utility) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

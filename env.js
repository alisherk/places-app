const variables = {
  development: {
    googleApiKey: 'AIzaSyCmCrdhdacjVmsH3qtpM-zbe4cgX68Nhkc'
  },
  production: {
    googleApiKey: 'AIzaSyCmCrdhdacjVmsH3qtpM-zbe4cgX68Nhkc'
  }
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function

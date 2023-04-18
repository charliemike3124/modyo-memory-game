declare function require(name: string): any;

function requireImage(imageName: string) {
  return require(`@/assets/${imageName}}`);
}

export { requireImage };

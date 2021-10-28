function Matrix(height, width) {
  this.matrix = Array(height)
    .fill(0)
    .map(() => Array(width).fill(0));
  this.console = () => {
    console.log(this.matrix.map((el) => JSON.stringify(el)).join('\n'));
  };
  this.fillRect = (x, y, h, w) => {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        this.matrix[y + j][x + i] = 1;
      }
    }
  };
  this.getXY = () => {
    const position = { x: 0, y: 0 };
    const max = { x: this.matrix[0].length - 1, y: this.matrix.length - 1 };
    let find = false;
    for (let y = 0; y <= max.y; y++) {
      const line = this.matrix[y];
      for (let x = 0; x <= max.x; x++) {
        const val = line[x];
        if (val === 1) {
          find = false;
        } else {
          position.x = x;
          position.y = y;
          find = true;
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              if (position.x + i > max.x || position.y + j > max.y) {
                find = false;
                break;
              } else {
                if (this.matrix[position.y + j][position.x + i] === 1) {
                  find = false;
                  break;
                }
              }
            }
            if (!find) {
              break;
            }
          }
          if (find) {
            return position;
          }
        }
      }
    }
  };
}

const calculateHeight = (appConfig) => {
  let maxHeight = 0;
  if (appConfig.length > 0) {
    appConfig.forEach((el) => {
      maxHeight = Math.max(maxHeight, el.h + el.y);
    });
  }
  return maxHeight;
};

const fillMatrix = (matrix, appConfig) => {
  if (appConfig.length > 0) {
    appConfig.forEach((el) => {
      matrix.fillRect(el.x, el.y, el.h, el.w);
    });
  }
  return matrix;
};

const getFilledMatrix = (appConfig) => {
  const matrix = new Matrix(calculateHeight(appConfig) + 4, 12);
  fillMatrix(matrix, appConfig);
  return matrix;
};

export const getXY = (appConfig) => {
  const matrix = getFilledMatrix(appConfig);
  return matrix.getXY();
};
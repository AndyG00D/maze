/* eslint-disable max-len */


const fieldClick = function () {
};


export default class CanvasMaze {
  constructor(mazeWidth = 10, mazeHeight = 10, width = 600, height = 600, elem = 'maze-block', event = fieldClick) {
    this.tileWidth = width / mazeWidth;
    this.tileHeight = height / mazeHeight;
    this.canvas = document.getElementById(elem);
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.addEventListener('click', event, false);
    if (!this.canvas) alert('Canvas ERROR!');
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) alert('Canvas ERROR!');
  }

  drawMaze(maze) {
    console.log(`maze: ${maze}`);
    for (let x in maze[0]) {
      for (let y in maze) {
        if (!maze[x][y]) {
          // empty field
          this.ctx.fillStyle = '#ffffff';
          this.ctx.fillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
          this.ctx.strokeStyle = '#000000';
          this.ctx.strokeRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
        } else {
          // wall
          this.ctx.fillStyle = '#000000';
          this.ctx.fillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
        }
      }
    }
  }

  // draw the path
  drawPath(currentPath) {
    // console.log(`Current path length: ${currentPath.length}`);
    // console.log(`Current path: ${currentPath}`);
    for (const x in currentPath) {
      switch (x) {
        case 0:
          // start
          this.ctx.fillStyle = '#00ff6e';
          break;
        case currentPath.length - 1:
          // end
          this.ctx.fillStyle = '#d72f2c';
          break;
        default:
          // path node
          this.ctx.fillStyle = '#fff026';
          break;
      }
      this.ctx.fillRect(currentPath[x][0] * this.tileWidth, currentPath[x][1] * this.tileHeight, this.tileWidth, this.tileHeight);
      this.ctx.strokeStyle = '#000000';
      this.ctx.strokeRect(currentPath[x][0] * this.tileWidth, currentPath[x][1] * this.tileHeight, this.tileWidth, this.tileHeight);
    }
  }

  redraw(maze, path) {
    console.log('redrawing...');

    // clear the screen
    this.ctx.strokeStyle = '#000000';
    this.ctx.strokeRect(0, 0, this.width, this.height);

    this.drawMaze(maze);
    this.drawPath(path);
  }

  getPointerPosition(e) {
    let x;
    let y;

    if (e.pageX !== undefined && e.pageY !== undefined) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;


    const cell =
            [
              Math.floor(x / this.tileWidth),
              Math.floor(y / this.tileHeight),
            ];

    console.log(`we clicked tile ${cell[0]},${cell[1]}`);

    return cell;
  }
}

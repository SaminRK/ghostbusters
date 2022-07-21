import React from "react";
import "./Game.css";

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rows: 10,
			columns: 10,
			grid: this.getInitialGameGrid(10, 10),
			move: [
				[1, 30, 1],
				[30, 1, 30],
				[1, 30, 1],
			],
			pos: this.getInitialPosition(10, 10),
			colorGrid: this.getInitialColorGrid(10, 10),
			bustMode: false,
			hitGrid: this.getInitialHitGrid(10, 10),
			busted: false,
			bustsLeft: 3,
		};

		this.advanceTime = this.advanceTime.bind(this);
		this.toggleBustMode = this.toggleBustMode.bind(this);
	}

	getInitialHitGrid(rows, columns) {
		var grid = new Array(rows);
		for (var i = 0; i < rows; ++i) {
			grid[i] = [];
			for (var j = 0; j < columns; ++j) {
				grid[i][j] = -1;
			}
		}
		return grid;
	}

	getInitialGameGrid(rows, columns) {
		var grid = new Array(rows);
		for (var i = 0; i < rows; ++i) {
			grid[i] = [];
			for (var j = 0; j < columns; ++j) {
				grid[i][j] = 1.0 / (rows * columns);
			}
		}
		return grid;
	}

	getInitialPosition(rows, columns) {
		var row = Math.floor(Math.random() * rows);
		var col = Math.floor(Math.random() * columns);
		console.log({ row, col });
		return [row, col];
	}

	getColor(code) {
		if (code === "r") return "red";
		else if (code === "o") return "orange";
		else if (code === "y") return "yellow";
		else if (code === "g") return "green";

		return "black";
	}

	getInitialColorGrid(rows, columns) {
		var grid = new Array(rows);
		for (var i = 0; i < rows; ++i) {
			grid[i] = [];
			for (var j = 0; j < columns; ++j) {
				grid[i][j] = " ";
			}
		}
		return grid;
	}

	getBoxBgColor(value) {
		var red, green, blue;
		const n = this.state.rows;
		const m = this.state.columns;
		if (n * m * value <= 1) {
			blue = Math.max(
				150,
				Math.min(255, Math.floor(n * m * value * 256))
			);
		} else if (value < 0.5) {
			blue = Math.min(255, Math.floor((1 - value) * 256));
		} else {
			blue = 0;
		}
		red = Math.min(255, Math.floor(value * m * 256));
		if (red + blue > 255) {
			green = 0.3 * Math.min(blue, red);
			blue *= 0.85;
			red *= 0.6;
		} else green = Math.min(blue, red);

		return `rgb(${red}, ${green}, ${blue})`;
	}

	toggleBustMode() {
		if (this.state.bustsLeft === 0) return;
		var newBustMode = !this.state.bustMode;
		this.setState({ bustMode: newBustMode });
	}

	setGridAfterSensor(selRow, selCol) {
		const posRow = this.state.pos[0];
		const posCol = this.state.pos[1];
		const n = this.state.rows;
		const m = this.state.columns;

		const mann_dist = Math.abs(selCol - posCol) + Math.abs(selRow - posRow);
		var res = "g";
		if (mann_dist <= 1) res = "r";
		else if (mann_dist <= 2) res = "o";
		else if (mann_dist <= 4) res = "y";

		var newColorGrid = this.state.colorGrid;
		newColorGrid[selRow][selCol] = res;

		var newGrid = new Array(n);
		var E = new Array(n);

		var i, j;
		for (i = 0; i < n; ++i) {
			newGrid[i] = [];
			E[i] = [];
			for (j = 0; j < m; ++j) {
				newGrid[i][j] = 0.0;
				E[i][j] = 0;
			}
		}
		for (i = 0; i < n; ++i) {
			for (j = 0; j < m; ++j) {
				const d = Math.abs(selRow - i) + Math.abs(selCol - j);
				if (d <= 1) {
					if (res === "r") E[i][j] = 1;
				} else if (d <= 2) {
					if (res === "o") E[i][j] = 1;
				} else if (d <= 4) {
					if (res === "y") E[i][j] = 1;
				} else {
					if (res === "g") E[i][j] = 1;
				}
			}
		}

		var fact = 0.0;
		for (i = 0; i < n; ++i) {
			for (j = 0; j < n; ++j) {
				newGrid[i][j] = E[i][j] * this.state.grid[i][j];
				fact += newGrid[i][j];
			}
		}
		if (fact < 1e-18) return;
		for (i = 0; i < n; ++i) {
			for (j = 0; j < n; ++j) {
				newGrid[i][j] /= fact;
			}
		}
		this.setState({ grid: newGrid, colorGrid: newColorGrid });
	}

	bust(selRow, selCol) {
		var newHitGrid = this.state.hitGrid;
		const n = this.state.rows;
		const m = this.state.columns;
		var i, j;
		var newGrid = this.state.grid;
		if (selRow === this.state.pos[0] && selCol === this.state.pos[1]) {
			// TODO: for 1 ghost we are making every other boxes probability 0
			// For multiple ghosts this might not be the case
			for (i = 0; i < n; ++i) {
				for (j = 0; j < m; ++j) {
					newGrid[i][j] = 0;
				}
			}

			this.state.hitGrid[selRow][selCol] = 1;
			newGrid[selRow][selCol] = 1;

		} else {
			this.state.hitGrid[selRow][selCol] = 0;
			newGrid[selRow][selCol] = 0;
		}

		var fact = 0;
		for (i = 0; i < n; ++i) {
			for (j = 0; j < m; ++j) {
				fact += newGrid[i][j];
			}
		}
		if (fact > 1e-18) {
			for (i = 0; i < n; ++i) {
				for (j = 0; j < m; ++j) {
					newGrid[i][j] /= fact;
				}
			}
		}

		this.state.busted = true;
		var newBustsLeft = this.state.bustsLeft - 1;
		this.setState({
			hitGrid: newHitGrid,
			bustMode: false,
			bustsLeft: newBustsLeft,
			grid: newGrid,
		});
	}

	handleClick(selRow, selCol) {
		// console.log({ selectedRow: selRow, selectedCol: selCol });
		if (this.state.bustMode) {
			this.bust(selRow, selCol);
		} else {
			this.setGridAfterSensor(selRow, selCol);
		}
	}

	advanceTime() {
		const n = this.state.rows;
		const m = this.state.columns;
		const move = this.state.move;

		// assign new position to ghost
		var posRow = this.state.pos[0],
			posCol = this.state.pos[1];
		var i, j, ii, jj;
		var sum = 0;

		for (ii = posRow - 1; ii <= posRow + 1; ++ii) {
			for (jj = posCol - 1; jj <= posCol + 1; ++jj) {
				if (ii >= 0 && ii < n && jj >= 0 && jj < m) {
					sum += move[ii - posRow + 1][jj - posCol + 1];
				}
			}
		}
		var r = Math.floor(Math.random() * sum);
		var csum = 0;
		var newRow = n - 1,
			newCol = m - 1;

		for (ii = posRow - 1; ii <= posRow + 1; ++ii) {
			for (jj = posCol - 1; jj <= posCol + 1; ++jj) {
				if (ii >= 0 && ii < n && jj >= 0 && jj < m) {
					csum += move[ii - posRow + 1][jj - posCol + 1];
					if (csum > r) {
						newRow = ii;
						newCol = jj;
						ii = posRow + 100;
						break;
					}
				}
			}
		}

		var newGrid = new Array(n);
		for (i = 0; i < n; ++i) {
			newGrid[i] = [];
			for (j = 0; j < m; ++j) {
				newGrid[i][j] = 0.0;
			}
		}

		for (i = 0; i < n; ++i) {
			for (j = 0; j < m; ++j) {
				sum = 0;
				for (ii = i - 1; ii <= i + 1; ++ii) {
					for (jj = j - 1; jj <= j + 1; ++jj) {
						if (ii >= 0 && ii < n && jj >= 0 && jj < m) {
							sum += move[ii - i + 1][jj - j + 1];
						}
					}
				}
				for (ii = i - 1; ii <= i + 1; ++ii) {
					for (jj = j - 1; jj <= j + 1; ++jj) {
						if (ii >= 0 && ii < n && jj >= 0 && jj < m) {
							newGrid[ii][jj] +=
								(this.state.grid[i][j] *
									move[ii - i + 1][jj - j + 1]) /
								sum;
						}
					}
				}
			}
		}

		var newColorGrid = this.getInitialColorGrid(n, m);
		if (this.state.busted) {
			this.state.busted = false;
			this.setState({
				grid: newGrid,
				colorGrid: newColorGrid,
				pos: [newRow, newCol],
				bustMode: false,
				hitGrid: this.getInitialHitGrid(n, m),
			});
		} else {
			this.setState({
				grid: newGrid,
				colorGrid: newColorGrid,
				pos: [newRow, newCol],
				bustMode: false,
			});
		}
	}

	render() {
		var rowStyle = {
			width: `${75 * this.state.columns}px`,
			margin: "auto",
		};
		return (
			<div>
				<div className="gameGrid">
					{this.state.grid.map((rows, row) => {
						return (
							<div key={row} style={rowStyle}>
								{rows.map((value, column) => {
									var buttonText = value.toFixed(3);
									var buttonStyle = {
										background: this.getBoxBgColor(
											this.state.grid[row][column]
										),
									};
									if (
										this.state.colorGrid[row][column] !==
										" "
									) {
										buttonStyle.border = `4px solid ${this.getColor(
											this.state.colorGrid[row][column]
										)}`;
									}
									if (this.state.hitGrid[row][column] === 0) {
										buttonStyle.background = "green";
										buttonText = "MISS";
									} else if (
										this.state.hitGrid[row][column] >= 1
									) {
										buttonStyle.background = "red";
										buttonText = "HIT";
										if (
											this.state.hitGrid[row][column] > 1
										) {
											buttonText += `${this.state.hitGrid[row][column]}`;
										}
									}
									// console.log(buttonStyle);
									return (
										<button
											key={
												row * this.state.columns +
												column
											}
											className="boxes"
											onClick={this.handleClick.bind(
												this,
												row,
												column
											)} // need to bind this, otherwise button event triggered on page load.. need to learn why
											style={buttonStyle}
										>
											{buttonText}
										</button>
									);
								})}
							</div>
						);
					})}
				</div>

				<div>
					<div className="centraliser">
						<button
							className="control-buttons"
							onClick={this.advanceTime}
						>
							TIME+1
						</button>
						<button
							className={
								"control-buttons bustButton" +
								(this.state.bustMode ? "Red" : "")
							}
							onClick={this.toggleBustMode}
						>
							BUST
						</button>
					</div>

					<div className="centraliser">{`POSITION: (${this.state.pos[0]}, ${this.state.pos[1]})`}</div>
					<div className="centraliser">{`BUSTS LEFT X ${this.state.bustsLeft}`}</div>
					<div className="centraliser credit">
						This game is a web-version of the ghostbusters game from the course CS188:Intro to AI at UC Berkeley&nbsp;
						<a href="https://inst.eecs.berkeley.edu/~cs188/">
						visit to know more
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Game;

mod mino;
mod utils;

use mino::{Mino, I_MINO, J_MINO, L_MINO, MINO_CELL_SIZE, O_MINO, S_MINO, T_MINO, Z_MINO};
use wasm_bindgen::prelude::*;

use crate::mino::EMPTY_MINO;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Empty,
    Wall,
    I,
    J,
    L,
    O,
    S,
    T,
    Z,
}

impl From<TetriminoKind> for Cell {
    fn from(value: TetriminoKind) -> Self {
        match value {
            TetriminoKind::I => Cell::I,
            TetriminoKind::J => Cell::J,
            TetriminoKind::L => Cell::L,
            TetriminoKind::O => Cell::O,
            TetriminoKind::S => Cell::S,
            TetriminoKind::T => Cell::T,
            TetriminoKind::Z => Cell::Z,
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum TetriminoKind {
    I,
    J,
    L,
    O,
    S,
    T,
    Z,
    // Water,
    // Yellow,
    // Green,
    // Red,
    // Orange,
    // Purple
}

impl From<u32> for TetriminoKind {
    fn from(value: u32) -> Self {
        match value {
            0 => TetriminoKind::I,
            1 => TetriminoKind::J,
            2 => TetriminoKind::L,
            3 => TetriminoKind::O,
            4 => TetriminoKind::S,
            5 => TetriminoKind::T,
            _ => TetriminoKind::Z,
        }
    }
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum TetriminoState {
    Prepare,
    Falling,
    Stopped,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Point {
    x: u32,
    y: u32,
}

impl Point {
    pub fn new(x: u32, y: u32) -> Self {
        Self { x, y }
    }
}

impl std::ops::Add for Point {
    type Output = Self;

    fn add(self, rhs: Self) -> Self::Output {
        Self::Output {
            x: self.x + rhs.x,
            y: self.y + rhs.y,
        }
    }
}

impl Point {
    pub fn x(&self) -> u32 {
        self.x
    }

    pub fn y(&self) -> u32 {
        self.y
    }

    pub fn dropdown(&mut self, line: u32) {
        self.y += line;
        console_log!("dropdown: {:?}", self.y);
    }
}

#[wasm_bindgen]
/// https://en.wikipedia.org/wiki/Tetrimino
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Tetrimino {
    kind: TetriminoKind,
    position: Point,
    blocks: mino::Mino,
}

impl Default for Tetrimino {
    fn default() -> Self {
        let kind = Self::rand();

        Self {
            kind,
            position: Point::new(4, 0),
            blocks: match kind {
                TetriminoKind::I => I_MINO,
                TetriminoKind::J => J_MINO,
                TetriminoKind::L => L_MINO,
                TetriminoKind::O => O_MINO,
                TetriminoKind::S => S_MINO,
                TetriminoKind::T => T_MINO,
                TetriminoKind::Z => Z_MINO,
            },
        }
    }
}

impl Tetrimino {
    fn rand() -> TetriminoKind {
        use rand::Rng;
        // let kind = rand::thread_rng().gen_range(0..6) as u32; // rand v0.8
        let kind = rand::thread_rng().gen_range(0, 6) as u32;

        TetriminoKind::from(kind)
    }
}

impl Tetrimino {
    pub fn kind(&self) -> &TetriminoKind {
        &self.kind
    }

    pub fn position(&self) -> &Point {
        &self.position
    }

    pub fn blocks(&self) -> &mino::Mino {
        &self.blocks
    }

    pub fn rotate_left(&mut self) {
        let mut new_blocks = EMPTY_MINO;
        for (y, rows) in self.blocks.iter().enumerate() {
            for (x, _) in rows.iter().enumerate() {
                new_blocks[self.blocks.len() - 1 - x][y] = self.blocks[y][x]
            }
        }

        self.blocks = new_blocks;
    }

    pub fn rotate_right(&mut self) {
        let mut new_blocks = EMPTY_MINO;
        for (y, rows) in self.blocks.iter().enumerate() {
            for (x, _) in rows.iter().enumerate() {
                new_blocks[x][self.blocks.len() - 1 - y] = self.blocks[y][x]
            }
        }

        self.blocks = new_blocks;
    }
}

struct Playfield {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
    cells2: Vec<Vec<Cell>>,
    current: Tetrimino,
    next: Tetrimino,
}

impl Playfield {
    fn init(width: u32, height: u32) -> Vec<Cell> {
        let mut playfield: Vec<Cell> = vec![];

        let max_column = width;
        let top_row = 0;
        let bottom_row = height;
        for n in 0..max_column * bottom_row {
            let row = n / max_column;
            let column = n % max_column;

            if (top_row..=top_row + 1).contains(&row) {
                if (3..=8).contains(&column) {
                    playfield.push(Cell::Empty);
                } else {
                    playfield.push(Cell::Wall);
                }
            } else if row == bottom_row - 1 {
                playfield.push(Cell::Wall);
            } else if (1..=max_column - 2).contains(&column) {
                playfield.push(Cell::Empty);
            } else {
                playfield.push(Cell::Wall);
            }
        }

        playfield
    }

    fn init2(width: u32, height: u32) -> Vec<Vec<Cell>> {
        let mut playfield: Vec<Vec<Cell>> = vec![];

        let max_column = width;
        let top_row = 0;
        let bottom_row = height;

        for row in 0..bottom_row {
            let mut line: Vec<Cell> = vec![];

            for column in 0..max_column {
                if (top_row..=top_row + 1).contains(&row) {
                    if (3..=8).contains(&column) {
                        line.push(Cell::Empty);
                    } else {
                        line.push(Cell::Wall);
                    }
                } else if row == bottom_row - 1 {
                    line.push(Cell::Wall);
                } else if (1..=max_column - 2).contains(&column) {
                    line.push(Cell::Empty);
                } else {
                    line.push(Cell::Wall);
                }
            }

            playfield.push(line);
        }

        playfield
    }

    pub fn new() -> Self {
        let width = 12;
        let height = 20;

        Self {
            width,
            height,
            cells: Playfield::init(width, height),
            cells2: Playfield::init2(width, height),
            current: Tetrimino::default(),
            next: Tetrimino::default(),
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn cells2(&mut self) -> *const Cell {
        for y in 0..self.height - 1 {
            for x in 0..self.width - 1 {
                let i = (y * self.width + x) as usize;

                self.cells[i] = self.cells2[y as usize][x as usize];
            }
        }

        let position = self.current.position().clone();
        let blocks = self.current.blocks();
        let kind = self.current.kind().to_owned();

        for (y, rows) in blocks.iter().enumerate() {
            for (x, _) in rows.iter().enumerate() {
                let cell = blocks[y][x];
                if cell == Cell::Empty {
                    continue;
                }

                let point = Point::new(x as u32, y as u32) + position.clone();
                let i = point.y * (self.width) + point.x;

                self.cells[i as usize] = Cell::from(kind);
            }
        }

        console_log!("{:?}", self.cells);

        self.cells.as_ptr()
    }

    pub fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn fetch_arround(&self) -> Vec<Cell> {
        let current = self.current.position();
        let x = current.clone().x();
        let y = current.clone().y();

        let mut result: Vec<Cell> = vec![];
        for row in y..3 {
            for col in x..3 {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                result.push(cell);
            }
        }

        result
    }

    pub fn get_current(&self) -> Tetrimino {
        self.current.clone()
    }

    pub fn rotate_left(&mut self) {
        self.current.rotate_left()
    }

    pub fn rotate_right(&mut self) {
        self.current.rotate_right()
    }

    pub fn update(&mut self) {
        self.current.position.dropdown(1);
    }
}

#[wasm_bindgen]
struct GameIO {
    playfield: Playfield,
    count: usize,
}

#[wasm_bindgen]
impl GameIO {
    pub fn new() -> Self {
        use crate::utils::set_panic_hook;
        set_panic_hook();
        Self {
            playfield: Playfield::new(),
            count: usize::MIN,
        }
    }

    pub fn width(&self) -> u32 {
        self.playfield.width()
    }

    pub fn height(&self) -> u32 {
        self.playfield.height()
    }

    pub fn cells(&mut self) -> *const Cell {
        self.playfield.cells2()
    }

    pub fn get_index(&self, row: u32, column: u32) -> usize {
        self.playfield.get_index(row, column)
    }

    pub fn get_current(&self) -> Tetrimino {
        self.playfield.get_current()
    }

    pub fn update(&mut self) {
        self.playfield.update();
    }

    pub fn rotate_left(&mut self) {
        self.playfield.rotate_left();
    }

    pub fn rotate_right(&mut self) {
        self.playfield.rotate_right();
    }
}

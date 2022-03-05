mod mino;
mod utils;

use mino::{MinoData, I_MINO, J_MINO, L_MINO, MINO_CELL_SIZE, O_MINO, S_MINO, T_MINO, Z_MINO};
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
    Filler,
    IMino,
    JMino,
    LMino,
    OMino,
    SMino,
    TMino,
    ZMino,
}

impl From<TetriminoKind> for Cell {
    fn from(value: TetriminoKind) -> Self {
        match value {
            TetriminoKind::I => Cell::IMino,
            TetriminoKind::J => Cell::JMino,
            TetriminoKind::L => Cell::LMino,
            TetriminoKind::O => Cell::OMino,
            TetriminoKind::S => Cell::SMino,
            TetriminoKind::T => Cell::TMino,
            TetriminoKind::Z => Cell::ZMino,
        }
    }
}

#[derive(Copy, Clone, Debug, PartialEq, Eq)]
pub enum TetriminoKind {
    I,
    J,
    L,
    O,
    S,
    T,
    Z,
}

impl Default for TetriminoKind {
    fn default() -> Self {
        use rand::Rng;
        // // let kind = rand::thread_rng().gen_range(0..6) as u32; // rand v0.8
        let kind = rand::thread_rng().gen_range(0, 6) as u32;

        TetriminoKind::from(kind)
    }
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

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Point {
    x: u32,
    y: u32,
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
    pub fn new(x: u32, y: u32) -> Self {
        Self { x, y }
    }

    pub fn add_x(&mut self, x: u32) {
        self.x += x;
    }

    pub fn sub_x(&mut self, x: u32) {
        self.x -= x;
    }

    pub fn add_y(&mut self, y: u32) {
        self.y += y;
    }
}

/// https://en.wikipedia.org/wiki/Tetrimino
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Tetrimino {
    kind: TetriminoKind,
    blocks: MinoData,
}

impl Default for Tetrimino {
    fn default() -> Self {
        let kind = TetriminoKind::default();

        Self {
            kind,
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

struct ControlledTetrimino {
    mino: Tetrimino,
    position: Point,
    speed: usize,
    frame: usize,
    last_dropped: usize,
    threshold: usize,
}

impl ControlledTetrimino {
    fn init_position() -> Point {
        Point::new(4, 0)
    }

    pub fn new(mino: Tetrimino) -> Self {
        Self {
            mino,
            position: ControlledTetrimino::init_position(),
            speed: 1,
            frame: 0,
            last_dropped: 0,
            threshold: 100,
        }
    }

    pub fn rotate_left(&mut self) {
        self.mino.rotate_left();
    }

    pub fn rotate_right(&mut self) {
        self.mino.rotate_right();
    }

    pub fn move_left(&mut self) {
        self.position.sub_x(1);
    }

    pub fn move_right(&mut self) {
        self.position.add_x(1);
    }

    fn is_dropped(&mut self) -> bool {
        self.frame += self.speed;
        if self.frame < self.last_dropped {
            return false;
        }
        self.last_dropped += self.threshold;

        true
    }

    pub fn drop_by_force(&mut self, line: u32) {
        self.position.add_y(line);
    }

    pub fn dropdown(&mut self, line: u32) {
        if self.is_dropped() {
            self.position.add_y(line);
        }
    }

    pub fn regenerate(&mut self, mino: Tetrimino) {
        self.speed += 1;
        self.position = ControlledTetrimino::init_position();
        self.mino = mino;
    }
}

struct Playfield {
    width: u32,
    height: u32,
    view_data: Vec<Cell>,
    grid_data: Vec<Vec<Cell>>,
    current: ControlledTetrimino,
    next: Tetrimino,
    is_pause: bool,
    is_gameover: bool,
}

impl Playfield {
    fn init_view_data(width: u32, height: u32) -> Vec<Cell> {
        let mut playfield: Vec<Cell> = vec![];
        for _ in 0..width * height {
            playfield.push(Cell::Filler);
        }
        playfield
    }

    fn init_grid_data(width: u32, height: u32) -> Vec<Vec<Cell>> {
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
                        line.push(Cell::Filler);
                    }
                } else if row == bottom_row - 1 {
                    line.push(Cell::Filler);
                } else if (1..=max_column - 2).contains(&column) {
                    line.push(Cell::Empty);
                } else {
                    line.push(Cell::Filler);
                }
            }

            playfield.push(line);
        }

        playfield
    }

    pub fn new() -> Self {
        let width = 12;
        let height = 23;

        Self {
            width,
            height,
            view_data: Playfield::init_view_data(width, height),
            grid_data: Playfield::init_grid_data(width, height),
            current: ControlledTetrimino::new(Tetrimino::default()),
            next: Tetrimino::default(),
            is_pause: false,
            is_gameover: false,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn view_data_ptr(&self) -> *const Cell {
        self.view_data.as_ptr()
    }

    pub fn update_view_data(&mut self) {
        for y in 0..self.height - 1 {
            for x in 0..self.width - 1 {
                let i = (y * self.width + x) as usize;

                self.view_data[i] = self.grid_data[y as usize][x as usize];
            }
        }

        let position = self.current.position.clone();
        let blocks = self.current.mino.blocks;
        let kind = self.current.mino.kind.to_owned();

        for (y, rows) in blocks.iter().enumerate() {
            for (x, _) in rows.iter().enumerate() {
                let cell = blocks[y][x];
                if cell == Cell::Empty {
                    continue;
                }

                let point = Point::new(x as u32, y as u32) + position.clone();
                let i = point.y * (self.width) + point.x;

                self.view_data[i as usize] = Cell::from(kind);
            }
        }
    }

    pub fn get_view_data_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn is_collision(&self) -> bool {
        let current = self.current.position.clone();
        let start_x = current.x as usize;
        let start_y = current.y as usize;

        for x in 0..MINO_CELL_SIZE {
            for y in 0..MINO_CELL_SIZE {
                if self.current.mino.blocks[y][x] == Cell::Empty {
                    // テトリミノのブロックがない場合は無視する
                    continue;
                }

                if self.grid_data[start_y + y][start_x + x] != Cell::Empty {
                    return true;
                }
            }
        }

        false
    }

    fn fix(&mut self) {
        let current = self.current.position.clone();
        let start_x = current.x as usize;
        let start_y = current.y as usize;

        for x in 0..MINO_CELL_SIZE {
            for y in 0..MINO_CELL_SIZE {
                if self.current.mino.blocks[y][x] == Cell::Empty {
                    // テトリミノのブロックがない場合は無視する
                    continue;
                }

                self.grid_data[start_y + y][start_x + x] = self.current.mino.blocks[y][x]
            }
        }
    }

    pub fn move_left(&mut self) {
        let prev = self.current.position.clone();

        self.current.move_left();
        if self.is_collision() {
            self.current.position = prev;
        }
    }

    pub fn move_right(&mut self) {
        let prev = self.current.position.clone();

        self.current.move_right();
        if self.is_collision() {
            self.current.position = prev;
        }
    }

    pub fn rotate_left(&mut self) {
        let prev = self.current.mino.clone();
        self.current.rotate_left();

        if self.is_collision() {
            self.current.mino = prev;
        }
    }

    pub fn rotate_right(&mut self) {
        let prev = self.current.mino.clone();
        self.current.rotate_right();

        if self.is_collision() {
            self.current.mino = prev;
        }
    }

    fn dropdown(&mut self, line: u32, force: bool) {
        let prev = self.current.position.clone();

        if force {
            self.current.drop_by_force(line);
        } else {
            self.current.dropdown(line);
        }

        if self.is_collision() {
            self.current.position = prev;
            self.fix();
            self.current.regenerate(self.next.clone());
            self.next = Tetrimino::default();
        }
    }

    pub fn toggle_pause(&mut self) {
        self.is_pause = !self.is_pause;
    }

    pub fn update(&mut self) {
        if self.is_pause {
            return;
        }
        if self.current.position.y == 0 && self.is_collision() {
            self.is_gameover = true;
            return;
        }

        self.dropdown(1, false);
        self.update_view_data();
    }
}

#[wasm_bindgen]
pub struct GameIO {
    playfield: Playfield,
}

impl Default for GameIO {
    fn default() -> Self {
        use crate::utils::set_panic_hook;
        set_panic_hook();
        Self {
            playfield: Playfield::new(),
        }
    }
}

#[allow(clippy::unused_unit)]
#[wasm_bindgen]
impl GameIO {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn width(&self) -> u32 {
        self.playfield.width()
    }

    pub fn height(&self) -> u32 {
        self.playfield.height()
    }

    pub fn view_data_ptr(&mut self) -> *const Cell {
        self.playfield.view_data_ptr()
    }

    pub fn get_index(&self, row: u32, column: u32) -> usize {
        self.playfield.get_view_data_index(row, column)
    }

    pub fn update(&mut self) {
        self.playfield.update();
    }

    pub fn is_gameover(&self) -> bool {
        self.playfield.is_gameover
    }

    pub fn is_pause(&self) -> bool {
        self.playfield.is_pause
    }

    pub fn toggle_pause(&mut self) {
        self.playfield.toggle_pause();
    }

    pub fn move_left(&mut self) {
        self.playfield.move_left();
    }

    pub fn move_right(&mut self) {
        self.playfield.move_right();
    }

    pub fn soft_drop(&mut self) {
        self.playfield.dropdown(1, true);
    }

    pub fn hard_drop(&mut self) {
        console_log!("hard_drop");
    }

    pub fn rotate_left(&mut self) {
        self.playfield.rotate_left();
    }

    pub fn rotate_right(&mut self) {
        self.playfield.rotate_right();
    }
}

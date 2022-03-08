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

#[allow(unused_macros)]
macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum Cell {
    Empty,
    Tetrion,
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

#[derive(Copy, Clone, Debug, PartialEq, Eq, PartialOrd, Ord)]
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
        let kind = rand::thread_rng().gen_range(0..6) as u32;

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

#[derive(Clone, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum TetriminoState {
    Prepare,
    Falling,
    Stopped,
}

#[derive(Clone, Debug, PartialEq, Eq, PartialOrd, Ord)]
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
#[derive(Clone, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub struct Tetrimino {
    kind: TetriminoKind,
    cells: MinoData,
}

impl Default for Tetrimino {
    fn default() -> Self {
        let kind = TetriminoKind::default();

        Self {
            kind,
            cells: match kind {
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
        for (y, rows) in self.cells.iter().enumerate() {
            for (x, _) in rows.iter().enumerate() {
                new_blocks[self.cells.len() - 1 - x][y] = self.cells[y][x]
            }
        }

        self.cells = new_blocks;
    }

    pub fn rotate_right(&mut self) {
        let mut new_blocks = EMPTY_MINO;
        for (y, rows) in self.cells.iter().enumerate() {
            for (x, _) in rows.iter().enumerate() {
                new_blocks[x][self.cells.len() - 1 - y] = self.cells[y][x]
            }
        }

        self.cells = new_blocks;
    }
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
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
        self.position = ControlledTetrimino::init_position();
        self.mino = mino;
    }

    pub fn accel(&mut self) {
        self.speed += 1;
    }
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
enum GameState {
    Startup,
    Running,
    Pause,
    Gameover,
}

struct Game {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
    playfield: Vec<Vec<Cell>>,
    current: ControlledTetrimino,
    next: Tetrimino,
    state: GameState,
}

impl Game {
    fn init_cells(width: u32, height: u32) -> Vec<Cell> {
        let mut cells: Vec<Cell> = vec![];
        for _ in 0..width * height {
            cells.push(Cell::Tetrion);
        }
        cells
    }

    fn init_playfield(width: u32, height: u32) -> Vec<Vec<Cell>> {
        let mut playfield: Vec<Vec<Cell>> = vec![];

        let max_column = width;
        let top_row = 0;
        let bottom_row = height;

        for row in 0..bottom_row {
            let mut line: Vec<Cell> = vec![];

            for column in 0..max_column {
                if (top_row..=top_row + 1).contains(&row) {
                    if (4..=7).contains(&column) {
                        line.push(Cell::Empty);
                    } else {
                        line.push(Cell::Tetrion);
                    }
                } else if row == bottom_row - 1 {
                    line.push(Cell::Tetrion);
                } else if (1..=max_column - 2).contains(&column) {
                    line.push(Cell::Empty);
                } else {
                    line.push(Cell::Tetrion);
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
            cells: Game::init_cells(width, height),
            playfield: Game::init_playfield(width, height),
            current: ControlledTetrimino::new(Tetrimino::default()),
            next: Tetrimino::default(),
            state: GameState::Startup,
        }
    }

    pub fn run(&mut self) {
        self.state = GameState::Running;
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells_ptr(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    pub fn update_cells(&mut self) {
        for y in 0..self.height - 1 {
            for x in 0..self.width - 1 {
                let i = (y * self.width + x) as usize;

                self.cells[i] = self.playfield[y as usize][x as usize];
            }
        }

        let position = self.current.position.clone();
        let blocks = self.current.mino.cells;
        let kind = self.current.mino.kind.to_owned();

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
    }

    pub fn get_cells_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn is_collision(&self) -> bool {
        let current = self.current.position.clone();
        let start_x = current.x as usize;
        let start_y = current.y as usize;

        for x in 0..MINO_CELL_SIZE {
            for y in 0..MINO_CELL_SIZE {
                if self.current.mino.cells[y][x] == Cell::Empty {
                    // テトリミノのブロックがない場合は無視する
                    continue;
                }

                if self.playfield[start_y + y][start_x + x] != Cell::Empty {
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
                if self.current.mino.cells[y][x] == Cell::Empty {
                    // テトリミノのブロックがない場合は無視する
                    continue;
                }

                self.playfield[start_y + y][start_x + x] = self.current.mino.cells[y][x]
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
        match self.state {
            GameState::Pause => self.state = GameState::Running,
            GameState::Running => self.state = GameState::Pause,
            _ => {}
        }
    }

    fn complete_lines(&mut self) {
        let mut completed_lines: Vec<u32> = vec![];

        for y in 0..self.height - 1 {
            let mut is_completed = true;
            for x in 0..self.width - 1 {
                let cell = self.playfield[y as usize][x as usize];
                if cell == Cell::Tetrion {
                    continue;
                }

                if cell == Cell::Empty {
                    is_completed = false;
                    break;
                }
            }

            if is_completed {
                // 座標が必要なので、+1で補正する
                completed_lines.push(y + 1);

                // クリアしたライン分、速度を上げる
                self.current.accel();
            }
        }

        for line in completed_lines {
            // クリアしたライン分落としたいので、最下層の行から順番に処理する
            // 一番上の行は処理する必要がないため、1からスタートする
            for y in (1..line).rev() {
                for x in 0..self.width - 1 {
                    let y = y as usize;
                    let x = x as usize;

                    if self.playfield[y][x] == Cell::Tetrion {
                        continue;
                    }

                    if self.playfield[y - 1][x] == Cell::Tetrion {
                        // コピー元のセルが`Tetrion`の場合もコピーさせたくないので無視する
                        continue;
                    }

                    self.playfield[y][x] = self.playfield[y - 1][x];
                    self.playfield[y - 1][x] = Cell::Empty;
                }
            }
        }
    }

    pub fn update(&mut self) {
        if self.state != GameState::Running {
            return;
        }

        if self.current.position.y == 0 && self.is_collision() {
            self.state = GameState::Gameover;
            return;
        }

        self.complete_lines();
        self.dropdown(1, false);
        self.update_cells();
    }

    pub fn is_gameover(&self) -> bool {
        self.state == GameState::Gameover
    }

    pub fn is_pause(&self) -> bool {
        self.state == GameState::Pause
    }

    pub fn is_startup(&self) -> bool {
        self.state == GameState::Startup
    }

    pub fn is_running(&self) -> bool {
        self.state == GameState::Running
    }

    pub fn restart(&mut self) {
        *self = Self {
            width: self.width,
            height: self.height,
            cells: Game::init_cells(self.width, self.height),
            playfield: Game::init_playfield(self.width, self.height),
            current: ControlledTetrimino::new(Tetrimino::default()),
            next: Tetrimino::default(),
            state: GameState::Startup,
        }
    }
}

#[wasm_bindgen]
pub struct GameIO {
    game: Game,
}

impl Default for GameIO {
    fn default() -> Self {
        use crate::utils::set_panic_hook;
        set_panic_hook();
        Self { game: Game::new() }
    }
}

#[allow(clippy::unused_unit)]
#[wasm_bindgen]
impl GameIO {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn width(&self) -> u32 {
        self.game.width()
    }

    pub fn height(&self) -> u32 {
        self.game.height()
    }

    pub fn cells_ptr(&mut self) -> *const Cell {
        self.game.cells_ptr()
    }

    pub fn get_index(&self, row: u32, column: u32) -> usize {
        self.game.get_cells_index(row, column)
    }

    pub fn run(&mut self) {
        self.game.run();
    }

    pub fn restart(&mut self) {
        self.game.restart();
    }

    pub fn update(&mut self) {
        self.game.update();
    }

    pub fn is_gameover(&self) -> bool {
        self.game.is_gameover()
    }

    pub fn is_pause(&self) -> bool {
        self.game.is_pause()
    }

    pub fn is_startup(&self) -> bool {
        self.game.is_startup()
    }

    pub fn is_running(&self) -> bool {
        self.game.is_running()
    }

    pub fn toggle_pause(&mut self) {
        self.game.toggle_pause();
    }

    pub fn move_left(&mut self) {
        self.game.move_left();
    }

    pub fn move_right(&mut self) {
        self.game.move_right();
    }

    pub fn soft_drop(&mut self) {
        self.game.dropdown(1, true);
    }

    pub fn rotate_left(&mut self) {
        self.game.rotate_left();
    }

    pub fn rotate_right(&mut self) {
        self.game.rotate_right();
    }
}

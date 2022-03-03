use super::Cell;

pub const MINO_CELL_SIZE: usize = 4;

type MinoLine = [Cell; MINO_CELL_SIZE];
pub type Mino = [MinoLine; MINO_CELL_SIZE];

#[rustfmt::skip]
pub const EMPTY_MINO: Mino = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const I_MINO: Mino = [
    [Cell::I,     Cell::I,     Cell::I,     Cell::I    ],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const O_MINO: Mino = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::O,     Cell::O,     Cell::Empty],
    [Cell::Empty, Cell::O,     Cell::O,     Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const S_MINO: Mino = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::S,     Cell::S,     Cell::Empty],
    [Cell::S,     Cell::S,     Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const Z_MINO: Mino = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Z,     Cell::Z,     Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Z,     Cell::Z    ],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const J_MINO: Mino = [
    [Cell::J,     Cell::J,     Cell::J,     Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::J,     Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const L_MINO: Mino = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::L    ],
    [Cell::Empty, Cell::L,     Cell::L,     Cell::L    ],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const T_MINO: Mino = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::T,     Cell::Empty, Cell::Empty],
    [Cell::T,     Cell::T,     Cell::T,     Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

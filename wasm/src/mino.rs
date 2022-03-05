use super::Cell;

pub const MINO_CELL_SIZE: usize = 4;

type MinoLine = [Cell; MINO_CELL_SIZE];
pub type MinoData = [MinoLine; MINO_CELL_SIZE];

#[rustfmt::skip]
pub const EMPTY_MINO: MinoData = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const I_MINO: MinoData = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::IMino, Cell::IMino, Cell::IMino, Cell::IMino],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const O_MINO: MinoData = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::OMino, Cell::OMino, Cell::Empty],
    [Cell::Empty, Cell::OMino, Cell::OMino, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const S_MINO: MinoData = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::SMino, Cell::SMino, Cell::Empty],
    [Cell::SMino, Cell::SMino, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const Z_MINO: MinoData = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::ZMino, Cell::ZMino, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::ZMino, Cell::ZMino],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const J_MINO: MinoData = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::JMino, Cell::JMino, Cell::JMino, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::JMino, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const L_MINO: MinoData = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::LMino],
    [Cell::Empty, Cell::LMino, Cell::LMino, Cell::LMino],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

#[rustfmt::skip]
pub const T_MINO: MinoData = [
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
    [Cell::Empty, Cell::TMino, Cell::Empty, Cell::Empty],
    [Cell::TMino, Cell::TMino, Cell::TMino, Cell::Empty],
    [Cell::Empty, Cell::Empty, Cell::Empty, Cell::Empty],
];

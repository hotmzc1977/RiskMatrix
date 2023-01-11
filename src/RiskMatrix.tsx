import { Box, Grid, Paper } from '@mui/material'
import { height } from '@mui/system';
import { normalize } from 'path';
import { config } from 'process';
import React, { useEffect, useState } from 'react'
import { AppearanceConstants, AreaBorderStyle, CellAttributes, DividerStyles, MatrixAreas, RiskColumnAlignment, RMColCfg, RMConfig, RMConfigValue, RMData } from './Definition'
import CheckIcon from '@mui/icons-material/Check';

interface Props {
    rmData: RMData[],
    rmColCfg: RMColCfg[],
    rmConfig: RMConfig[]
}

export default function RiskMatrix(props: Props) {
    const [scale, setScale] = useState(0.068)
    const [selectedMatrixCell, setSelectedMatrixCell] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
    const numbersArray = (max: number) => {
        let numbers: number[] = [];
        for (let i = 1; i <= max; i++) {
            numbers.push(i)
        }
        return numbers;
    }
    const dataAt = (areaId: MatrixAreas, row: number, col: number): RMData | undefined => {
        return props.rmData.find(data => data.rmAreaId === areaId && data.rmRow === row && data.rmColumn === col)
    }
    const [appearance, setAppearance] = useState<AppearanceConstants>(AppearanceConstants.Flat);
    const [borderStyle, setBorderStyle] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [borderStyleHeader1, setBorderStyleHeader1] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [borderStyleHeader2, setBorderStyleHeader2] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [borderStyleLedger1, setBorderStyleLedger1] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [borderStyleLedger2, setBorderStyleLedger2] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [borderStyleMatrix, setBorderStyleMatrix] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [columnCountMatrix, setColumnCountMatrix] = useState(5);
    const [ledgerColumns1, setLedgerColumns1] = useState(1)
    const [ledgerColumns2, setLedgerColumns2] = useState(1)
    const [rowCountMatrix, setRowCountMatrix] = useState(5);
    const [rowCountHeader1, setRowCountHeader1] = useState(1);
    const [rowCountHeader2, setRowCountHeader2] = useState(1);
    const [columnWidthLedger1, setColumnWidthLedger1] = useState(1200)
    const [columnWidthLedger2, setColumnWidthLedger2] = useState(3000)
    const [columnWidthMatrix, setColumnWidthMatrix] = useState(720)
    const [rowHeightMatrix, setRowHeightMatrix] = useState(720)
    const [rowHeightHeader1, setRowHeightHeader1] = useState(300)
    const [rowHeightHeader2, setRowHeightHeader2] = useState(300)

    const [rowsPerValueLedger1, setRowsPerValueLedger1] = useState(1)
    const [rowsPerValueLedger2, setRowsPerValueLedger2] = useState(1)

    const [columnDividerStyleHeader1, setColumnDividerStyleHeader1] = useState<DividerStyles>(DividerStyles.rmLightGrey)
    const [columnDividerStyleHeader2, setColumnDividerStyleHeader2] = useState<DividerStyles>(DividerStyles.rmLightGrey)
    const [columnDividerStyleLedger1, setColumnDividerStyleLedger1] = useState<DividerStyles>(DividerStyles.rmLightGrey)
    const [columnDividerStyleLedger2, setColumnDividerStyleLedger2] = useState<DividerStyles>(DividerStyles.rmLightGrey)
    const [columnDividerStyleMatrix, setColumnDividerStyleMatrix] = useState<DividerStyles>(DividerStyles.rmLightGrey)

    const [rowDividerStyleHeader1, setRowDividerStyleHeader1] = useState<DividerStyles>(DividerStyles.rmLightGrey)
    const [rowDividerStyleHeader2, setRowDividerStyleHeader2] = useState<DividerStyles>(DividerStyles.rmLightGrey)
    const [rowDividerStyleLedger1, setRowDividerStyleLedger1] = useState<DividerStyles>(DividerStyles.rmLightGrey)
    const [rowDividerStyleLedger2, setRowDividerStyleLedger2] = useState<DividerStyles>(DividerStyles.rmLightGrey)
    const [rowDividerStyleMatrix, setRowDividerStyleMatrix] = useState<DividerStyles>(DividerStyles.rmLightGrey)

    const [ledger1ColsAndWidth, setLedger1ColsAndWidth] = useState<{ [col: number]: number }>({ [1]: 1200 })
    const [ledger1Width, setLeder1Width] = useState(1200)
    const [ledger2ColsAndWidth, setLedger2ColsAndWidth] = useState<{ [col: number]: number }>({ [1]: 3000 })
    const [ledger2Width, setLeder2Width] = useState(3000)
    // const [matrixWidth, setMatrixWidth] = useState(3600)

    useEffect(() => {
        let result = {};
        let width: number = 0;
        for (let col = 1; col <= ledgerColumns1; col++) {
            result = { ...result, [col]: columnWidthLedger1 }
        }
        props.rmColCfg
            .filter(cc => cc.rmAreaId === MatrixAreas.rmLedger1)
            .forEach(cc => {
                result = { ...result, [cc.rmColumn]: cc.rmcColWidth }
            })
        setLedger1ColsAndWidth(result);
        Object.values<number>(result).forEach((w: number) => { width = width + w })
        setLeder1Width(width)
    }, [ledgerColumns1, columnWidthLedger1, props.rmColCfg])

    useEffect(() => {
        let result = {};
        let width: number = 0;
        for (let col = 1; col <= ledgerColumns2; col++) {
            result = { ...result, [col]: columnWidthLedger2 }
        }
        props.rmColCfg
            .filter(cc => cc.rmAreaId === MatrixAreas.rmLedger2)
            .forEach(cc => {
                result = { ...result, [cc.rmColumn]: cc.rmcColWidth }
            })
        setLedger2ColsAndWidth(result);
        Object.values<number>(result).forEach((w: number) => { width = width + w })
        setLeder2Width(width)
    }, [ledgerColumns2, columnWidthLedger2, props.rmColCfg])

    const setAreaAttribute = () => {
        props.rmConfig.forEach(config => {
            const value = config.rmcValue
            if (config.rmcVId === RMConfigValue.APPEARANCE) setAppearance(value as AppearanceConstants);
            else if (config.rmcVId === RMConfigValue.BORDER) {
                switch (config.rmAreaId) {
                    case MatrixAreas.rmControl:
                        setBorderStyle(value as AreaBorderStyle)
                        break;
                    case MatrixAreas.rmHeader1:
                        setBorderStyleHeader1(value as AreaBorderStyle)
                        break;
                    case MatrixAreas.rmHeader2:
                        setBorderStyleHeader2(value as AreaBorderStyle)
                        break;
                    case MatrixAreas.rmLedger1:
                        setBorderStyleLedger1(value as AreaBorderStyle)
                        break;
                    case MatrixAreas.rmLedger2:
                        setBorderStyleLedger2(value as AreaBorderStyle)
                        break;
                    case MatrixAreas.rmMatrix:
                        setBorderStyleMatrix(value as AreaBorderStyle)
                        break;
                    default:
                    // do nothing
                }
            }
            else if (config.rmcVId === RMConfigValue.COLCOUNT) {
                switch (config.rmAreaId) {
                    case MatrixAreas.rmLedger1:
                        setLedgerColumns1(value)
                        break;
                    case MatrixAreas.rmLedger2:
                        setLedgerColumns2(value);
                        break;
                    case MatrixAreas.rmMatrix:
                        setColumnCountMatrix(value)
                        break;
                    default:
                    //do nothing
                }
            }
            else if (config.rmcVId === RMConfigValue.COLDIVIDER) {
                switch (config.rmAreaId) {
                    case MatrixAreas.rmHeader1:
                        setColumnDividerStyleHeader1(value)
                        break;
                    case MatrixAreas.rmHeader2:
                        setColumnDividerStyleHeader2(value)
                        break;
                    case MatrixAreas.rmLedger1:
                        setColumnDividerStyleLedger1(value)
                        break;
                    case MatrixAreas.rmLedger2:
                        setColumnDividerStyleLedger2(value)
                        break;
                    case MatrixAreas.rmMatrix:
                        setColumnDividerStyleMatrix(value)
                        break;
                }
            }
            else if (config.rmcVId === RMConfigValue.COLWIDTH) {
                switch (config.rmAreaId) {
                    case MatrixAreas.rmLedger1:
                        setColumnWidthLedger1(value)
                        break;
                    case MatrixAreas.rmLedger2:
                        setColumnWidthLedger2(value)
                        break;
                    case MatrixAreas.rmMatrix:
                        setColumnWidthMatrix(value)
                        break;
                }
            }
            else if (config.rmcVId === RMConfigValue.ROWCOUNT) {
                switch (config.rmAreaId) {
                    case MatrixAreas.rmHeader1:
                        setRowCountHeader1(value)
                        break;
                    case MatrixAreas.rmHeader2:
                        setRowCountHeader2(value)
                        break;
                    case MatrixAreas.rmMatrix:
                        setRowCountMatrix(value)
                        break;
                }
            }
            else if (config.rmcVId === RMConfigValue.ROWDIVIDER) {
                switch (config.rmAreaId) {
                    case MatrixAreas.rmHeader1:
                        setRowDividerStyleHeader1(value)
                        break;
                    case MatrixAreas.rmHeader2:
                        setRowDividerStyleHeader2(value)
                        break;
                    case MatrixAreas.rmLedger1:
                        setRowDividerStyleLedger1(value)
                        break;
                    case MatrixAreas.rmLedger2:
                        setRowDividerStyleLedger2(value)
                        break;
                    case MatrixAreas.rmMatrix:
                        setRowDividerStyleMatrix(value)
                        break;
                }
            }
            else if (config.rmcVId === RMConfigValue.ROWHEIGHT) {
                switch (config.rmAreaId) {
                    case MatrixAreas.rmHeader1:
                        setRowHeightHeader1(value)
                        break;
                    case MatrixAreas.rmHeader2:
                        setRowHeightHeader2(value)
                        break;
                    case MatrixAreas.rmMatrix:
                        setRowHeightMatrix(value)
                        break;
                }
            }
            else if (config.rmcVId === RMConfigValue.ROWSPERVALUE) {
                switch (config.rmAreaId) {
                    case MatrixAreas.rmLedger1:
                        setRowsPerValueLedger1(value)
                        break;
                    case MatrixAreas.rmLedger2:
                        setRowsPerValueLedger2(value)
                        break;
                }
            }
        })
    }

    useEffect(() => {
        setAreaAttribute()
        setSelectedMatrixCell({ x: 0, y: 0 })
    }, [props.rmConfig])

    const colorOLEtoRGB = (ole: number) => {

        if (ole < 0 || ole > 16777215) { return "#000"; }
        // Verify ole is valid OLE.
        let blu = Math.floor((ole / 65536) % 256).toString(16);
        let grn = Math.floor((ole / 256) % 256).toString(16);
        let red = Math.floor(ole % 256).toString(16);
        // Convert the OLE to RGB decimal.
        if (blu.length < 2) { blu = "0" + blu; }
        if (grn.length < 2) { grn = "0" + grn; }
        if (red.length < 2) { red = "0" + red; }
        // Convert RGB decimal to RGB hexidecimal, add leading 0 if needed.
        return "#" + red + grn + blu;
    }

    const isCellSelected = (areaId: MatrixAreas, row: number, col: number): boolean => {
        if (selectedMatrixCell.x <= 0 || selectedMatrixCell.y <= 0) return false;
        if (areaId === MatrixAreas.rmMatrix) return selectedMatrixCell.x === row && selectedMatrixCell.y === col;
        else if (areaId === MatrixAreas.rmLedger1) {
            return row > rowsPerValueLedger1 * (selectedMatrixCell.x - 1) && row <= rowsPerValueLedger1 * selectedMatrixCell.x
        }
        else if (areaId === MatrixAreas.rmLedger2) {
            return row > rowsPerValueLedger2 * (selectedMatrixCell.x - 1) && row <= rowsPerValueLedger2 * selectedMatrixCell.x
        }
        else if (areaId === MatrixAreas.rmHeader2) {
            return col === ledgerColumns1 + ledgerColumns2 + selectedMatrixCell.y
        }
        return false
    }

    const cellBorderLeft = (data: RMData) => {
        let colDivider: DividerStyles = DividerStyles.rmLightGrey
        if (data.rmAreaId === MatrixAreas.rmHeader1) colDivider = columnDividerStyleHeader1
        else if (data.rmAreaId === MatrixAreas.rmHeader2) colDivider = columnDividerStyleHeader2
        else if (data.rmAreaId === MatrixAreas.rmLedger1) colDivider = columnDividerStyleLedger1
        else if (data.rmAreaId === MatrixAreas.rmLedger2) colDivider = columnDividerStyleLedger2
        else if (data.rmAreaId === MatrixAreas.rmMatrix) colDivider = columnDividerStyleMatrix

        if (colDivider === DividerStyles.rmInset) return `inset 1px ${data.rmAreaId === MatrixAreas.rmHeader1 ? "white" : "lightgray"}`
        else if (colDivider === DividerStyles.rmNoDividers) return "none"
        return `solid 1px ${data.rmAreaId === MatrixAreas.rmHeader1 ? "white" : "lightgray"}`
    }

    const cellBorderTop = (data: RMData) => {
        let rowDivider: DividerStyles = DividerStyles.rmLightGrey
        if (data.rmAreaId === MatrixAreas.rmHeader1) rowDivider = rowDividerStyleHeader1
        else if (data.rmAreaId === MatrixAreas.rmHeader2) rowDivider = rowDividerStyleHeader2
        else if (data.rmAreaId === MatrixAreas.rmLedger1) rowDivider = rowDividerStyleLedger1
        else if (data.rmAreaId === MatrixAreas.rmLedger2) rowDivider = rowDividerStyleLedger2
        else if (data.rmAreaId === MatrixAreas.rmMatrix) rowDivider = rowDividerStyleMatrix

        if (rowDivider === DividerStyles.rmInset) return `inset 1px lightgray`
        else if (rowDivider === DividerStyles.rmNoDividers) return "none"
        return `solid 1px lightgray`
    }

    const cellBorderBottom = (data: RMData) => {
        return ((data.rmAreaId === MatrixAreas.rmLedger1 && data.rmRow === rowCountMatrix * rowsPerValueLedger1)
            || (data.rmAreaId === MatrixAreas.rmLedger2 && data.rmRow === rowCountMatrix * rowsPerValueLedger2)
            || (data.rmAreaId === MatrixAreas.rmMatrix && data.rmRow === rowCountMatrix)) ?
            "inset 1px darkgray" : "none"
    }

    const matrixBox = (areaId: MatrixAreas, row: number, col: number) => {
        const data = props.rmData.find(data => data.rmAreaId === areaId && data.rmRow === row && data.rmColumn === col)
        if (!data) return null;
        const isSelected = isCellSelected(areaId, row, col)
        return <Box
            onClick={() => { areaId === MatrixAreas.rmMatrix && setSelectedMatrixCell({ x: row, y: col }) }}
            sx={{
                width: "100%", height: "100%", maxWidth: "100%",
                maxHeight: "100%",
                whiteSpace: "pre-line",
                // boxShadow: (isSelected && areaId === MatrixAreas.rmMatrix) ? 10 : 0,
                WebkitBoxShadow: (isSelected && areaId === MatrixAreas.rmMatrix) ? "0 0 1px 1px inset" : "none",
                color: colorOLEtoRGB(isSelected ? data.rmdSelForeColor : data.rmdForeColor),
                backgroundColor: colorOLEtoRGB(isSelected ? data.rmdSelBackColor : data.rmdBackColor),
                textAlign: data.rmdAlignment === RiskColumnAlignment.rmAlignCenter ? "center" : (data.rmdAlignment === RiskColumnAlignment.rmAlignRight ? "right" : "left"),
                fontFamily: isSelected ? data.rmdSelFontName : data.rmdFontName,
                fontSize: (isSelected ? data.rmdSelFontSize : data.rmdFontSize) * 1.4,
                fontStyle: ((isSelected ? data.rmdSelFontAttrib : data.rmdFontAttrib) & CellAttributes.rmItalic) ? "italic" : "normal",
                fontWeight: ((isSelected ? data.rmdSelFontAttrib : data.rmdFontAttrib) & CellAttributes.rmBold) ? "bold" : "normal",
                cursor: areaId === MatrixAreas.rmMatrix ? "pointer" : "default",
                textDecoration: ((isSelected ? data.rmdSelFontAttrib : data.rmdFontAttrib) & CellAttributes.rmUnderline) ? "underline" : (((isSelected ? data.rmdSelFontAttrib : data.rmdFontAttrib) & CellAttributes.rmUnderline) ? "line-through" : "none"),
                borderTop: (row === 1) ? "inset 2px darkgray" : cellBorderTop(data),
                borderLeft: (col === 1) ? "inset 2px lightgray" : cellBorderLeft(data),
                borderRight: "none",
                borderBottom: cellBorderBottom(data),
            }}
        >
            {data.rmValue?.replaceAll("%LF", "\n")}
            <br />
            {areaId === MatrixAreas.rmMatrix && isSelected && <CheckIcon />}
        </Box>
    }

    return (
        <Box >
            <Grid container spacing={0} width={(ledger1Width + ledger2Width + columnCountMatrix * columnWidthMatrix) * scale + 1}>

                {numbersArray(rowCountHeader1).map(n =>
                    <Grid item container sx={{ width: "inherit" }} id={`h1-r${n}`} key={`h1-r${n}`} height={rowHeightHeader1 * scale}>
                        <Grid item width={ledger1Width * scale} sx={{ height: "inherit" }}>
                            {matrixBox(MatrixAreas.rmHeader1, 1, 1)}
                        </Grid>
                        <Grid item width={ledger2Width * scale} sx={{ height: "inherit" }}>
                            {matrixBox(MatrixAreas.rmHeader1, 1, 2)}
                        </Grid>
                        <Grid item width={columnCountMatrix * columnWidthMatrix * scale} sx={{ height: "inherit" }}>
                            {matrixBox(MatrixAreas.rmHeader1, 1, 3)}
                        </Grid>
                    </Grid>)}

                {numbersArray(rowCountHeader2).map(nr =>
                    <Grid key={`h2-r${nr}`} item container id="header2" height={rowHeightHeader2 * scale} sx={{ width: "inherit" }}>
                        <Grid item width={ledger1Width * scale} sx={{ height: "inherit" }}>
                            {matrixBox(MatrixAreas.rmHeader2, nr, 1)}
                        </Grid>
                        {
                            numbersArray(ledgerColumns2).map(nc =>
                                <Grid
                                    item
                                    key={`h2-c${nc + 1}`}
                                    width={ledger2ColsAndWidth[nc] * scale}
                                    sx={{ height: "inherit" }} >
                                    {matrixBox(MatrixAreas.rmHeader2, nr, nc + 1)}
                                </Grid>)
                        }

                        <Grid item container columns={columnCountMatrix} width={columnCountMatrix * columnWidthMatrix * scale} >
                            {
                                numbersArray(columnCountMatrix).map(n =>
                                    <Grid item key={`h2-c${n + 3}`} id={`h2-c${n + 3}`} xs={1} >
                                        {matrixBox(MatrixAreas.rmHeader2, nr, n + 1 + ledgerColumns2)}
                                    </Grid>
                                )
                            }

                        </Grid>
                    </Grid>)}

                {numbersArray(rowCountMatrix).map(nv =>
                    <Grid item container sx={{ width: "inherit" }} height={rowHeightMatrix * scale} id={`v-r${nv}`} key={`v-r${nv}`}>
                        <Grid item id={`v${nv}-l1`} width={ledger1Width * scale} sx={{ height: "inherit" }}>
                            {
                                numbersArray(rowsPerValueLedger1).map(nr =>
                                    <Grid key={`v${nv}-ldg1-row-${nr}`} item container
                                        sx={{ width: "inherit" }}
                                        height={(rowHeightMatrix / rowsPerValueLedger1) * scale}>
                                        {
                                            numbersArray(ledgerColumns1).map(nl =>
                                                <Grid item
                                                    key={`l1-v${nv}-c${nl}`}
                                                    width={ledger1ColsAndWidth[nl] * scale}
                                                    sx={{ height: "inherit" }}>
                                                    {matrixBox(MatrixAreas.rmLedger1, (nv - 1) * rowsPerValueLedger1 + nr, nl)}
                                                </Grid>
                                            )
                                        }
                                    </Grid>
                                )
                            }

                        </Grid>
                        <Grid item id="value1-ledger2" width={ledger2Width * scale}>
                            {
                                numbersArray(rowsPerValueLedger2).map(nr =>
                                    <Grid key={`v1-ldg2-row-${nr}`} item container sx={{ display: "flex", width: "inherit" }} height={(rowHeightMatrix / rowsPerValueLedger2) * scale}>
                                        {
                                            numbersArray(ledgerColumns2).map(nl =>
                                                <Grid
                                                    key={`v1-ldg2-row-${nr}-col-${nl}`}
                                                    id={`v1-ldg2-row-${nr}-col-${nl}`}
                                                    width={ledger2ColsAndWidth[nl] * scale}
                                                    sx={{ height: "inherit" }} >
                                                    {matrixBox(MatrixAreas.rmLedger2, (nv - 1) * rowsPerValueLedger2 + nr, nl)}
                                                </Grid>)
                                        }

                                    </Grid>
                                )
                            }
                        </Grid>
                        <Grid item container columns={columnCountMatrix} width={columnCountMatrix * columnWidthMatrix * scale} id="matrix-1">
                            {
                                numbersArray(columnCountMatrix).map(nr =>
                                    <Grid item key={`v-c${nr}`} id={`v-c${nr}`} xs={1} sx={{ height: "inherit" }}>
                                        {matrixBox(MatrixAreas.rmMatrix, nv, nr)}
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                )


                }

            </Grid>
        </Box>
    )
}

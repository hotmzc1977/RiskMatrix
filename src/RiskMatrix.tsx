import { Grid } from '@mui/material'
import { config } from 'process';
import React, { useEffect, useState } from 'react'
import { AppearanceConstants, AreaBorderStyle, DividerStyles, MatrixAreas, RMColCfg, RMConfig, RMConfigValue, RMData } from './Definition'

interface Props {
    rmData: RMData[],
    rmColCfg: RMColCfg[],
    rmConfig: RMConfig[]
}

export default function RiskMatrix(props: Props) {
    const [appearance, setAppearance] = useState<AppearanceConstants>(AppearanceConstants.Flat);
    const [borderStyle, setBorderStyle] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [borderStyleHeader1, setBorderStyleHeader1] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [borderStyleHeader2, setBorderStyleHeader2] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [borderStyleLedger1, setBorderStyleLedger1] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [borderStyleLedger2, setBorderStyleLedger2] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [borderStyleMatrix, setBorderStyleMatrix] = useState<AreaBorderStyle>(AreaBorderStyle.rmAreaBorderOff)
    const [columnCountMatrix, setColumnCountMatrix] = useState(5);
    const [ledgerColumns1, setLedgerColumns1] = useState(0)
    const [ledgerColumns2, setLedgerColumns2] = useState(0)
    const [rowCountMatrix, setRowCountMatrix] = useState(5);
    const [rowCountHeader1, setRowCountHeader1] = useState(1);
    const [rowCountHeader2, setRowCountHeader2] = useState(1);
    const [columnWidthLedger1, setColumnWidthLedger1] = useState(0)
    const [columnWidthLedger2, setColumnWidthLedger2] = useState(0)
    const [columnWidthMatrix, setColumnWidthMatrix] = useState(0)
    const [rowHeightMatrix, setRowHeightMatrix] = useState(0)
    const [rowHeightHeader1, setRowHeightHeader1] = useState(0)
    const [rowHeightHeader2, setRowHeightHeader2] = useState(0)

    const [rowsPerValueLedger1, setRowsPerValueLedger1] = useState(0)
    const [rowsPerValueLedger2, setRowsPerValueLedger2] = useState(0)

    const [columnDividerStyleHeader1, setColumnDividerStyleHeader1] = useState<DividerStyles>(DividerStyles.rmBlackLine)
    const [columnDividerStyleHeader2, setColumnDividerStyleHeader2] = useState<DividerStyles>(DividerStyles.rmBlackLine)
    const [columnDividerStyleLedger1, setColumnDividerStyleLedger1] = useState<DividerStyles>(DividerStyles.rmBlackLine)
    const [columnDividerStyleLedger2, setColumnDividerStyleLedger2] = useState<DividerStyles>(DividerStyles.rmBlackLine)
    const [columnDividerStyleMatrix, setColumnDividerStyleMatrix] = useState<DividerStyles>(DividerStyles.rmBlackLine)

    const [rowDividerStyleHeader1, setRowDividerStyleHeader1] = useState<DividerStyles>(DividerStyles.rmBlackLine)
    const [rowDividerStyleHeader2, setRowDividerStyleHeader2] = useState<DividerStyles>(DividerStyles.rmBlackLine)
    const [rowDividerStyleLedger1, setRowDividerStyleLedger1] = useState<DividerStyles>(DividerStyles.rmBlackLine)
    const [rowDividerStyleLedger2, setRowDividerStyleLedger2] = useState<DividerStyles>(DividerStyles.rmBlackLine)
    const [rowDividerStyleMatrix, setRowDividerStyleMatrix] = useState<DividerStyles>(DividerStyles.rmBlackLine)

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
        })
    }

    useEffect(() => {
        setAreaAttribute()
    }, [])

    return (
        <Grid container gap={1}>
            <Grid item container xs={12}>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={6}></Grid>
            </Grid>

            <Grid item container xs={12}>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item container xs={6}>

                </Grid>
            </Grid>

        </Grid>
    )
}

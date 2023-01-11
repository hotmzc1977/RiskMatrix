export enum AppearanceConstants {
    Flat = 0,
    ThreeD = 1
}

export enum MatrixAreas {
    rmControl = 0,
    rmHeader1 = 1,
    rmHeader2 = 2,
    rmLedger1 = 3,
    rmLedger2 = 4,
    rmMatrix = 5,
}

export enum CellAttributes {
    rmNone = 0,
    rmBold = 1,
    rmItalic = 2,
    rmUnderline = 4,
    rmStrikethrough = 8
}

export enum RiskColumnAlignment {
    rmAlignLeft = 0,
    rmAlignRight = 1,
    rmAlignCenter = 2
}

export enum AreaBorderStyle {
    rmAreaBorderOff = 0,
    rmAreaBorderOn = 1
}

export enum DividerStyles {
    rmNoDividers = 0,
    rmBlackLine = 1,
    rmDarkGreyLine = 2,
    rmRaised = 3,
    rmInset = 4,
    rmUeForeColor = 5,
    rmLightGrey = 6
}

export enum MatrixCellAttributes {
    rmBackColor = 1,
    rmForeColor = 2,
    rmSelBackColor = 3,
    rmSelForeColor = 4,
    rmAlignment = 5,
    rmFontName = 6,
    rmFontSize = 7,
    rmFontAttrib = 8,
    rmSelFontName = 9,
    rmSelFontSize = 10,
    rmSelFontAttrib = 11
}

export enum AreaAttributeIndex {
    AreaNothing = 0,
    AreaBorder = 1,
    AreaColCount = 2,
    AreaColDivider = 3,
    AreaColWidth = 4,
    AreaRowCount = 5,
    AreaRowDivider = 6,
    AreaRowHeight = 7,
    AreaRowsPerValue = 8,
    Default_X = 9,
    Default_Y = 10,
    AreaAppearance = 11,
    AreaMaxPos = 12
}

export enum RMConfigValue {
    APPEARANCE = 'APPEARANCE',
    BORDER = 'BORDER',
    BORDER_H1 = 'BORDER_H1',
    BORDER_H2 = 'BORDER_H2',
    BORDER_L1 = 'BORDER_L1',
    BORDER_L2 = 'BORDER_L2',
    BORDER_M = 'BORDER_M',
    COLCOUNT = 'COLCOUNT',
    COLCOUNT_L1 = 'COLCOUNT_L1',
    COLCOUNT_L2 = 'COLCOUNT_L2',
    COLDIVIDER = 'COLDIVIDER',
    COLDIVIDER_H1 = 'COLDIVIDER_H1',
    COLDIVIDER_H2 = 'COLDIVIDER_H2',
    COLDIVIDER_L1 = 'COLDIVIDER_L1',
    COLDIVIDER_L2 = 'COLDIVIDER_L2',
    COLDIVIDER_M = 'COLDIVIDER_M',
    COLWIDTH = 'COLWIDTH',
    COLWIDTH_L1 = 'COLWIDTH_L1',
    COLWIDTH_L2 = 'COLWIDTH_L2',
    COLWIDTH_M = 'COLWIDTH_M',
    DEFAULT_X = 'DEFAULT_X',
    DEFAULT_Y = 'DEFAULT_Y',
    ROWCOUNT = 'ROWCOUNT',
    ROWCOUNT_H1 = 'ROWCOUNT_H1',
    ROWCOUNT_H2 = 'ROWCOUNT_H2',
    ROWDIVIDER = 'ROWDIVIDER',
    ROWDIVIDER_H1 = 'ROWDIVIDER_H1',
    ROWDIVIDER_H2 = 'ROWDIVIDER_H2',
    ROWDIVIDER_L1 = 'ROWDIVIDER_L1',
    ROWDIVIDER_L2 = 'ROWDIVIDER_L2',
    ROWDIVIDER_M = 'ROWDIVIDER_M',
    ROWHEIGHT = 'ROWHEIGHT',
    ROWHEIGHT_H1 = 'ROWHEIGHT_H1',
    ROWHEIGHT_H2 = 'ROWHEIGHT_H2',
    ROWHEIGHT_M = 'ROWHEIGHT_M',
    ROWSPERVALUE = 'ROWSPERVALUE',
    ROWSPERVALUE_L1 = 'ROWSPERVALUE_L1',
    ROWSPERVALUE_L2 = 'ROWSPERVALUE_L2',
    VALUECOUNT_X = 'VALUECOUNT_X',
    VALUECOUNT_Y = 'VALUECOUNT_Y'
}

export interface RMData {
    rmObjectId: number,
    rmAreaId: MatrixAreas,
    rmRow: number,
    rmColumn: number,
    rmValue: string,
    rmdBackColor: number,
    rmdForeColor: number,
    rmdSelBackColor: number,
    rmdSelForeColor: number,
    rmdAlignment: RiskColumnAlignment,
    rmdFontName: string,
    rmdFontSize: number,
    rmdFontAttrib: CellAttributes,
    rmdSelFontName: string,
    rmdSelFontSize: number,
    rmdSelFontAttrib: CellAttributes,
    rmDisplayValue?: string
    rmDisplayShort?: string
}

export interface RMColCfg {
    rmObjectId: number,
    rmAreaId: MatrixAreas,
    rmColumn: number,
    rmcColDivider: DividerStyles,
    rmcColWidth: number
}

export interface RMConfig {
    rmObjectId: number,
    rmAreaId: MatrixAreas
    rmcVId: RMConfigValue,
    rmcValue: number
}
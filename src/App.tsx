import { useEffect, useState } from "react";
import { MatrixAreas, RMColCfg, RMConfig, RMData } from "./Definition";

import configs from './data/ST_RMCONFIG.json'
import colCfgs from './data/ST_RMCOLCFG.json'
import data from './data/ST_RMDATA.json'
import RiskMatrix, { colorOLEtoRGB } from "./RiskMatrix";
import { Button, Grid, TextField } from "@mui/material";
import { rm } from "fs";

function App() {

  const [rmObjectId, setRMObjectId] = useState(10195001)
  const [riskFactor, setRiskFactor] = useState(0)
  const [riskColor, setRiskColor] = useState(-1)
  const [riskX, setRiskX] = useState(0)
  const [riskY, setRiskY] = useState(0)
  const [riskShort, setRiskShort] = useState("")
  const [riskDisplay, setRiskDisplay] = useState("")

  useEffect(() => {
    const rmData = data.find(d => d.rmObjectId === rmObjectId && d.rmRow === riskX && d.rmColumn === riskY && d.rmAreaId === MatrixAreas.rmMatrix)
    setRiskColor(rmData?.rmdBackColor ?? -1)
    setRiskFactor(parseInt(rmData?.rmValue?.replaceAll("%LF", "") ?? "0"))
    setRiskShort((!!rmData?.rmDisplayShort ? rmData?.rmDisplayShort : rmData?.rmValue)?.replaceAll("%LF", "") ?? "")
    setRiskDisplay((!!rmData?.rmDisplayValue ? rmData?.rmDisplayValue : rmData?.rmValue)?.replaceAll("%LF", "") ?? "")
  }, [riskX, riskY, rmObjectId])

  const setSelectedCell = (x: number, y: number) => {
    setRiskX(x);
    setRiskY(y)
  }

  return (
    <div >
      <Grid container>
        <Grid item xs={2}>
          <Button onClick={() => { setRMObjectId(10195001); setRiskX(0); setRiskY(0) }}>10195001</Button>
          <Button onClick={() => { setRMObjectId(10195002); setRiskX(0); setRiskY(0) }}>10195002</Button>
          <TextField label="X" value={riskX} size="small" />
          <TextField label="Y" value={riskY} size="small" />
          <TextField label="Factor" value={riskFactor} size="small" />
          <TextField label="Short" value={riskShort} size="small" />
          <TextField label="Display" value={riskDisplay} size="small" />
          <TextField label="Color" value={riskColor} size="small" sx={{ backgroundColor: riskColor === -1 ? "white" : colorOLEtoRGB(riskColor) }} />
        </Grid>
        <Grid item xs={10}>
          <RiskMatrix
            rmData={(data as RMData[]).filter(fig => fig.rmObjectId === rmObjectId)}
            rmColCfg={(colCfgs as RMColCfg[]).filter(fig => fig.rmObjectId === rmObjectId)}
            rmConfig={(configs as RMConfig[]).filter(fig => fig.rmObjectId === rmObjectId)}
            selection={{ x: riskX, y: riskY }}
            setSelectedCell={setSelectedCell}
          />
        </Grid>

      </Grid>


    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { MatrixAreas, RMColCfg, RMConfig, RMData } from "./Definition";

import configs from './data/ST_RMCONFIG.json'
import colCfgs from './data/ST_RMCOLCFG.json'
import data from './data/ST_RMDATA.json'
import RiskMatrix from "./RiskMatrix";
import { Button, TextField } from "@mui/material";
import { rm } from "fs";

function App() {

  const [rmObjectId, setRMObjectId] = useState(10195001)
  const [riskFactor, setRiskFactor] = useState(0)
  const [riskColor, setRiskColor] = useState(-1)
  const [riskX, setRiskX] = useState(0)
  const [riskY, setRiskY] = useState(0)
  const [riskShort, setRiskShort] = useState(0)

  useEffect(() => {
    const rmData = data.find(d => d.rmObjectId === rmObjectId && d.rmRow === riskX && d.rmColumn === riskY && d.rmAreaId === MatrixAreas.rmMatrix)
    setRiskColor(rmData?.rmdSelBackColor ?? -1)
    setRiskFactor(parseInt(rmData?.rmValue?.replaceAll("%LF", "") ?? "0"))
    setRiskShort(parseInt((!!rmData?.rmDisplayShort ? rmData?.rmDisplayShort : rmData?.rmValue)?.replaceAll("%LF", "") ?? "0"))
  }, [riskX, riskY, rmObjectId])

  const setSelectedCell = (x: number, y: number) => {
    setRiskX(x);
    setRiskY(y)
  }

  return (
    <div >
      <Button onClick={() => { setRMObjectId(10195001); setRiskX(0); setRiskY(0) }}>10195001</Button>
      <Button onClick={() => { setRMObjectId(10195002); setRiskX(0); setRiskY(0) }}>10195002</Button>
      <TextField label="X" value={riskX} size="small" />
      <TextField label="Y" value={riskY} size="small" />
      <TextField label="Factor" value={riskFactor} size="small" />
      <TextField label="Color" value={riskColor} size="small" />
      <TextField label="Short" value={riskShort} size="small" />
      <RiskMatrix
        rmData={(data as RMData[]).filter(fig => fig.rmObjectId === rmObjectId)}
        rmColCfg={(colCfgs as RMColCfg[]).filter(fig => fig.rmObjectId === rmObjectId)}
        rmConfig={(configs as RMConfig[]).filter(fig => fig.rmObjectId === rmObjectId)}
        selection={{ x: riskX, y: riskY }}
        setSelectedCell={setSelectedCell}
      />
    </div>
  );
}

export default App;

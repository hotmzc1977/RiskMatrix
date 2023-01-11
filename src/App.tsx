import { useEffect, useState } from "react";
import { RMColCfg, RMConfig, RMData } from "./Definition";

import configs from './data/ST_RMCONFIG.json'
import colCfgs from './data/ST_RMCOLCFG.json'
import data from './data/ST_RMDATA.json'
import RiskMatrix from "./RiskMatrix";
import { Button } from "@mui/material";

function App() {

  const [rmObjectId, setRMObjectId] = useState(10195001)
  return (
    <div >
      <Button onClick={() => setRMObjectId(10195001)}>10195001</Button>
      <Button onClick={() => setRMObjectId(10195002)}>10195002</Button>
      <RiskMatrix
        rmData={(data as RMData[]).filter(fig => fig.rmObjectId === rmObjectId)}
        rmColCfg={(colCfgs as RMColCfg[]).filter(fig => fig.rmObjectId === rmObjectId)}
        rmConfig={(configs as RMConfig[]).filter(fig => fig.rmObjectId === rmObjectId)} />
    </div>
  );
}

export default App;

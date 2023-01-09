import { useEffect, useState } from "react";
import { RMColCfg, RMConfig, RMData } from "./Definition";

import configs from './data/ST_RMCONFIG.json'
import colCfgs from './data/ST_RMCOLCFG.json'
import data from './data/ST_RMDATA.json'

function App() {

  console.log(data, colCfgs, configs)
  return (
    <div >
      Risk Matrix is coming...
    </div>
  );
}

export default App;

import { Outlet } from "react-router-dom"

function Educator() {
  return (
    <div>
      <h1>Educator page</h1>
      <div>
        {<Outlet />}
      </div>
    </div>
  )
}

export default Educator
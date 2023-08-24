import { formatter } from "../helpers/currency"

const ShippingModal = ({ costs, setShowShippingInfo }) => {
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-1/3 my-6 mx-auto max-w-xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between px-5 pt-2 rounded-t">
              <h3 className="text-lg font-semibold py-2">
                Shipping Fee {costs.code.toUpperCase()}
              </h3>
              <button
                className=" ml-auto bg-transparent border-0 text-slate-500 float-right text-3xl leading-none outline-none focus:outline-none"
                onClick={() => setShowShippingInfo(false)}
              >
                <span className="bg-transparent text-slate-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative px-6 pb-6 flex-auto max-w-xl">
              <p className="my-4 text-slate-500 text-md leading-relaxed">
                {costs.code.toUpperCase()} - {costs.name}
              </p>
              {
                costs.costs.map(c => {
                  return (
                    <div className="my-4 text-slate-500" key={c.code}>
                      <p className="text-md font-bold text-slate-800">Package name: {c.service} - {c.description}</p>
                      <div className="text-sm">
                        <p>Fee: Rp. {formatter(c.cost[0].value)}</p>
                        <p>Estimation arrival: {c.cost[0].etd} day</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default ShippingModal
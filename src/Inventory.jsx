import { useState } from "react";
import "./index.css";

export default function Inventory() {
  const [prices, setPrices] = useState({
    extreme95: 53.29,
    extreme91: 52.29,
    diesel: 52.29,
  });

  const [lubes, setLubes] = useState(0);

  const [form, setForm] = useState({
    extreme95: { begin: [0, 0, 0, 0], close: [0, 0, 0, 0] },
    extreme91: { begin: [0, 0, 0, 0], close: [0, 0, 0, 0] },
    diesel: { begin: [0, 0, 0, 0], close: [0, 0, 0, 0] },
  });

  const [result, setResult] = useState(null);

  // === Miscellaneous State ===
  const [misc, setMisc] = useState({
    PLB: [""],
    Gcash: [""],
    Pricelocq: [""],
    Card: [""],
    Regasco: [""],
  });

  const [DipstickData, setDipstickData] = useState({
    beginning: {
      extreme95: {
        cm: "",
        ltrs: ""
      },
      extreme91: {
        cm: "",
        ltrs: ""
      },
      diesel: {
        cm: "",
        ltrs: ""
      }
    },
    beforeDelivery: {
      extreme95: {
        cm: "",
        ltrs: ""
      },
      extreme91: {
        cm: "",
        ltrs: ""
      },
      diesel: {
        cm: "",
        ltrs: ""
      }
    },
    volume: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    total: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    afterDelivery: {
      extreme95: {
        cm: "",
        ltrs: ""
      },
      extreme91: {
        cm: "",
        ltrs: ""
      },
      diesel: {
        cm: "",
        ltrs: ""
      }
    },
    variance1: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    closing: {
      extreme95: {
        cm: "",
        ltrs: ""
      },
      extreme91: {
        cm: "",
        ltrs: ""
      },
      diesel: {
        cm: "",
        ltrs: ""
      }
    },
    salesPerDipstick: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    performedBy: "",
    assessedBy: "",
    fuelAnalysis: "",
    products: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    add: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    calibration: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    deliveryPurchased: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    goodsAvailableForSale: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    goodsSoldPerTotalizer: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    endingInPerTotalizer: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    endingInPerDipstick: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    },
    variance2: {
      extreme95: "",
      extreme91: "",
      diesel: ""
    }
  })

  const [cashOnHand, setCashOnHand] = useState("");

  const handleMiscChange = (type, index, value) => {
    setMisc((prev) => {
      const updated = { ...prev };
      updated[type][index] = value;

      // if last field naay sulod, add new empty input
      if (index === updated[type].length - 1 && value !== "") {
        updated[type].push("");
      }

      return updated;
    });
  };

  const getMiscTotals = () => {
    let totals = {};
    let grand = 0;

    Object.keys(misc).forEach((key) => {
      const sum = misc[key].reduce(
        (acc, v) => acc + (parseFloat(v) || 0),
        0
      );
      totals[key] = sum;
      grand += sum;
    });

    return { totals, grand };
  };

  const handleChange = (type, field, index, value) => {
    const num = parseFloat(value);
    setForm((prev) => {
      const updated = { ...prev };
      updated[type][field][index] = isNaN(num) ? 0 : num;
      return updated;
    });
  };

  const handlePriceChange = (type, value) => {
    const num = parseFloat(value);
    setPrices((prev) => ({
      ...prev,
      [type]: isNaN(num) ? 0 : num,
    }));
  };

  const computeSales = (begin, close, price) => {
    const liters = close.map((c, i) => c - begin[i]);
    const amounts = liters.map((l) => l * price);
    const totalLiters = liters.reduce((a, b) => a + b, 0);
    const totalAmount = amounts.reduce((a, b) => a + b, 0);

    return { liters, amounts, totalLiters, totalAmount };
  };
  // console.log(computeSales);

  const calculate = () => {
    const result95 = computeSales(form.extreme95.begin, form.extreme95.close, prices.extreme95);
    const result91 = computeSales(form.extreme91.begin, form.extreme91.close, prices.extreme91);
    const resultDiesel = computeSales(form.diesel.begin, form.diesel.close, prices.diesel);

    // result95.totalAmount = result95.totalLiters * prices.extreme95;
    // result91.totalAmount = result91.totalLiters * prices.extreme91;
    // resultDiesel.totalAmount = resultDiesel.totalLiters * prices.diesel;

    const grandLiters = result95.totalLiters + result91.totalLiters + resultDiesel.totalLiters;
    const grandAmount = result95.totalAmount + result91.totalAmount + resultDiesel.totalAmount;

    setResult({
      extreme95: result95,
      extreme91: result91,
      diesel: resultDiesel,
      grand: { liters: grandLiters, amount: grandAmount },
    });
  };

  // console.log(calculate);

  const renderTable = (label, data, price, type) => (
    <div className="mb-6 overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">{label} @ ₱{price}</h2>
      <table className="w-full border border-gray-400 text-center min-w-[600px]">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Pump</th>
            <th className="p-2">Beginning</th>
            <th className="p-2">Closing</th>
            <th className="p-2">Sales in Liters</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.liters.map((lit, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">P{i + 1}</td>
              <td className="p-2">{form[type].begin[i]}</td>
              <td className="p-2">{form[type].close[i]}</td>
              <td className="p-2">{lit.toFixed(3)}</td>
              <td className="p-2">₱{data.amounts[i].toFixed(3)}</td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100 border-t">
            <td colSpan={3} className="p-2">TOTAL</td>
            <td className="p-2">{data.totalLiters.toFixed(3)}</td>
            <td className="p-2">₱{(data.totalLiters * price).toFixed(3)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const miscTotals = getMiscTotals();

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Fuel Sales Inventory</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-15px', marginBottom: '25px', fontSize: '12px' }}>
        <span>Develop by: <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>K W A N G G O L ' S</span></span>
      </div>

      {/* Fuel Section */}
      {["extreme95", "extreme91", "diesel"].map((type) => (
        <div key={type} className="mb-6 border p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">{type.toUpperCase()}</h2>

          {/* Editable Price */}
          <div className="mb-3">
            <label className="block font-medium mb-1">Price per Liter:   </label>
            <input
              type="number"
              step="0.01"
              value={prices[type]}
              onChange={(e) => handlePriceChange(type, e.target.value)}
              className="border p-2 rounded w-full sm:w-48"
              style={{ width: "100px", paddingLeft: "10px" }}
            />
          </div>

          {/* Beginning & Closing */}
          {["begin", "close"].map((field) => (
            <div key={field} className="mb-3">
              <p className="font-medium mb-1">{field.toUpperCase()}:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col">
                    <label className="text-sm mb-1">Pump {i + 1}</label>
                    <input
                      type="number"
                      value={form[type][field][i]}
                      placeholder={`Pump ${i + 1}`}
                      className="border p-2 rounded w-full"
                      onChange={(e) => handleChange(type, field, i, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      <button style={{ padding: "10px" }}
        onClick={calculate}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full sm:w-auto"
      >
        Calculate
      </button>

      {/* Results */}
      {result && (
        <div className="mt-8">
          {renderTable("Extreme 95", result.extreme95, prices.extreme95, "extreme95")}
          {renderTable("Extreme 91", result.extreme91, prices.extreme91, "extreme91")}
          {renderTable("Diesel", result.diesel, prices.diesel, "diesel")}

          <div className="p-4 bg-green-100 rounded-lg mt-6 text-center sm:text-left">
            <h2 className="text-xl font-bold">OVERALL SALES</h2>
            <p>Total Liters: {result.grand.liters.toFixed(3)}</p>
            <p>Total Amount: ₱{result.grand.amount.toFixed(3)}</p>
          </div>
        </div>
      )}

      {/* === Miscellaneous Section === */}
      <div className="mt-10 border p-4 rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4">Miscellaneous Payments</h2>

        {Object.keys(misc).map((key) => (
          <div key={key} className="mb-4">
            <h3 className="font-semibold mb-2">{key}</h3>

            {/* Change from flex-row to flex-col */}
            <div className="flex flex-col gap-2">
              {misc[key].map((val, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ marginTop: '5px' }}>{i + 1}.</span>
                  <input
                    type="number"
                    placeholder={`${key} amount`}
                    value={val}
                    onChange={(e) => handleMiscChange(key, i, e.target.value)}
                    className="border p-2 rounded w-full sm:w-64"
                  />
                </div>
              ))}
            </div>

            <p className="mt-2 font-medium">
              Total {key}: ₱{miscTotals.totals[key].toFixed(3)}
            </p>
          </div>
        ))}

        <div className="mt-10 border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-bold mb-4">Total Lube Sales</h2>
          <div className="mb-4">
            {/* <h3 className="font-semibold mb-2">Lubes</h3> */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span style={{ marginTop: '5px' }}></span>
                <input
                  type="number"
                  placeholder="Lube Total Sales"
                  value={lubes}
                  // onChange={(e) =}
                  onChange={(e) => setLubes(e.target.value)}
                  className="border p-2 rounded w-full sm:w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="p-4 bg-green-100 rounded-lg text-center sm:text-left">
          <h2 className="text-lg font-bold">Miscellaneous Total</h2>
          <p>₱{miscTotals.grand.toFixed(3)}</p>
        </div> */}
        <div className="p-4 bg-green-100 rounded-lg mt-6 text-center sm:text-left">
          <h2 className="text-xl font-bold">Sales and Cash Summary</h2>
          <p>Fuel Sales : ₱{result ? parseFloat(result.grand.amount.toFixed(3)) : "0"}</p>
          <p>Lube Sales : {lubes}</p>
          <p>Total: {result ? (parseFloat(result.grand.amount) + parseFloat(lubes)).toFixed(3) : "0"}</p>
          <p>Miscellaneous : ₱{miscTotals.grand.toFixed(3)}</p>
          <p>Net Cash : ₱{result ? ((parseFloat(result.grand.amount.toFixed(3)) + parseFloat(lubes) ) - miscTotals.grand).toFixed(3) : "0"}</p>
          <div className="flex items-center gap-2 mt-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <label className="font-medium">Cash on Hand :</label>
            <input
              className="border rounded text-center px-2 py-1 "
              style={{ width: '100px' }}
              type="number"
              placeholder="-"
              value={cashOnHand}
              onChange={(e) => setCashOnHand(e.target.value)}
            />
          </div>
          {/* <p>Cash on Hand : </p><input className=" border rounded text-center" type="number" placeholder="-"/> */}
          <div className="flex items-center gap-2 mt-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
            <label className="font-medium">Short/Over :</label>
            <p>
              {cashOnHand
                ? (
                  parseFloat(cashOnHand) -
                  ((result?.grand?.amount || 0) - (miscTotals.grand || 0))
                ).toFixed(3)
                : (
                  -((result?.grand?.amount || 0) - (miscTotals.grand || 0))
                ).toFixed(3)
              }
            </p>

          </div>
        </div>
      </div>

      {/* === Fuel Analysis Section === */}
      <div className="mt-10 border p-4 rounded-lg shadow-sm bg-white overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Dipstick Analysis</h2>

        <table className="border border-gray-400 text-center table-fixed">
          <thead className="bg-gray-200">
            <tr>
              <th rowSpan="2" className="p-2 border min-w-[200px]">Products</th>
              <th colSpan="2" className="p-2 border">Extreme95</th>
              <th colSpan="2" className="p-2 border">Extreme91</th>
              <th colSpan="2" className="p-2 border">Diesel</th>
            </tr>
            <tr>
              <th className="p-2 border min-w-[250px]">CM</th>
              <th className="p-2 border min-w-[250px]">LTRS</th>
              <th className="p-2 border min-w-[250px]">CM</th>
              <th className="p-2 border min-w-[250px]">LTRS</th>
              <th className="p-2 border min-w-[250px]">CM</th>
              <th className="p-2 border min-w-[250px]">LTRS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Beginning</td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beginning.extreme95.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beginning: {
                        ...prev.beginning,
                        extreme95: {
                          ...prev.beginning.extreme95,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beginning.extreme95.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beginning: {
                        ...prev.beginning,
                        extreme95: {
                          ...prev.beginning.extreme95,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beginning.extreme91.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beginning: {
                        ...prev.beginning,
                        extreme91: {
                          ...prev.beginning.extreme91,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beginning.extreme91.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beginning: {
                        ...prev.beginning,
                        extreme91: {
                          ...prev.beginning.extreme91,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beginning.diesel.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beginning: {
                        ...prev.beginning,
                        diesel: {
                          ...prev.beginning.diesel,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beginning.diesel.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beginning: {
                        ...prev.beginning,
                        diesel: {
                          ...prev.beginning.diesel,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Before Delivery Dipstick</td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beforeDelivery.extreme95.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beforeDelivery: {
                        ...prev.beforeDelivery,
                        extreme95: {
                          ...prev.beforeDelivery.extreme95,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beforeDelivery.extreme95.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beforeDelivery: {
                        ...prev.beforeDelivery,
                        extreme95: {
                          ...prev.beforeDelivery.extreme95,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beforeDelivery.extreme91.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beforeDelivery: {
                        ...prev.beforeDelivery,
                        extreme91: {
                          ...prev.beforeDelivery.extreme91,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beforeDelivery.extreme91.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beforeDelivery: {
                        ...prev.beforeDelivery,
                        extreme91: {
                          ...prev.beforeDelivery.extreme91,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beforeDelivery.diesel.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beforeDelivery: {
                        ...prev.beforeDelivery,
                        diesel: {
                          ...prev.beforeDelivery.diesel,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.beforeDelivery.diesel.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      beforeDelivery: {
                        ...prev.beforeDelivery,
                        diesel: {
                          ...prev.beforeDelivery.diesel,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Volume Delivered</td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.volume.extreme95}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      volume: {
                        ...prev.volume,
                        extreme95: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.volume.extreme91}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      volume: {
                        ...prev.volume,
                        extreme91: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.volume.diesel}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      volume: {
                        ...prev.volume,
                        diesel: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Total</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input
                  style={{ width: "200px" }}
                  type="text"
                  value={DipstickData.volume.extreme95 ? parseInt(DipstickData.beginning.extreme95.ltrs) + parseInt(DipstickData.volume.extreme95) + " L" : parseInt(DipstickData.beginning.extreme95.ltrs) + " L"} readOnly
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input
                  style={{ width: "200px" }}
                  type="text"
                  value={DipstickData.volume.extreme91 ? parseInt(DipstickData.beginning.extreme91.ltrs) + parseInt(DipstickData.volume.extreme91) + " L" : parseInt(DipstickData.beginning.extreme91.ltrs) + " L"} readOnly
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input
                  style={{ width: "200px" }}
                  type="text"
                  value={DipstickData.volume.diesel ? parseInt(DipstickData.beginning.diesel.ltrs) + parseInt(DipstickData.volume.diesel) + " L" : parseInt(DipstickData.beginning.diesel.ltrs) + " L"} readOnly
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">After Delivery Dipstick</td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.afterDelivery.extreme95.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      afterDelivery: {
                        ...prev.afterDelivery,
                        extreme95: {
                          ...prev.afterDelivery.extreme95,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.afterDelivery.extreme95.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      afterDelivery: {
                        ...prev.afterDelivery,
                        extreme95: {
                          ...prev.afterDelivery.extreme95,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.afterDelivery.extreme91.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      afterDelivery: {
                        ...prev.afterDelivery,
                        extreme91: {
                          ...prev.afterDelivery.extreme91,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.afterDelivery.extreme91.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      afterDelivery: {
                        ...prev.afterDelivery,
                        extreme91: {
                          ...prev.afterDelivery.extreme91,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.afterDelivery.diesel.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      afterDelivery: {
                        ...prev.afterDelivery,
                        diesel: {
                          ...prev.afterDelivery.diesel,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.afterDelivery.diesel.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      afterDelivery: {
                        ...prev.afterDelivery,
                        diesel: {
                          ...prev.afterDelivery.diesel,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Variance</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input
                  style={{ width: "200px" }}
                  type="text"
                  readOnly
                  value={
                    DipstickData.afterDelivery?.extreme95?.ltrs
                      ? (
                        parseFloat(DipstickData.afterDelivery.extreme95.ltrs || 0) -
                        (parseFloat(DipstickData.beginning?.extreme95?.ltrs || 0) +
                          parseFloat(DipstickData.volume?.extreme95 || 0))
                      ).toFixed(2)
                      : 0
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input
                  style={{ width: "200px" }}
                  type="text"
                  readOnly
                  value={
                    DipstickData.afterDelivery?.extreme91?.ltrs
                      ? (
                        parseFloat(DipstickData.afterDelivery.extreme91.ltrs || 0) -
                        (parseFloat(DipstickData.beginning?.extreme91?.ltrs || 0) +
                          parseFloat(DipstickData.volume?.extreme91 || 0))
                      ).toFixed(2)
                      : 0
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input
                  style={{ width: "200px" }}
                  type="text"
                  readOnly
                  value={
                    DipstickData.afterDelivery?.diesel?.ltrs
                      ? (
                        parseFloat(DipstickData.afterDelivery.diesel.ltrs || 0) -
                        (parseFloat(DipstickData.beginning?.diesel?.ltrs || 0) +
                          parseFloat(DipstickData.volume?.diesel || 0))
                      ).toFixed(2)
                      : 0
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Closing</td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.closing.extreme95.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      closing: {
                        ...prev.closing,
                        extreme95: {
                          ...prev.closing.extreme95,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.closing.extreme95.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      closing: {
                        ...prev.closing,
                        extreme95: {
                          ...prev.closing.extreme95,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.closing.extreme91.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      closing: {
                        ...prev.closing,
                        extreme91: {
                          ...prev.closing.extreme91,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.closing.extreme91.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      closing: {
                        ...prev.closing,
                        extreme91: {
                          ...prev.closing.extreme91,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.closing.diesel.cm}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      closing: {
                        ...prev.closing,
                        diesel: {
                          ...prev.closing.diesel,
                          cm: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input
                  style={{ width: "100px" }}
                  type="number"
                  value={DipstickData.closing.diesel.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      closing: {
                        ...prev.closing,
                        diesel: {
                          ...prev.closing.diesel,
                          ltrs: e.target.value, // update cm only
                        },
                      },
                    }))
                  }
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Sales Per Dipstick</td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Performed by</td>
              <td className="p-2 border min-w-[250px]" colSpan={6}>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  className="w-full p-1 border rounded text-left"
                  placeholder=""
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Assessed by</td>
              <td className="p-2 border min-w-[250px]" colSpan={6}>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  className="w-full p-1 border rounded text-left"
                  placeholder=""
                />
              </td>
            </tr>


            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Fuel Analysis</td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" >
                <input style={{ width: "100px" }}
                  type="number"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>


            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Products</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={"Extreme-95"}
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  value={"Extreme-91"}
                  readOnly
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={"Diesel"}
                />
              </td>
            </tr>


            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Beginning</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={DipstickData.volume.extreme95 ? parseFloat(DipstickData.beginning.extreme95.ltrs) + parseFloat(DipstickData.volume.extreme95) : DipstickData.beginning.extreme95.ltrs}
                />

              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={DipstickData.volume.extreme91 ? parseFloat(DipstickData.beginning.extreme91.ltrs) + parseFloat(DipstickData.volume.extreme91) : DipstickData.beginning.extreme91.ltrs}
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={DipstickData.volume.diesel ? parseFloat(DipstickData.beginning.diesel.ltrs) + parseFloat(DipstickData.volume.diesel) : DipstickData.beginning.diesel.ltrs}
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Add</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Calibration</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Delivery Purchased</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  value={DipstickData.volume.extreme95}
                  readOnly
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  value={DipstickData.volume.extreme91}
                  readOnly
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  value={DipstickData.volume.diesel}
                  readOnly
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Goods Available For Sale</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={DipstickData.volume.extreme95 ? parseFloat(DipstickData.volume.extreme95) + parseFloat(DipstickData.beginning.extreme95.ltrs) : parseFloat(DipstickData.beginning.extreme95.ltrs)}
                  //onkas
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      goodsAvailableForSale: {
                        ...prev.goodsAvailableForSale,
                        extreme95: e.target.value,
                      },
                    }))
                  }
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={DipstickData.volume.extreme95 ? parseFloat(DipstickData.volume.extreme91) + parseFloat(DipstickData.beginning.extreme91.ltrs) : parseFloat(DipstickData.beginning.extreme91.ltrs)}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      goodsAvailableForSale: {
                        ...prev.goodsAvailableForSale,
                        extreme91: e.target.value,
                      },
                    }))
                  }
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  value={DipstickData.volume.extreme95 ? parseFloat(DipstickData.volume.diesel) + parseFloat(DipstickData.beginning.diesel.ltrs) : parseFloat(DipstickData.beginning.diesel.ltrs)}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      goodsAvailableForSale: {
                        ...prev.goodsAvailableForSale,
                        diesel: e.target.value,
                      },
                    }))
                  }
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Goods Sold Per Totalizer</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  // testing
                  // value={(result?.extreme95?.totalLiters).toFixed(3) || 0}
                  value={(result?.extreme95?.totalLiters || 0).toFixed(3)}

                  readOnly

                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  value={(result?.extreme91?.totalLiters || 0).toFixed(3)}
                  readOnly
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  value={(result?.diesel?.totalLiters || 0).toFixed(3)}
                  readOnly
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Ending In Per Totalizer</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  // value={
                  //   parseFloat(DipstickData?.goodsAvailableForSale?.extreme95 || 0) 
                  //   // kani
                  // }
                  readOnly
                  value={
                    DipstickData.volume.extreme95
                      ? (
                        parseInt(DipstickData.beginning.extreme95.ltrs) +
                        parseInt(DipstickData.volume.extreme95) -
                        (result?.extreme95?.totalLiters || 0)
                      ).toFixed(3)
                      : (
                        parseInt(DipstickData.beginning.extreme95.ltrs) -
                        (result?.extreme95?.totalLiters || 0)
                      ).toFixed(3)
                  }

                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      endingInPerTotalizer: {
                        ...prev.endingInPerTotalizer,
                        extreme95: e.target.value,
                      },
                    }))
                  }

                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={
                    DipstickData.volume.extreme91
                      ? (
                        parseInt(DipstickData.beginning.extreme91.ltrs) +
                        parseInt(DipstickData.volume.extreme91) -
                        (result?.extreme91?.totalLiters || 0)
                      ).toFixed(3)
                      : (
                        parseInt(DipstickData.beginning.extreme91.ltrs) -
                        (result?.extreme91?.totalLiters || 0)
                      ).toFixed(3)
                  }
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      endingInPerTotalizer: {
                        ...prev.endingInPerTotalizer,
                        extreme91: e.target.value,
                      },
                    }))
                  }
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={
                    DipstickData.volume.diesel
                      ? (
                        parseInt(DipstickData.beginning.diesel.ltrs) +
                        parseInt(DipstickData.volume.diesel) -
                        (result?.diesel?.totalLiters || 0)
                      ).toFixed(3)
                      : (
                        parseInt(DipstickData.beginning.diesel.ltrs) -
                        (result?.diesel?.totalLiters || 0)
                      ).toFixed(3)
                  }
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      endingInPerTotalizer: {
                        ...prev.endingInPerTotalizer,
                        diesel: e.target.value,
                      },
                    }))
                  }
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Ending In Per Dipstick</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"

                  value={DipstickData.closing.extreme95.ltrs}
                  // not
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      endingInPerDipstick: {
                        ...prev.endingInPerDipstick,
                        extreme95: e.target.value,
                      },
                    }))
                  }
                  readOnly
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  value={DipstickData.closing.extreme91.ltrs}
                  readOnly
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      endingInPerDipstick: {
                        ...prev.endingInPerDipstick,
                        extreme91: e.target.value,
                      },
                    }))
                  }
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={DipstickData.closing.diesel.ltrs}
                  onChange={(e) =>
                    setDipstickData((prev) => ({
                      ...prev,
                      endingInPerDipstick: {
                        ...prev.endingInPerDipstick,
                        diesel: e.target.value,
                      },
                    }))
                  }
                />
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-2 border text-left min-w-[200px]">Variance</td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  // value={parseFloat(DipstickData.endingInPerDipstick.extreme95) - parseFloat(DipstickData.endingInPerTotalizer.extreme95)}
                  value={
                    DipstickData?.closing?.extreme95?.ltrs
                      ? parseFloat(DipstickData.closing.extreme95.ltrs) -
                      (
                        DipstickData?.volume?.extreme95
                          ? (parseInt(DipstickData.beginning.extreme95.ltrs) || 0) +
                          (parseInt(DipstickData.volume.extreme95) || 0) -
                          (result?.extreme95?.totalLiters || 0)
                          : (parseInt(DipstickData.beginning.extreme95.ltrs) || 0) -
                          (result?.extreme95?.totalLiters || 0)
                      )
                      : 0
                  }

                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={
                    DipstickData?.closing?.extreme91?.ltrs
                      ? parseFloat(DipstickData.closing.extreme91.ltrs) -
                      (
                        DipstickData?.volume?.extreme91
                          ? (parseInt(DipstickData.beginning.extreme91.ltrs) || 0) +
                          (parseInt(DipstickData.volume.extreme91) || 0) -
                          (result?.extreme91?.totalLiters || 0)
                          : (parseInt(DipstickData.beginning.extreme91.ltrs) || 0) -
                          (result?.extreme91?.totalLiters || 0)
                      )
                      : 0
                  }
                />
              </td>
              <td className="p-2 border min-w-[250px]" colSpan={2}>
                <input style={{ width: "200px" }}
                  type="text"
                  className="w-full p-1 border rounded text-center"
                  placeholder="-"
                  readOnly
                  value={
                    DipstickData?.closing?.diesel?.ltrs
                      ? parseFloat(DipstickData.closing.diesel.ltrs) -
                      (
                        DipstickData?.volume?.diesel
                          ? (parseInt(DipstickData.beginning.diesel.ltrs) || 0) +
                          (parseInt(DipstickData.volume.diesel) || 0) -
                          (result?.diesel?.totalLiters || 0)
                          : (parseInt(DipstickData.beginning.diesel.ltrs) || 0) -
                          (result?.diesel?.totalLiters || 0)
                      )
                      : 0
                  }
                />
              </td>
            </tr>

          </tbody>
        </table>
      </div>





    </div>
  );
}
